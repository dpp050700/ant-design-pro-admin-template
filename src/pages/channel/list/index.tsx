import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  AttractionServiceApi,
  Story,
  StoryAdminServiceApi,
  StoryServiceApi,
  StoryStatus,
} from '@/apifox/index';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from '@umijs/max';
import style from './index.module.scss';

const storyServiceApi = new StoryServiceApi();
const storyAdminServiceApi = new StoryAdminServiceApi();
const StoryStatusTag = ({ status }: { status: StoryStatus }) => {
  const statusMap: Partial<Record<StoryStatus, { label: string; color: string }>> = {
    [StoryStatus.AuditStatus]: { label: '待审核', color: '#FF4D4F' },
    [StoryStatus.PublishedStatus]: { label: '已发布', color: '#52C41A' },
  };
  return (
    <div className={style.tag}>
      <span className={style.point} style={{ backgroundColor: statusMap[status]?.color }}></span>
      <span>{statusMap[status]?.label}</span>
    </div>
  );
};

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [activeStatusKey, setActiveStatusKey] = useState<StoryStatus>(StoryStatus.PublishedStatus);
  const attractionService = new AttractionServiceApi();

  const columns: ProColumns<Story>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      search: false,
    },

    {
      title: '发布日期',
      dataIndex: 'createdAt',
      ellipsis: true,
      valueType: 'date',
      search: false,
    },
    {
      title: '作者',
      dataIndex: ['userInfo', 'nickname'],
      ellipsis: true,
      search: false,
    },
    {
      title: '国家',
      dataIndex: 'country',
      ellipsis: true,
      search: false,
    },
    {
      title: '所属地区',
      dataIndex: ['attraction', 'name'],
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
    {
      title: '审核状态',
      dataIndex: 'status',
      search: false,
      // initialValue: "",
      // valueType: "select",
      // valueEnum: {
      //   audit_status: {
      //     text: "待审核",
      //     status: "audit_status",
      //   },
      //   published_status: {
      //     text: "已发布",
      //     status: "published_status",
      //   },
      // },
      render: (dom, record) => {
        return <StoryStatusTag status={record.status} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        const view = (
          <Button
            key="view"
            size="small"
            type="text"
            onClick={() => history.push(`/channel/detail/${record.id}`)}
          >
            查看
          </Button>
        );
        const publish = (
          <Button type="text" key="publish" size="small" onClick={() => onPublish(record)}>
            上架
          </Button>
        );
        const offShelf = (
          <Button key="offshelf" type="text" size="small" onClick={() => onOffShelf(record)}>
            下架
          </Button>
        );
        const del = (
          <Button key="del" type="text" size="small" onClick={() => onDelete(record)}>
            删除
          </Button>
        );
        if (record.status === 'audit_status') return [publish, del, view];
        if (record.status === 'published_status') return [offShelf, del, view];
      },
    },
  ];
  const columnsMap = {
    [StoryStatus.PublishedStatus]: columns,
    [StoryStatus.AuditStatus]: columns,
  };

  const onPublish = (data: Story) => {
    Modal.confirm({
      content: '是否确定要上架？',
      onOk() {
        storyAdminServiceApi
          .storyAdminServiceUpdateStatus({
            id: data.id,
            body: { status: 'published_status' },
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };
  const onOffShelf = (data: Story) => {
    Modal.confirm({
      content: '是否确定要下架？',
      onOk() {
        storyAdminServiceApi
          .storyAdminServiceUpdateStatus({
            id: data.id,
            body: { status: 'audit_status' },
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };
  const onDelete = (data: Story) => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        storyServiceApi
          .storyServiceDelete({
            id: data.id,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
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
    const res = await storyServiceApi.storyServiceFind({
      ...params,
      pageLimit: params.pageSize,
      pageOffset: (params.current || 1) - 1,
      kind: 'community_kind',
      status: activeStatusKey,
    });
    return {
      data: res.stories || [],
      success: true,
      total: res.total,
    };
  };

  return (
    <>
      <ProTable<Story>
        columns={columnsMap[activeStatusKey]}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        toolbar={{
          title: '社区分享列表',
          multipleLine: true,
          tabs: {
            activeKey: activeStatusKey,
            onChange: (key) => {
              setActiveStatusKey(key as any);
              actionRef.current?.reloadAndRest?.();
            },
            items: [
              {
                key: StoryStatus.PublishedStatus,
                tab: '已发布',
              },
              { key: StoryStatus.AuditStatus, tab: '待审核' },
            ],
          },
        }}
      />
    </>
  );
};

export default TablePage;
