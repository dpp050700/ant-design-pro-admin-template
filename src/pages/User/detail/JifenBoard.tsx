import { useRef, useState } from 'react';
import React from 'react';
import { Button, Empty, Form, message, Modal } from 'antd';
import { User, CouponServiceApi, CouponServiceFindRequest, Coupon } from '@/apifox/index';
import { useInfiniteScroll } from 'ahooks';
import {
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import styles from './index.module.scss';
import dayjs from 'dayjs';

const couponKindsMap = {
  sys_coupon: '平台折扣',
  room_share: '房源分享',
  nft_rebate: '质押返佣',
  user_invite: '用户邀请奖励',
  room_check_in: '房源入住',
  reward: '打赏',
  order_comment: '评价',
  user_used: '用户使用的',
  user_register: '用户自己注册',
  finish_user_info: '完善个人信息',
  sys_admin_operate: '系统管理员操作',
  store_register: '门店注册',
  user_exchange: '用户商品兑换',
  lucky_draw_points: '抽奖获取积分',
  lucky_draw_consume: '抽奖消耗积分',
};

interface JifenBoardProps {
  userInfo: User;
  refreshUserInfo: () => void;
}
const JifenBoard = ({ userInfo, refreshUserInfo }: JifenBoardProps) => {
  const [isJifenRecordModalVisible, setIsJifenRecordModalVisible] = useState(false);

  const couponService = new CouponServiceApi();
  const listRef = useRef<HTMLDivElement>(null);

  const getCouponList = (offset = 1) => {
    const reqData: CouponServiceFindRequest = {
      allData: true,
      currency: 'cjp',
      pageOffset: offset,
      pageLimit: 10,
      userId: userInfo.id,
    } as any;
    return couponService.couponServiceFind(reqData).then((res) => {
      return {
        list: res.data || [],
        total: res.total || 0,
        offset: offset + 1,
      };
    });
  };

  const { data = { list: [], total: 0 } } = useInfiniteScroll((d) => getCouponList(d?.offset), {
    isNoMore: (data = { list: [], total: 0, pageOffset: 1 }) => {
      return data.list.length >= data.total;
    },
    reloadDeps: [isJifenRecordModalVisible],
    target: listRef.current,
  });

  const formRef = useRef<ProFormInstance>();

  return (
    <div className="bg-[#fff] py-[30px] px-[20px]">
      <div className="flex justify-between">
        <div className="text-[16px] font-[500]">他的积分</div>
        <div className="flex items-center gap-[30px]">
          <Button type="default" onClick={() => setIsJifenRecordModalVisible(true)}>
            积分记录
          </Button>
          <ModalForm
            title="调整当前积分"
            trigger={<Button type="primary">调整积分</Button>}
            formRef={formRef}
            autoFocusFirstInput
            layout="horizontal"
            labelAlign="right"
            labelCol={{ span: 6 }}
            className={styles.jifenModalForm}
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            width={600}
            submitTimeout={2000}
            onFinish={async (values) => {
              const points =
                Number(values['input-number-add']) || -Number(values['input-number-minus']);
              console.log('values---', values);
              console.log('points---', points);
              if (isNaN(points)) {
                message.error('积分输入框不能为空');
                return false;
              } else {
                await couponService.couponServiceAdjustPoints({
                  body: {
                    userId: userInfo.id,
                    type: values.type,
                    points: points,
                    desc: values.desc,
                    kind: values.kind,
                  },
                });
                message.success('提交成功');
                refreshUserInfo();
                return true;
              }
            }}
            initialValues={{
              type: 'ACTIVATE',
            }}
          >
            <ProFormRadio.Group
              name="type"
              label="选择积分类型"
              options={[
                {
                  label: '激活积分',
                  value: 'ACTIVATE',
                },
                {
                  label: '冻结积分',
                  value: 'FREEZE',
                },
              ]}
            />
            <ProFormDigit
              label={'修改积分数'}
              name="input-number-add"
              min={1}
              fieldProps={{
                precision: 0,
                onChange: (value) => {
                  formRef.current?.setFieldValue('input-number-minus', '');
                },
              }}
              addonBefore="+"
              addonAfter="CJP"
            />
            <ProFormDigit
              label={<div className="opacity-0">修改积分数</div>}
              name="input-number-minus"
              min={1}
              fieldProps={{
                precision: 0,
                onChange: (value) => {
                  formRef.current?.setFieldValue('input-number-add', '');
                },
              }}
              addonBefore="-"
              addonAfter="CJP"
            />
            <ProFormSelect
              name="kind"
              label="请选择理由"
              valueEnum={couponKindsMap}
              placeholder="Please select a country"
              width="sm"
            />
            <ProFormTextArea name="desc" label="备注" placeholder="请输入名称" width={'md'} />
          </ModalForm>
        </div>
      </div>
      <div className="mt-[20px]">
        <div className="flex gap-[100px]">
          <div>
            <div className="text-[14px] text-[#999]">累积积分</div>
            <div className="text-[16px] font-[500] mt-[10px]">{userInfo?.cjpTotal} CJP</div>
          </div>
          <div>
            <div className="text-[14px] text-[#999]">可用积分</div>
            <div className="text-[16px] font-[500] mt-[10px]">{userInfo?.cjpActiveTotal} CJP</div>
          </div>
          <div>
            <div className="text-[14px] text-[#999]">冻结积分</div>
            <div className="text-[16px] font-[500] mt-[10px]">{userInfo?.cjpFreezeTotal} CJP</div>
          </div>
        </div>
      </div>
      <Modal
        title="积分记录"
        open={isJifenRecordModalVisible}
        footer={null}
        width={700}
        onCancel={() => setIsJifenRecordModalVisible(false)}
      >
        <div className="overflow-x-hidden">
          <div className="h-[70vh] overflow-y-auto box-content w-[670px]" ref={listRef}>
            {data.list.length ? (
              data.list.map((item: Coupon, i) => (
                <div
                  key={item.id}
                  className="mt-3 flex items-center gap-4 rounded-lg p-4 border-b-[1px] border-[#f0f0f0]"
                >
                  {/* <div className="relative aspect-square w-[40px]">
                  <Image src={prizeimg} alt="prizeimg" fill />
                  </div> */}
                  <div className="flex-1">
                    <div className="text-[16px] font-semibold text-[#333]">
                      {couponKindsMap[item.kind as keyof typeof couponKindsMap]}
                    </div>
                    <div className="text-[12px] leading-[28px] text-[#999]">
                      {dayjs(item.createdAt).format('YYYY.MM.DD HH:mm:ss')}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-[14px] text-[#1DC6C7] font-semibold">
                      {parseInt(item.amount!)} CJP
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty style={{ padding: '100px 0' }} description="暂无数据" />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JifenBoard;
