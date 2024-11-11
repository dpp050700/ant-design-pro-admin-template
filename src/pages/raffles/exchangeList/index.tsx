import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Popover } from 'antd';
import {
  VirtualGoodAdminServiceApi,
  VirtualGoodOrderStatus,
  VirtualGoodRaffleRecord,
  VirtualGoodType,
} from '@/apifox/index';

const DeliveryButton = ({
  order,
  tableRef,
}: {
  order: VirtualGoodRaffleRecord['order'];
  tableRef: MutableRefObject<ActionType | undefined>;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const formRef = useRef<ProFormInstance>();
  const virtualGoodServiceAdmin = new VirtualGoodAdminServiceApi();

  useEffect(() => {
    formRef.current?.setFieldsValue({
      logisticsCompany: order?.detail?.logisticsCompany,
      logisticsNumber: order?.detail?.logisticsNumber,
    });
  }, [order?.detail, open]);

  return (
    <Popover
      content={
        <ProForm
          title=""
          onFinish={async (values) => {
            virtualGoodServiceAdmin.virtualGoodAdminServiceDeliverGoods({
              id: order!.id,
              body: {
                logisticsCompany: values.logisticsCompany,
                logisticsNumber: values.logisticsNumber,
              },
            });
            message.success('提交成功');
            setOpen(false);
            tableRef.current?.reload();
            return true;
          }}
          layout="horizontal"
          formRef={formRef}
        >
          <ProFormText width="sm" name="logisticsCompany" label="物流公司" placeholder="" />
          <ProFormText width="sm" name="logisticsNumber" label="物流单号" placeholder="" />
        </ProForm>
      }
      open={open}
      onOpenChange={handleOpenChange}
      trigger="click"
    >
      <Button key="edit" size="small" type="default">
        录入发货信息
      </Button>
    </Popover>
  );
};

const TablePage: React.FC = () => {
  const tableRef = useRef<ActionType>();

  const virtualGoodService = new VirtualGoodAdminServiceApi();

  const getList = (data: any) => {
    return virtualGoodService.virtualGoodAdminServiceFindAllRaffleGoods(data);
  };

  const columns: ProColumns<VirtualGoodRaffleRecord>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '实物兑奖ID',
      dataIndex: ['order', 'id'],
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: ['virtualGood', 'name'],
      ellipsis: true,
      render: (text, record) => {
        if (record.virtualGood?.type === VirtualGoodType.Physical) {
          return record.virtualGood.name;
        } else if (record.virtualGood?.type === VirtualGoodType.Virtual) {
          return record.virtualGood.points + ' CJP';
        } else if (record.virtualGood?.type === VirtualGoodType.Empty) {
          return record.virtualGood.name;
        }
        return null;
      },
    },
    {
      title: '用户昵称',
      dataIndex: ['user', 'nickname'],
      ellipsis: true,
    },
    {
      title: '用户邮箱',
      dataIndex: ['user', 'email'],
      ellipsis: true,
    },
    {
      title: '兑换用户信息',
      dataIndex: 'address',
      render: (dom, record) => {
        const address = record.order?.address;
        return address ? (
          <div className="">
            <div className="">
              {address.xing}
              {address.ming} ({address.xing1}
              {address.ming1})
            </div>
            <div className="font-normal leading-[20px]">{address.hao}</div>
            <div className="font-normal leading-[20px]">
              {address.sheng! + address.shi! + address.banchi! + address.jian}
            </div>
          </div>
        ) : null;
      },
    },
    {
      title: '兑换时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '兑换状态',
      dataIndex: 'role',
      ellipsis: true,
      render: (dom, record) => {
        const statusMap = {
          [VirtualGoodOrderStatus.Created]: '创建但未兑换',
          [VirtualGoodOrderStatus.Exchanging]: '兑换中',
          [VirtualGoodOrderStatus.Exchanged]: '已经兑换',
          [VirtualGoodOrderStatus.Shipped]: '已经发货',
          [VirtualGoodOrderStatus.Cancelled]: '已经取消',
          [VirtualGoodOrderStatus.Completed]: '已经完成',
        };
        return record.order?.status ? statusMap[record.order?.status] : null;
      },
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        const status = record.order?.status;
        return record.order &&
          record.order.id &&
          ![VirtualGoodOrderStatus.Created].includes(status as any) ? (
          <DeliveryButton order={record.order} tableRef={tableRef} />
        ) : null;
      },
    },
  ];
  return (
    <ProTable<VirtualGoodRaffleRecord>
      columns={columns}
      actionRef={tableRef}
      cardBordered
      request={async (params) => {
        const data = {
          pageLimit: params.pageSize!,
          pageOffset: params.current!,
        };
        const res = await getList(data);
        return {
          data: res.data || [],
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
      headerTitle="抽奖兑换列表"
    />
  );
};

export default TablePage;
