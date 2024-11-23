import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import {
  AttractionServiceApi,
  Attractions,
  Attraction,
  AttractionServiceFindRequest,
  AttractionAdminServiceApi,
} from '@/apifox';
import useTable from '@/hooks/useTable/useTable';
import useTableModalEdit from '@/hooks/useTable/useTableModalEdit';
import useTableDelete from '@/hooks/useTable/useTableDelete';

import Form from '../form';

const List = () => {
  const service = new AttractionServiceApi();
  const adminService = new AttractionAdminServiceApi();

  const { tableRef, tableRequest, pageSize, columns } = useTable<
    Attractions,
    Attraction,
    AttractionServiceFindRequest
  >({
    requestSetting: {
      request: async (params) => {
        const { attractions = [], ...rest } = await service.attractionServiceFind(params);
        const newAttractions = attractions.map((item) => {
          return { ...item, children: undefined };
        });
        return { ...rest, attractions: newAttractions };
      },
      dataIndex: 'attractions',
    },
    columns: [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
        title: '序号',
      },
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        width: 100,
        fixed: 'right',
        render: (_, record) => {
          return [
            <EditButton id={record.id} color="primary" variant="text" key="edit" />,
            <DeleteButton id={record.id} key="delete" color="danger" variant="text" />,
          ];
        },
      },
    ],
  });

  const { AddButton, modalFormProps, EditButton, editId } = useTableModalEdit<Attraction>({
    getDetail: (id) => service.attractionServiceDetail({ id }),
    postDetail: (values) =>
      adminService.attractionAdminServiceCreate({ body: { attraction: values } }),
    putDetail: (id, values) =>
      adminService.attractionAdminServiceUpdate({ attractionId: id, body: { attraction: values } }),
    tableRef,
  });

  const { DeleteButton } = useTableDelete({
    deleteRequest: (id: any) => adminService.attractionAdminServiceDelete({ id }),
    tableRef,
  });

  return (
    <>
      <ProTable
        headerTitle="列表页面"
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
      <Form id={editId} {...modalFormProps}></Form>
    </>
  );
};

export default List;
