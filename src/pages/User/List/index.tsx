import { ModalForm, ProFormText, ProTable } from '@ant-design/pro-components';
import React from 'react';
import {
  User,
  UserAdminServiceApi,
  UserAdminServiceFindRequest,
  Users,
  UserServiceApi,
} from '@/apifox';
import useTable from '@/hooks/useTable/useTable';
import useTableModalEdit from '@/hooks/useTable/useTableModalEdit';
const List = () => {
  const userService = new UserAdminServiceApi();
  const userServiceApi = new UserServiceApi();

  const { AddButton, modalFormProps, EditButton } = useTableModalEdit({
    getDetail: (id) => userServiceApi.userServiceDetail({ id }),
  });

  const { tableRef, tableRequest, pageSize, columns } = useTable<
    Users,
    User,
    UserAdminServiceFindRequest
  >({
    requestSetting: {
      request: (params) => userService.userAdminServiceFind(params),
      dataIndex: 'users',
    },
    columns: [
      {
        title: '昵称',
        dataIndex: 'nickname',
      },
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        width: 100,
        fixed: 'right',
        render: (_, record) => {
          return [<EditButton id={record.id} color="primary" variant="text" key="edit" />];
        },
      },
    ],
  });

  return (
    <>
      <ProTable
        headerTitle="用户列表"
        actionRef={tableRef}
        rowKey="id"
        request={tableRequest}
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        pagination={{
          pageSize,
        }}
        toolBarRender={() => [<AddButton key="add" />]}
      />
      <ModalForm
        {...modalFormProps}
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProFormText width="md" name="name" label="Name" placeholder="" />
      </ModalForm>
    </>
  );
};

export default List;
