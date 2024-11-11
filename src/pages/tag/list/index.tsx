import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { TagServiceApi, TagServiceListRequest, Tags, V1Tag } from '@/apifox/index';
import TagForm from '../form/form';

export const tagOpts = [
  { key: 'attr', tab: '属性标签' },
  { key: 'func', tab: '功能标签' },

  { key: 'desc', tab: '描述标签' },
];

const TablePage: React.FC = () => {
  const [initialValues, setInitialValues] = useState<V1Tag>();
  const [formOpen, setFormOpen] = useState(false);
  const actionRef = useRef<ActionType>();
  const [activeStatusKey, setActiveStatusKey] = useState<keyof typeof columnsMap>('attr');

  const tagService = new TagServiceApi();

  const onAdd = () => {
    setInitialValues(undefined);
    setFormOpen(true);
  };

  const onEdit = (data: V1Tag) => {
    setInitialValues(data);
    setFormOpen(true);
  };

  const onDelete = (data: V1Tag) => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        tagService
          .tagServiceDelete({
            id: data.id!,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };

  const columns: ProColumns<V1Tag>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '标签背景颜色',
      dataIndex: 'backColor',
      ellipsis: true,
    },
    {
      title: '标签文字颜色',
      dataIndex: 'fontColor',
      ellipsis: true,
    },
    {
      title: '标签样式',
      dataIndex: '',
      render: (text: any, record: any) => {
        return (
          <span
            className="inline-block border border-solid px-[6px] rounded-[4px]"
            style={{
              color: record.fontColor || '#fff',
              backgroundColor: record.backColor || '#fff',
            }}
          >
            {record.name}
          </span>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '100px',
      fixed: 'right',
      render: (dom: any, record: any) => [
        <a key="editable" onClick={() => onEdit(record)}>
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
      ],
    },
  ];

  const columnsMap = {
    attr: columns,
    func: columns,
    desc: columns,
  };

  const getTagList = (params?: TagServiceListRequest) => {
    return tagService.tagServiceList(params);
  };
  return (
    <>
      <TagForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        initialValues={initialValues}
        onUpdateSuccess={() => {
          setFormOpen(false);
          actionRef.current?.reload();
        }}
      />
      <ProTable<V1Tag>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params: any) => {
          const data = {
            pageLimit: params.pageSize!,
            pageOffset: params.current! - 1,
            kind: activeStatusKey,
          };
          const res = await getTagList(data);
          return {
            data: res.data || [],
            success: true,
            total: res.total,
          };
        }}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        headerTitle="标签列表"
        toolBarRender={() => [
          <Button key="add" onClick={onAdd}>
            添加
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
            items: tagOpts,
          },
        }}
      />
    </>
  );
};

export default TablePage;
