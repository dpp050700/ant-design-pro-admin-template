import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import {
  AttractionAdminServiceApi,
  RoomServiceApi,
  Rooms,
  Room,
  RoomServiceFindRequest,
  RoomStatus,
} from '@/apifox';
import useTable from '@/hooks/useTable/useTable';
import useTableDelete from '@/hooks/useTable/useTableDelete';
import useTablePageEdit from '@/hooks/useTable/useTablePageEdit';

const List = () => {
  const service = new RoomServiceApi();
  const adminService = new AttractionAdminServiceApi();

  const tabItems = [
    {
      key: RoomStatus.Published,
      label: '已上架',
      children: null,
    },
    {
      key: RoomStatus.Draft,
      label: '未上架',
      children: null,
    },
  ];

  const { tableRef, tableRequest, pageSize, columns, tabs } = useTable<
    Rooms,
    Room,
    RoomServiceFindRequest
  >({
    requestSetting: {
      request: async (params) => {
        const { rooms = [], ...rest } = await service.roomServiceFind({
          ...params,
          status: tabs?.activeKey,
        });
        const newRooms = rooms.map((item) => {
          return { ...item, children: undefined };
        });
        return { ...rest, rooms: newRooms };
      },
      dataIndex: 'rooms',
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
        dataIndex: 'title',
        search: false,
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
    tabs: tabItems,
  });

  const { AddButton, EditButton } = useTablePageEdit({
    path: '/room/detail',
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
        toolbar={{
          multipleLine: true,
          tabs,
        }}
      />
    </>
  );
};

export default List;
