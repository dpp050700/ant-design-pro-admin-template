import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Modal } from 'antd';
import { S3ImageUrl } from '@/components/Image';
import {
  VirtualGood,
  VirtualGoodAdminServiceApi,
  VirtualGoodKind,
  VirtualGoodServiceApi,
  VirtualGoodServiceFindVirtualGoodRequest,
  VirtualGoodType,
} from '@/apifox/index';
import { history } from '@umijs/max';

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const virtualGoodService = new VirtualGoodServiceApi();
  const virtualGoodServiceAdmin = new VirtualGoodAdminServiceApi();

  const getVirtualGoodList = (params?: VirtualGoodServiceFindVirtualGoodRequest) => {
    return virtualGoodService.virtualGoodServiceFindVirtualGood(params);
  };

  const deleteGoods = async (id: string) => {
    Modal.confirm({
      content: '是否确定要删除？',
      async onOk() {
        await virtualGoodServiceAdmin.virtualGoodAdminServiceDeleteVirtualGood({
          id,
        });
        message.success('删除成功');
        actionRef.current?.reload();
      },
    });
  };

  const onAdd = () => {
    history.push('/pointsMarket/goodsDetail/new');
  };

  const columns: ProColumns<VirtualGood>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'thumbnail',
      ellipsis: true,
      render: (text, record, _, action) => [
        <Image
          className="!w-[100px] aspect-square"
          key={record.thumbnail}
          src={S3ImageUrl(record.thumbnail!)}
        />,
      ],
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      render: (dom, record) => {
        const VirtualGoodKindStr = {
          [VirtualGoodType.Physical]: '实体',
          [VirtualGoodType.Virtual]: '虚体',
          [VirtualGoodType.Empty]: '空类型',
        };
        return VirtualGoodKindStr[record.type!];
      },
    },
    {
      title: '需兑换积分',
      dataIndex: 'points',
    },
    {
      title: '库存',
      dataIndex: 'skuCount',
      render: (text, { skuCount }) => {
        return skuCount ? `${skuCount} 件` : '-';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        return [
          <Button
            key="edit"
            size="small"
            type="default"
            onClick={() => history.push(`/pointsMarket/goodsDetail/${record.id}`)}
          >
            编辑
          </Button>,
          <Button key="delete" size="small" danger onClick={() => deleteGoods(record.id!)}>
            删除
          </Button>,
        ];
      },
    },
  ];
  return (
    <ProTable<VirtualGood>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const data = {
          pageLimit: params.pageSize!,
          pageOffset: params.current!,
          kind: VirtualGoodKind.Gift,
        };
        const res = await getVirtualGoodList(data);
        return {
          data: res.goods || [],
          success: true,
          total: res.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 10 }}
      headerTitle="商品列表"
      toolBarRender={() => [
        <Button key="add" onClick={onAdd}>
          添加
        </Button>,
      ]}
    />
  );
};

export default TablePage;
