import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {
  VirtualGoodAdminServiceApi,
  VirtualGoodOrder,
  VirtualGoodOrderStatus,
} from '@/apifox/index';
import { Button, message, Popover } from 'antd';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

const DeliveryButton = ({
  order,
  tableRef,
}: {
  order: VirtualGoodOrder;
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
      logisticsCompany: order.detail?.logisticsCompany,
      logisticsNumber: order.detail?.logisticsNumber,
    });
  }, [order.detail, open]);

  return (
    <Popover
      content={
        <ProForm
          title=""
          onFinish={async (values) => {
            virtualGoodServiceAdmin.virtualGoodAdminServiceDeliverGoods({
              id: order.id,
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

  const getExchangeList = (data: any) => {
    return virtualGoodService.virtualGoodAdminServiceFindAllExchangeRecord(data);
  };

  const columns: ProColumns<VirtualGoodOrder>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '实物兑奖ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: ['virtualGood', 'name'],
      ellipsis: true,
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
        const address = record.address;
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
      dataIndex: 'status',
      ellipsis: true,
      render: (dom, record) => {
        const status = {
          [VirtualGoodOrderStatus.Created]: '创建但未兑换',
          [VirtualGoodOrderStatus.Exchanging]: '兑换中',
          [VirtualGoodOrderStatus.Exchanged]: '已经兑换',
          [VirtualGoodOrderStatus.Shipped]: '已经发货',
          [VirtualGoodOrderStatus.Cancelled]: '已经取消',
          [VirtualGoodOrderStatus.Completed]: '已经完成',
        };
        return status[record.status]; // record.role === "admin" ? "管理员" : "成员";
      },
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        const status = record.status;
        return ![VirtualGoodOrderStatus.Created].includes(status as any) ? (
          <DeliveryButton order={record} tableRef={tableRef} />
        ) : null;
      },
    },
  ];
  return (
    <ProTable<VirtualGoodOrder>
      columns={columns}
      actionRef={tableRef}
      cardBordered
      request={async (params) => {
        const data = {
          pageLimit: params.pageSize!,
          pageOffset: params.current!,
        };
        const res = await getExchangeList(data);
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
      headerTitle="积分兑换列表"
    />
  );
};

export default TablePage;
