import React, { useRef, useState } from 'react';
import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  Room,
  RoomServiceApi,
  RoomAdminServiceApi,
  RoomStatus,
  AttractionServiceApi,
} from '@/apifox/index';
import {
  Button,
  Image,
  Tag,
  Tabs,
  Modal,
  Dropdown,
  Divider,
  Space,
  message,
  Typography,
} from 'antd';
import { S3ImageUrl } from '@/components/Image';
import { useRequest } from 'ahooks';
import RoomCalendarModal from './RoomCalendarModal';
import { LanguageOptions } from '@/constants/index';
import { CheckCircleFilled, DownOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { history } from '@umijs/max';
import { WEB_SITE_URL_PC } from '@/libs/constants';

const roomService = new RoomServiceApi();
const roomAdminService = new RoomAdminServiceApi();
const attractionService = new AttractionServiceApi();

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState<string>(RoomStatus.Published);
  const tabItems = [
    { key: RoomStatus.Published, label: '已上架', children: null },
    { key: RoomStatus.Draft, label: '未上架', children: null },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [activeRoom, setActiveRoom] = useState<Room>();

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const columns: ProColumns<Room>[] = [
    // {
    //   dataIndex: "index",
    //   valueType: "indexBorder",
    //   width: 48,
    //   fixed: "left",
    // },
    {
      title: '房源id',
      dataIndex: 'id',
      width: 120,
      fixed: 'left',
    },

    {
      title: '房源名称',
      dataIndex: 'title',
      ellipsis: true,
      copyable: true,
      width: 350,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (text, record) => {
        return (
          <Typography.Link
            href={`${WEB_SITE_URL_PC}/roomDetail?id=${record.id}`}
            target="_blank"
            ellipsis
            copyable={{ text: record.title }}
          >
            {record.title}
          </Typography.Link>
        );
      },
    },
    {
      title: '房源标签',
      dataIndex: 'catalogNames',
      search: false,
      width: 100,
      render: (text, record) => {
        return record.catalogNames && record.catalogNames.length
          ? record.catalogNames?.join('、')
          : '--';
      },
    },
    {
      title: '图片',
      dataIndex: 'images',
      ellipsis: false,
      search: false,
      width: 170,
      render: (text, record) => (
        <div className="w-[150px]">
          <Image.PreviewGroup key={record.id} items={record.images?.map((img) => S3ImageUrl(img))}>
            <Image width={150} key={record.images?.[0]} src={S3ImageUrl(record.images![0])} />
          </Image.PreviewGroup>
        </div>
      ),
    },
    {
      title: '国家',
      dataIndex: 'country',
      ellipsis: true,
    },
    {
      title: '地区',
      dataIndex: 'city',
      ellipsis: true,
      valueType: 'select',
      request: async () => {
        const res = await attractionService.attractionServiceFind({
          pageLimit: 2000,
          pageOffset: 0,
        });
        return (
          res.attractions?.map((v) => {
            return {
              value: v.city,
              label: v.name,
            };
          }) || []
        );
      },
    },

    // {
    //   title: "地址",
    //   dataIndex: "address",
    //   ellipsis: true,
    //   hideInTable: true,
    // },
    {
      title: '卧室、卫生间、床数',
      dataIndex: 'price',
      ellipsis: true,
      search: false,
      render(text, row) {
        return `${row.detail?.info?.rooms}室/${row.detail?.info?.bathrooms}卫/${row.detail?.info?.beds}床`;
      },
      width: 150,
    },
    {
      title: '价格',
      dataIndex: 'price',
      ellipsis: true,
      search: false,
      render(text, row) {
        return `${row.price}/${row.unit}`;
      },
    },
    {
      title: '价格单位',
      dataIndex: 'unit',
      ellipsis: true,
      search: false,
      hideInTable: true,
    },
    {
      title: '排名',
      dataIndex: 'rating',
      ellipsis: true,
      search: false,
      sorter: true,
    },
    {
      title: '评论数',
      dataIndex: 'commentTotal',
      search: false,
      sorter: true,
      width: 90,
      hideInTable: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
      hideInTable: true,
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
      hideInTable: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
      hideInTable: true,
    },
    {
      title: '详情',
      dataIndex: 'detail',
      ellipsis: true,
      search: false,
      renderText: (text, row) => {
        return JSON.stringify(row.detail);
      },
      hideInTable: true,
    },
    {
      title: '入住人数',
      dataIndex: 'count',
      valueType: 'digit',
      hideInTable: true,
    },
    {
      title: '主房源',
      dataIndex: 'isMaster',
      search: false,
      renderText: (text, row) => {
        return row.isMaster ? '是' : '否';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '350px',
      fixed: 'right',
      render: (dom, record) => {
        const CopyJsx = record.isMaster ? (
          <Dropdown
            key="copy"
            menu={{
              items: LanguageOptions.filter((item) => item.value !== record.language).map(
                (item) => ({
                  key: item.value,
                  label: <div onClick={() => onCopy(record, item.value)}>复制{item.label}房源</div>,
                }),
              ),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>复制房源</a>
          </Dropdown>
        ) : null;
        return [
          <Button
            key="updateStatus"
            size="small"
            onClick={() => updateStatus({ id: record.id, status: record.status })}
          >
            {record.status === 'draft' ? '上架' : '下架'}
          </Button>,
          <Button
            key="top"
            size="small"
            onClick={() => setTop({ id: record.id, isTopped: record.isTopped! })}
          >
            {record.isTopped ? '取消置顶' : '置顶'}
          </Button>,
          <Button size="small" key="calender" onClick={() => onViewCalender(record)}>
            档期
          </Button>,
          CopyJsx,
          <a key="clone" onClick={() => onClone(record)}>
            克隆
          </a>,
          <a key="editable" target="_blank" href={`/room/detail/${record.id}`} rel="noreferrer">
            编辑
          </a>,
          <a
            key="view"
            onClick={() => {
              onDelete(record);
            }}
          >
            删除
          </a>,
        ];
      },
    },
  ];

  const { runAsync: ajaxTop } = useRequest(
    (id) => roomAdminService.roomAdminServiceTopping({ id }),
    { manual: true },
  );

  const { runAsync: deleteRoom } = useRequest(
    (id) => roomAdminService.roomAdminServiceDelete({ id }),
    { manual: true },
  );

  const { runAsync: ajaxUnTop } = useRequest(
    (id) => roomAdminService.roomAdminServiceUnTopping({ id }),
    { manual: true },
  );
  const { runAsync: updateStatus } = useRequest(
    ({ id, status }) => {
      const statusMap: any = {
        [RoomStatus.Published]: RoomStatus.Draft,
        [RoomStatus.Draft]: RoomStatus.Published,
      };
      return roomAdminService.roomAdminServiceRoomUpdateStatus({
        body: { status: statusMap[status] },
        id,
      });
    },
    {
      manual: true,
      onSuccess() {
        actionRef.current?.reload();
      },
    },
  );
  const { runAsync: updateStatusMultiple } = useRequest(
    ({ ids, status }) => {
      const statusMap: any = {
        [RoomStatus.Published]: RoomStatus.Draft,
        [RoomStatus.Draft]: RoomStatus.Published,
      };
      return roomAdminService.roomAdminServiceBatchRoomUpdateStatus({
        body: { status: statusMap[status], ids },
      });
    },
    {
      manual: true,
      onSuccess() {
        actionRef.current?.reload();
      },
    },
  );

  const { runAsync: cloneRoom } = useRequest(
    (id) => roomAdminService.roomAdminServiceCloneRoom({ id }),
    { manual: true },
  );
  const setTop = async ({ id, isTopped }: { id: string; isTopped: boolean }) => {
    if (!isTopped) {
      await ajaxTop(id);
    } else {
      await ajaxUnTop(id);
    }
    actionRef.current?.reload();
  };

  const onAdd = () => {
    history.push('/room/detail/new');
  };

  // const onEdit = (data: Room) => {
  //   history.push(`/room/detail/${data.id}`);
  // };

  const onClone = async (data: Room) => {
    Modal.confirm({
      content: '是否确定克隆该房源',
      onOk: async () => {
        const res = await cloneRoom(data.id);
        Modal.confirm({
          content: <div>房源克隆成功</div>,
          icon: <CheckCircleFilled className="!text-[#1e80ff]" />,
          okText: '去编辑',
          cancelText: '关闭',
          async onOk() {
            history.push(`/room/detail/${res.id}`);
          },
        });
      },
    });
  };

  const onDelete = async (data: Room) => {
    const content = `${
      data.isMaster ? '删除主房源，会同步删除其他语言房源，' : ''
    }是否确定要删除？`;
    Modal.confirm({
      content: content,
      async onOk() {
        await deleteRoom(data.id);
        actionRef.current?.reload();
      },
    });
  };
  const onCopy = async (data: Room, lang: string) => {
    roomAdminService
      .roomAdminServiceRoomCopy({ roomId: data.id, language: lang as any })
      .then(() => {
        message.success('复制成功');
      });
  };

  const onMultipleUpdateStatus = async () => {
    await updateStatusMultiple({ ids: selectedRowKeys, status: activeKey });
    actionRef.current?.clearSelected?.();
    actionRef.current?.reload();
  };

  const onViewCalender = (data: Room) => {
    setActiveRoom(data);
  };

  const getList = async (
    params: ParamsType & {
      pageSize?: number | undefined;
      current?: number | undefined;
      keyword?: string | undefined;
    },
    sort: any,
    filter: any,
  ) => {
    const { pageSize, current, title } = params;
    const res = await roomService.roomServiceFind({
      pageLimit: pageSize,
      pageOffset: current!,
      roomName: title,
      ...params,
      sortByRating: sort.rating,
      sortByCommentCount: sort.commentTotal,
      sortByUpdatedAt: 'descend',
      status: activeKey,
      ids: params.id ? [params.id] : undefined,
    });
    return {
      data:
        res.rooms?.map((item) => ({
          ...item,
          children: undefined, //去掉列表的展开加号
        })) || [],
      success: true,
      total: res.total,
    };
  };

  return (
    <>
      <RoomCalendarModal
        width={'80vw'}
        room={activeRoom}
        // afterClose={() => setActiveRoom(undefined)}
        onCancel={() => setActiveRoom(undefined)}
        onRefreshList={() => {
          actionRef.current?.reload();
        }}
      />

      <ProTable<Room>
        scroll={{ x: 2000 }}
        rowSelection={{ type: 'checkbox', onChange: handleSelectChange }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{ pageSize: 10 }}
        toolbar={{
          title: '房源列表',
          multipleLine: true,
          tabs: {
            activeKey: activeKey,
            onChange: (key) => {
              setActiveKey(key as any);
              actionRef.current?.reloadAndRest?.();
            },
            items: tabItems,
          },
        }}
        toolBarRender={() => [
          <Button key="add" onClick={onAdd}>
            添加
          </Button>,
          <Button key="updateStatus" onClick={onMultipleUpdateStatus}>
            {activeKey === RoomStatus.Draft ? '上架' : '下架'}
          </Button>,
        ]}
      />
    </>
  );
};

export default TablePage;
