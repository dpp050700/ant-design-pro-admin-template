import { ModalForm, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { User, UserAdminServiceApi, UserAdminServiceFindRequest, Users } from '@/apifox';
import useTable from '@/hooks/useTable/useTable';
import { Button } from 'antd';
import useTableAdd from '@/hooks/useTable/useTableAdd';
const List = () => {
  const userService = new UserAdminServiceApi();

  const { button } = useTableAdd({
    isModal: true,
    Modal: (props) => {
      return <ModalForm {...props}>111</ModalForm>;
    },
    key: 'add',
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
        render: () => {
          return <Button type="link">编辑</Button>;
        },
      },
    ],
  });

  return (
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
      toolBarRender={() => [button]}
    />
  );
};

export default List;
