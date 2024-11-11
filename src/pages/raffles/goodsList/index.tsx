import React, { useRef, useState } from 'react';
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Image, Input, message, Modal } from 'antd';
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
import { useRequest } from 'ahooks';

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

  const formRef = useRef<ProFormInstance>();

  useRequest(() => virtualGoodService.virtualGoodServiceGetRaffle(), {
    onSuccess(data) {
      formRef.current?.setFieldsValue({
        points: data.points,
        description: data.description as string,
      });
    },
  });

  const onAdd = () => {
    history.push('/raffles/goodsDetail/new');
  };

  const columns: ProColumns<VirtualGood>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '奖品名称',
      dataIndex: 'name',
      ellipsis: true,
      render: (text, record) => {
        if (record.type === VirtualGoodType.Virtual) {
          return `${record.points} CJP`;
        }
        return text;
      },
    },
    {
      title: '奖品图片',
      dataIndex: 'thumbnail',
      ellipsis: true,
      render: (text, record, _, action) => {
        if (record.type === VirtualGoodType.Empty || !record.thumbnail) {
          return '';
        }
        return (
          <Image
            className="!w-[100px] aspect-square"
            key={record.thumbnail}
            src={S3ImageUrl(record.thumbnail!)}
          />
        );
      },
    },
    {
      title: '奖品类型',
      dataIndex: 'type',
      ellipsis: true,
      render: (dom, record) => {
        const VirtualGoodKindStr = {
          [VirtualGoodType.Physical]: '实体',
          [VirtualGoodType.Virtual]: '虚体',
          [VirtualGoodType.Empty]: '无奖',
        };
        return VirtualGoodKindStr[record.type!];
      },
    },
    {
      title: '中奖概率',
      dataIndex: ['detail', 'probability'], //"detail.probability",
      render: (text, record) => {
        return !record.detail?.probability ? '0%' : `${text}%`;
      },
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
            onClick={() => history.push(`/raffles/goodsDetail/${record.id}`)}
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
          kind: VirtualGoodKind.Lottery,
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
      headerTitle="奖项设置"
      toolBarRender={() => [
        <Button key="add" onClick={onAdd}>
          添加
        </Button>,
      ]}
      tableRender={(props, dom, { toolbar, alert, table }) => (
        <>
          <div className="bg-white p-6">
            <ProForm
              title=""
              onFinish={async (values) => {
                virtualGoodServiceAdmin.virtualGoodAdminServiceSaveRaffle({
                  body: {
                    points: values.points,
                    description: values.description,
                  },
                });
                message.success('提交成功');
                return true;
              }}
              layout="horizontal"
              formRef={formRef}
            >
              <ProFormDigit
                width="md"
                name="points"
                label="单次抽奖消耗积分"
                placeholder=""
                addonAfter="CJP"
                fieldProps={{ precision: 0 }}
              />
              <ProFormTextArea
                name="description"
                width="xl"
                label="单次抽奖规则描述"
                placeholder="请输入规则描述"
                fieldProps={{ rows: 3 }}
              />
            </ProForm>
          </div>
          <div>{toolbar}</div>
          <div>{table}</div>
        </>
      )}
    />
  );
};

export default TablePage;
