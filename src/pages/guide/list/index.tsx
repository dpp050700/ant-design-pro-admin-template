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
import AddGuideForm from './AddGuideForm';
import style from './index.module.scss';

const storyServiceApi = new StoryServiceApi();
const storyAdminServiceApi = new StoryAdminServiceApi();
const StoryStatusTag = ({ status }: { status: StoryStatus }) => {
  const statusMap: Partial<Record<StoryStatus, { label: string; color: string }>> = {
    audit_status: { label: '未发布', color: '#FF4D4F' },
    published_status: { label: '已发布', color: '#52C41A' },
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

  const [formOpen, setFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<Story>();
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
      title: '发布状态',
      dataIndex: 'status',
      search: false,
      // initialValue: "",
      // valueType: "select",
      // valueEnum: {
      //   audit_status: {
      //     text: "未发布",
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
      width: '320px',
      fixed: 'right',
      render: (dom, record) => {
        const view = (
          <Button
            key="view"
            size="small"
            type="text"
            onClick={() => history.push(`/guide/detail/${record.id}`)}
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
        const toTop = (
          <Button key="toTop" type="text" size="small" onClick={() => onToTop(record)}>
            设为置顶
          </Button>
        );
        const deTop = (
          <Button
            key="toTop"
            type="text"
            size="small"
            onClick={() => onDeTop(record)}
            className="!text-[#f00]"
          >
            取消置顶
          </Button>
        );
        const edit = (
          <Button key="edit" type="text" size="small" onClick={() => onEdit(record)}>
            编辑
          </Button>
        );
        const acts = [edit];
        if (record.status === 'audit_status') {
          acts.push(publish);
        } else if (record.status === 'published_status') {
          if (record.isTopped) {
            acts.push(deTop);
          } else {
            acts.push(toTop);
          }
          acts.push(offShelf);
        }

        acts.push(del, view);
        return acts;
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

  const onToTop = (data: Story) => {
    Modal.confirm({
      content: '是否确定要置顶？',
      onOk() {
        storyServiceApi
          .storyServiceTopping({
            id: data.id,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };
  const onDeTop = (data: Story) => {
    Modal.confirm({
      content: '是否确定要取消置顶？',
      onOk() {
        storyServiceApi
          .storyServiceUnTopping({
            id: data.id,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };

  const onAdd = () => {
    setInitialValues(undefined);
    setFormOpen(true);
  };
  const onEdit = (data: Story) => {
    setInitialValues(data);
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
    const res = await storyServiceApi.storyServiceFind({
      ...params,
      pageLimit: params.pageSize,
      pageOffset: (params.current || 1) - 1,
      kind: 'tourism_strategy_kind',
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
      <AddGuideForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        initialValues={initialValues}
        onAddSuccess={() => {
          setFormOpen(false);
          actionRef.current?.reload();
        }}
      />
      <ProTable<Story>
        columns={columnsMap[activeStatusKey]}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        search={false}
        toolBarRender={() => [
          <Button key="add" onClick={onAdd}>
            添加
          </Button>,
        ]}
        toolbar={{
          title: '攻略列表',
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
