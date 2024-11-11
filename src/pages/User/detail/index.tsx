import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { ModalForm, ProFormDateRangePicker, ProFormDigit } from '@ant-design/pro-components';
import { Coupon, CouponServiceApi, UserServiceApi } from '@/apifox/index';
import { Button, Form, Image, message, Modal } from 'antd';
import { history, useParams } from '@umijs/max';
import styles from './index.module.scss';

import { S3ImageUrl } from '@/components/Image';
import { useInfiniteScroll, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import CouponCard from './CouponCard';
import JifenBoard from './JifenBoard';
const UserDetail = () => {
  const userService = new UserServiceApi();
  const params = useParams();

  const userId = params.id;
  const { data: userInfo, refresh: refreshUserInfo } = useRequest(
    () => userService.userServiceDetail({ id: userId! }),
    {
      refreshDeps: [userId],
      ready: !!userId,
    },
  );

  const tabs = [
    { value: 'unused', label: '可用' },
    { value: 'used', label: '已使用' },
    { value: 'expired', label: '已过期' },
  ];

  const [coupontype, setcoupontype] = useState<'unused' | 'used' | 'expired'>('unused');
  const CouponService = new CouponServiceApi();

  const getList = (offset = 0) => {
    return CouponService.couponServiceFind({
      pageOffset: offset,
      pageLimit: 10,
      status: coupontype,
      currency: 'dollar',
      userId: userId!,
      allData: true,
    }).then((res) => {
      return {
        list: res.data || [],
        total: res.total || 0,
        offset: offset + 1,
      };
    });
  };

  const {
    data = { list: [], total: 0 },
    loadMore,
    loadingMore,
    noMore,
    reload,
  } = useInfiniteScroll((d) => getList(d?.offset), {
    isNoMore: (data = { list: [], total: 0, pageOffset: 0 }) => {
      return data.list.length >= data.total;
    },
    reloadDeps: [coupontype],
  });
  const [form] = Form.useForm<{
    amount: string;
    dateRange: Date[];
  }>();

  const onDestoryClick = (item: Coupon) => {
    Modal.confirm({
      width: 500,
      title: '提示',
      content: (
        <div className="flex flex-col gap-[20px]">
          <div className="text-[16px]">是否确定核销以下该优惠券?</div>
          <CouponCard item={item} key={item.id} />
        </div>
      ),
      okText: '确定核销',
      onOk: async () => {
        await CouponService.couponServiceDestroyUserCoupon({
          body: { couponId: item.id, userId: userId },
        });
        message.success('核销成功');
        reload();
      },
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center bg-[#fff] h-[60px] px-[20px] justify-between text-[16px]">
        <div className="flex items-center gap-[10px]">
          <LeftOutlined onClick={() => history.push(`/user/list`)} />
          {userInfo?.nickname}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center gap-[40px] p-[20px] text-[14px]">
          <div className="flex-1">
            <div className="opacity-50">昵称</div>
            <div className="mt-[6px]">{userInfo?.nickname}</div>
          </div>
          <div className="flex-1">
            <div className="opacity-50">头像</div>
            <div className="mt-[6px]">
              <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[50%] border border-solid border-[#2BCFD6]">
                {userInfo?.avatar ? (
                  <Image className="!w-[100px] aspect-square" src={S3ImageUrl(userInfo.avatar)} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="opacity-50">邮箱</div>
            <div className="mt-[6px]">{userInfo?.email}</div>
          </div>
          <div className="flex-1">
            <div className="opacity-50">性别</div>
            <div className="mt-[6px]">{userInfo?.gender}</div>
          </div>
          <div className="flex-1">
            <div className="opacity-50">注册时间</div>
            <div className="mt-[6px]">{dayjs(userInfo?.createdAt).format('YYYY.MM.DD')}</div>
          </div>
        </div>
        <JifenBoard userInfo={userInfo!} refreshUserInfo={refreshUserInfo} />
        <div className="px-[20px] text-[16px] font-[500] mt-[20px]">他的优惠券</div>
        <div className="my-[20px] flex w-full gap-[40px] bg-[#fff] px-[20px] py-[20px] text-[14px] justify-between">
          <div className="flex gap-[40px]">
            {tabs.map((item) => (
              <div
                key={item.value}
                onClick={() => setcoupontype(item.value as any)}
                className={`relative cursor-pointer ${
                  coupontype === item.value ? styles.activetab : ''
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[20px]">
            <ModalForm
              title="发放优惠券"
              trigger={<Button type="primary">发放优惠券</Button>}
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                // console.log("values---", values);
                await CouponService.couponServiceCreate({
                  body: {
                    coupon: {
                      amount: String(values.amount),
                      currency: '',
                      startDate: new Date(values.dateRange[0]),
                      endDate: new Date(values.dateRange[1]),
                    },
                    userId: userId,
                  },
                });
                message.success('提交成功');
                reload();
                return true;
              }}
              initialValues={{
                couponType: 'aaa',
              }}
            >
              <ProFormDigit
                width="md"
                name="amount"
                label="优惠券金额:"
                tooltip=""
                placeholder=""
              />

              <ProFormDateRangePicker name="dateRange" label="可用时间" />
              {/* <ProFormRadio.Group
              name="couponType"
              label="类型"
              options={[
                {
                  label: "无门槛",
                  value: "aaa",
                },
              ]}
            /> */}
            </ModalForm>
          </div>
        </div>
        <div className="bg-[#fff] p-[20px]">
          <div className="flex flex-wrap gap-[40px]">
            {data.list.map((item: Coupon, i) => (
              <CouponCard item={item} key={item.id} onDestoryClick={onDestoryClick} />
            ))}
          </div>
          <div className="flex justify-center mt-[10px]">
            {!noMore && (
              <Button type="dashed" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading more...' : '查看更多'}
              </Button>
            )}

            {noMore && <span>No more data</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
