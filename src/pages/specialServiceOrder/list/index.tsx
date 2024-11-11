import React, { useRef } from 'react';
import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  Order,
  OrderSpecialServiceApi,
  OrderStatus,
  SpecialOrder,
  SpecialServiceStatus,
} from '@/apifox/index';
import { Button, Modal } from 'antd';
import style from './index.module.scss';

const orderService = new OrderSpecialServiceApi();

const OrderStatusTag = ({ status }: { status: OrderStatus }) => {
  const statusMap: Partial<Record<OrderStatus, { label: string; color: string }>> = {
    paying: { label: '未付款', color: '#FF4D4F' },
    pending: { label: '已付款', color: '#52C41A' },
    canceled_ok: { label: '已取消', color: '#BFBFBF' },
    finished: { label: '已使用', color: '#BFBFBF' },
    failed: { label: '已失败', color: '#BFBFBF' },
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
  const columns: ProColumns<SpecialOrder>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '服务类型',
      dataIndex: ['specialService', 'catalog', 'name'],
      ellipsis: true,
      fixed: 'left',
      copyable: true,
      search: false,
    },

    {
      title: '服务名称',
      dataIndex: ['specialService', 'name'],
      ellipsis: true,
      search: false,
    },
    {
      title: '绑定房源',
      dataIndex: ['room', 'title'],
      ellipsis: true,
      search: false,
    },
    {
      title: '预定人',
      dataIndex: ['detail', 'customerName'],
      ellipsis: true,
      search: false,
    },

    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      search: false,
      render: (dom, record) => {
        return <OrderStatusTag status={record.status} />;
      },
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        const paying = (
          <Button size="small" key="paying" onClick={() => onPaying(record)}>
            设为已付款
          </Button>
        );
        const onUse = (
          <Button key="checkIn" size="small" onClick={() => onUseOrder(record)}>
            使用
          </Button>
        );

        const cancel = (
          <a key="cancel" onClick={() => onCancel(record)}>
            取消订单
          </a>
        );

        if (record.status === 'paying') return [paying, cancel];
        if (record.status === 'pending') return [onUse, cancel];
        return [];
      },
    },
  ];

  const onPaying = (data: SpecialOrder) => {
    Modal.confirm({
      content: '是否确定要将订单改为已付款？',
      onOk() {
        orderService.orderSpecialServiceOrderSpecialPay({ body: { id: [data.id] } }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const onUseOrder = (data: SpecialOrder) => {
    Modal.confirm({
      content: '是否确定要将订单改为已使用？',
      onOk() {
        orderService.orderSpecialServiceOrderSpecialUsed({ id: data.id, body: {} }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const onCancel = (data: SpecialOrder) => {
    console.log(data);
    Modal.confirm({
      content: '是否确定要取消此订单？',
      onOk() {
        orderService.orderSpecialServiceOrderSpecialCancel({ id: data.id, body: {} }).then(() => {
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
    const res = await orderService.orderSpecialServiceOrderSpecialFind({
      pageLimit: params.pageSize,
      pageOffset: (params.current || 1) - 1,
    });
    return {
      data: res.orders || [],
      success: true,
      total: res.total,
    };
  };

  return (
    <>
      <ProTable<SpecialOrder>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 10 }}
        headerTitle="特色服务订单列表"
      />
    </>
  );
};

export default TablePage;
