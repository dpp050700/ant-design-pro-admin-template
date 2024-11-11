import React, { useRef } from 'react';
import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Order, OrderServiceApi, OrderStatus, RoomComment } from '@/apifox/index';
import { Alert, Button, Divider, Modal, message, Typography } from 'antd';
import style from './index.module.scss';
import ReviewItem from '../reviewItem';
import dayjs from 'dayjs';
import useLoginStore from '@/stores/login';
import { WEB_SITE_URL_PC } from '@/libs/constants';

const orderService = new OrderServiceApi();

const OrderStatusTag = ({ status }: { status: OrderStatus }) => {
  const statusMap: Partial<Record<OrderStatus, { label: string; color: string }>> = {
    auditing: { label: '待确认', color: '#ff8f1f' },
    paying: { label: '未付款', color: '#FF4D4F' },
    in_payment: { label: '支付中', color: '#FF4D4F' },
    pending: { label: '已付款', color: '#52C41A' },
    checked_in: { label: '入住中', color: '#1777FF' },
    canceled: { label: '取消待审核', color: '#BFBFBF' },
    canceled_ok: { label: '已取消', color: '#BFBFBF' },
    finished: { label: '已完成', color: '#BFBFBF' },
    failed: { label: '已失败', color: '#BFBFBF' },
    checked_out: { label: '已退房', color: '#1777FF' },
  };

  return (
    <div className={style.tag}>
      <span className={style.point} style={{ backgroundColor: statusMap[status]?.color }}></span>
      <span>{statusMap[status]?.label}</span>
    </div>
  );
};

const TablePage: React.FC = () => {
  const userId = useLoginStore((state) => state.userInfo?.userId);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Order>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '房源名称',
      dataIndex: ['room', 'title'],
      ellipsis: true,
      fixed: 'left',
      copyable: true,
      search: false,
      render: (text, record) => {
        return (
          <Typography.Link
            href={`${WEB_SITE_URL_PC}/roomDetail?id=${record.roomId}`}
            target="_blank"
            ellipsis
            copyable={{ text: record.room?.title }}
          >
            {record.room?.title}
          </Typography.Link>
        );
      },
    },
    {
      title: '房源确认时间',
      dataIndex: 'confirmedTime',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '平台昵称',
      dataIndex: ['user', 'nickname'],
      ellipsis: true,
      search: false,
    },
    {
      title: '订房者',
      dataIndex: ['detail', 'customerName'],
      ellipsis: true,
      search: false,
    },
    {
      title: '联系电话',
      dataIndex: ['detail', 'customerPhone'],
      ellipsis: true,
      search: false,
    },
    {
      title: '入住人数',
      dataIndex: 'country',
      ellipsis: true,
      search: false,
      render(dom, entity) {
        return (
          <div>
            {entity.detail?.adultsCount ? `${entity.detail?.adultsCount}成人` : ''}
            {entity.detail?.childrenCount ? `${entity.detail?.childrenCount}儿童` : ''}
            {entity.detail?.babyCount ? `${entity.detail?.babyCount}婴儿` : ''}
          </div>
        );
      },
    },
    {
      title: '已购特色服务',
      dataIndex: 'specialOrders',
      ellipsis: true,
      search: false,
      render(dom, entity) {
        return entity.specialOrders
          ?.filter((item) =>
            ([OrderStatus.Pending, OrderStatus.Finished] as string[]).includes(item.status),
          )
          .map((item) => item.specialService?.name)
          .join(',');
      },
    },
    {
      title: '入住时间',
      dataIndex: 'startDate',
      ellipsis: true,
      valueType: 'date',
      search: false,
    },
    {
      title: '离店时间',
      dataIndex: 'endDate',
      ellipsis: true,
      valueType: 'date',
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
        const auditing = (
          <Button size="small" key="paying" onClick={() => onAuditing(record)}>
            房态确认
          </Button>
        );
        const paying = (
          <Button size="small" key="paying" onClick={() => onPaying(record)}>
            设为已付款
          </Button>
        );
        const checkIn = (
          <Button key="checkIn" size="small" onClick={() => onCheckIn(record)}>
            入住
          </Button>
        );
        const checkOut = (
          <Button key="checkOut" size="small" onClick={() => onCheckOut(record)}>
            退房
          </Button>
        );
        const cancel = (
          <a key="cancel" onClick={() => onCancel(record)}>
            {record.status === 'canceled' ? '同意取消' : '取消订单'}
          </a>
        );

        const view = (
          <a key="view" onClick={() => onView(record)}>
            查看评价
          </a>
        );
        if (record.status === 'auditing') return [auditing, cancel];
        if (record.status === 'paying') return [paying, cancel];
        if (record.status === 'pending') return [checkIn, cancel];
        if (record.status === 'checked_in') return [checkOut];
        if (record.status === 'finished') return [view];
        if (record.status === 'canceled') return [cancel];
      },
    },
  ];

  const onPaying = (data: Order) => {
    Modal.confirm({
      content: '是否确定要将订单改为已付款？',
      onOk() {
        orderService.orderServicePayOk({ id: data.id, body: {} }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const onAuditing = (data: Order) => {
    Modal.confirm({
      content: '是否确定要将订单改为已确认？',
      onOk() {
        orderService.orderServiceAuditing({ id: data.id, body: {} }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const onCheckIn = (data: Order) => {
    Modal.confirm({
      content: '是否确定要将订单改为已入住？',
      onOk() {
        orderService.orderServiceCheckedIn({ id: data.id, body: {} }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const onCheckOut = (data: Order) => {
    Modal.confirm({
      content: '是否确定要退房？',
      onOk() {
        orderService.orderServiceCheckout({ id: data.id, body: {} }).then(() => {
          actionRef.current?.reload();
        });
      },
    });
  };

  const CancelDetail = ({ data }: { data: Order }) => {
    return (
      <div className="text-[15px] px-[18px] py-[16px]">
        {data.status === 'canceled' && (
          <>
            <div className="text-[20px] font-semibold">取消理由</div>
            <div className="mt-[10px] mb-[20px] leading-normal">
              {data.detail?.cancelReason || '--'}
            </div>
          </>
        )}
        <div className="text-[20px] font-semibold">退款明细</div>
        <div className="mb-[11px] mt-[17px] flex justify-between  leading-normal">
          <span>房费</span>
          <span className="font-medium">${data?.detail?.roomPrice}</span>
        </div>
        <div className="mb-[11px] mt-[17px] flex justify-between leading-normal">
          <span>地方税及服务费</span>
          <span className="font-medium">${data?.detail?.serviceFee}</span>
        </div>
        {data?.specialOrders
          ?.filter((item) => item.status === 'pending')
          .map((item) => {
            return (
              <div
                key={item.id}
                className="mb-[11px] mt-[17px] flex justify-between leading-normal"
              >
                <span>{item.specialService?.name}</span>
                <span className="font-medium">${item.specialService?.price}</span>
              </div>
            );
          })}
        <Divider />
        <div className="text-[20px] flex justify-between leading-normal mt-[17px]">
          <span>实退</span>
          <span className="text-[#1677ff] font-semibold">$533</span>
        </div>
      </div>
    );
  };

  const onCancel = (data: Order) => {
    Modal.confirm({
      content: <CancelDetail data={data} />,
      icon: null,
      width: '680px',
      onOk() {
        orderService.orderServiceCancel({ id: data.id, body: { userId: userId! } }).then(() => {
          actionRef.current?.reload();
        });
      },
      footer: (footer) => {
        return (
          <div className="flex flex-row-reverse items-center gap-x-[10px]">
            {footer}
            <Alert message="请确保线下退款已完成" type="error" className="!py-[2px]" />
          </div>
        );
      },
    });
  };

  const onView = (data: Order) => {
    if (!data.comment) {
      message.open({ content: '用户暂未评价' });
      return;
    }
    const comment: RoomComment = data.comment;
    Modal.info({
      content: (
        <ReviewItem
          userAvatar={comment.userInfo?.avatar}
          userName={comment.userInfo?.nickname}
          text={comment.comment}
          images={comment.images}
          rating={comment.rating}
          reviewTime={dayjs(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
        />
      ),
      icon: null,
      okText: '关闭',
      width: '460px',
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
    const res = await orderService.orderServiceFind({
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
      <ProTable<Order>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 10 }}
        headerTitle="房源订单列表"
      />
    </>
  );
};

export default TablePage;
