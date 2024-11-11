import { useState } from 'react';
import coupon1bg from './images/coupon1bg.png';
import dayjs from 'dayjs';
import coupon2bg from './images/coupon2bg.png';
import couponicon from './images/couponicon.png';
import React from 'react';
import { Image } from 'antd';
import { Coupon } from '@/apifox/models';
type IProps = {
  item: Coupon;
  onDestoryClick?: any;
};
const CouponCard = ({ item, onDestoryClick }: IProps) => {
  return (
    <div className="relative mb-[20px]  aspect-[722/208] w-[400px] " key={item.id}>
      <div className="absolute inset-0">
        <Image src={item.status === 'unused' ? coupon1bg : coupon2bg} alt="" />
      </div>
      <div className="absolute inset-0 flex items-center gap-[40px]">
        <div className="flex w-[90px] flex-col items-center justify-center gap-[4px] text-[#fff]">
          <div className="flex gap-[0px]">
            <div className="text-[12px]">$</div>
            <div className="text-[28px] font-[700] leading-[1]">{parseInt(item.amount!)}</div>
          </div>
          <div className="text-[11px]">无门槛</div>
        </div>
        <div className="flex h-full flex-1 flex-col justify-center gap-[6px]">
          <div className="text-[14px] font-[600]">{parseInt(item.amount!)}元无门槛现金券</div>
          <div className="text-[12px] text-[#999]">
            {dayjs(item.startDate).format('YYYY.MM.DD')} -{' '}
            {dayjs(item.endDate).format('YYYY.MM.DD')}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 rounded-br-[6px] rounded-tl-[6px] bg-[rgba(0,0,0,.4)] px-[8px] text-[10px] leading-[1.8] text-[#fff]">
        门店支付
      </div>
      {item.status === 'expired' || item.status === 'used' ? (
        <div className="absolute right-0 top-[50%] flex aspect-[90/106] w-[45px] -translate-y-1/2 items-center justify-center">
          <Image src={couponicon} alt="" className="" />
          <div className="absolute left-[10px] rotate-[-35deg] text-[11px] font-[500px] text-[#A6A8BD]">
            {item.status === 'used' ? '已使用' : '已过期'}
          </div>
        </div>
      ) : null}
      {onDestoryClick ? (
        <div
          className="absolute cursor-pointer right-[10px] top-[50%] -translate-y-1/2 rounded-[20px] bg-[#333] px-[16px] py-[4px] text-[14px] text-[#fff]"
          onClick={() => onDestoryClick?.(item)}
        >
          核销
        </div>
      ) : null}
    </div>
  );
};

export default CouponCard;
