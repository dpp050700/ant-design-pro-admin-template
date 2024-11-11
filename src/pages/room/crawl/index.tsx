import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import { RoomAdminServiceApi, RoomCrawler } from '@/apifox/index';
import { LanguageOptions } from '@/constants/index';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import AddCrawlForm from './AddCrawlForm';

const roomAdminServiceApi = new RoomAdminServiceApi();

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [activeStatusKey, setActiveStatusKey] = useState<keyof typeof columnsMap>('success');

  const [formOpen, setFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<RoomCrawler>();

  const onRetry = (data: RoomCrawler) => {
    Modal.confirm({
      content: '是否确定要重试？',
      onOk() {
        roomAdminServiceApi
          .roomAdminServiceRoomCrawlerRetry({
            id: data.id as any,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };
  const onDel = (data: RoomCrawler) => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        roomAdminServiceApi
          .roomAdminServiceDeleteRoomCrawler({
            id: data.id as any,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };
  const columns: ProColumns<RoomCrawler>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 50,
      fixed: 'left',
    },

    {
      width: 150,
      title: '已生成房源id',
      ellipsis: true,
      search: false,
      copyable: true,
      render(dom, entity, index, action, schema) {
        const Language = localStorage.getItem('language') || LanguageOptions[0].value;
        const room = entity.room?.find((item) => item.language === Language);
        return (
          <div className="flex flex-col items-start gap-[10px]">
            {room?.id ? (
              <a
                target={'_blank'}
                href={`/room/detail/${room?.id}`}
                className="cursor-pointer"
                rel="noreferrer"
              >
                {room.isMaster ? '主房源' : ''} {room.id}
              </a>
            ) : null}
          </div>
        );
      },
    },
    {
      title: '房源名称',
      ellipsis: true,
      search: false,
      width: 350,
      render(dom, entity, index, action, schema) {
        const Language = localStorage.getItem('language') || LanguageOptions[0].value;
        const room = entity.room?.find((item) => item.language === Language);
        return room?.title ?? '';
      },
    },

    {
      title: 'Airbnb房源链接/编号',
      dataIndex: 'link',
      hideInTable: true,
      width: 200,
    },
    {
      title: '本系统房源ID',
      dataIndex: 'roomId',
      hideInTable: true,
      width: 200,
    },
    {
      title: '爬虫名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 250,
    },
    {
      title: '抓取链接',
      dataIndex: 'url',
      ellipsis: true,
      search: false,
      copyable: true,
      width: 250,
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      fixed: 'right',
      render: (dom, record) => {
        const retry = (
          <Button key="retry" size="small" type="text" onClick={() => onRetry(record)}>
            重试
          </Button>
        );
        const del = (
          <Button key="del" size="small" type="text" onClick={() => onDel(record)}>
            删除
          </Button>
        );

        const acts = [];
        if (record.status === 'failed') {
          acts.push(retry, del);
        } else {
          acts.push(del);
        }
        return acts;
      },
    },
  ];
  const columnsMap = {
    pending: columns,
    processing: columns,
    success: columns,
    failed: columns,
  };

  const onAdd = () => {
    setInitialValues(undefined);
    setFormOpen(true);
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
    console.log(params, sort, filter);
    const res = await roomAdminServiceApi.roomAdminServiceRoomCrawlerList({
      ...params,
      pageLimit: params.pageSize,
      pageOffset: (params.current || 1) - 1,
      status: activeStatusKey,
    });
    return {
      data: res.data || [],
      success: true,
      total: res.total,
    };
  };

  return (
    <>
      <AddCrawlForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        initialValues={initialValues}
        onAddSuccess={() => {
          setFormOpen(false);
          setActiveStatusKey('pending');
          actionRef.current?.reload();
        }}
      />
      <ProTable<RoomCrawler>
        columns={columnsMap[activeStatusKey]}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [
          <Button key="add" onClick={onAdd} type="primary">
            爬取新房源
          </Button>,
        ]}
        toolbar={{
          title: '爬取房源列表',
          multipleLine: true,
          tabs: {
            activeKey: activeStatusKey,
            onChange: (key) => {
              setActiveStatusKey(key as any);
              actionRef.current?.reloadAndRest?.();
            },
            items: [
              { key: 'success', tab: '抓取成功' },
              { key: 'failed', tab: '抓取失败' },

              { key: 'processing', tab: '抓取进行中' },
              {
                key: 'pending',
                tab: '抓取等待',
              },
            ],
          },
        }}
        search={{
          labelWidth: 'auto',
        }}
      />
    </>
  );
};

export default TablePage;
