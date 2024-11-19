import { ModalForm, ProFormText, ProTable } from '@ant-design/pro-components';
import React from 'react';
import {
  AttractionServiceApi,
  Attractions,
  Attraction,
  AttractionServiceFindRequest,
} from '@/apifox';
import useTable from '@/hooks/useTable/useTable';
import useTableModalEdit from '@/hooks/useTable/useTableModalEdit';
const List = () => {
  const service = new AttractionServiceApi();

  const { AddButton, modalFormProps, EditButton } = useTableModalEdit({
    getDetail: (id) => service.attractionServiceDetail({ id }),
  });

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
      },
      {
        title: '景点名字',
        dataIndex: 'name',
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
        headerTitle="目的地列表"
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
