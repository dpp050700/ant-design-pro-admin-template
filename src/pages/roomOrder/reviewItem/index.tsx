import React from 'react';
import { Image, Avatar, Rate } from 'antd';

import style from './index.module.scss';
import { Rating } from '@/apifox/index';
import { S3ImageUrl } from '@/components/Image';

const scoreMap: Array<{ key: keyof Rating; label: string }> = [
  { key: 'scene', label: '景观' },
  { key: 'food', label: '饮食' },
  { key: 'infrastructure', label: '设施' },
  { key: 'service', label: '服务' },
];

interface ReviewItem {
  userAvatar?: string;
  userName?: string;
  reviewTime?: string;
  text?: string;
  images?: string[];
  rating?: Rating;
}

const ReviewItem = ({
  userAvatar = '',
  userName,
  reviewTime,
  text,
  rating,
  images = [],
}: ReviewItem) => {
  return (
    <div className={style['review-item']}>
      <div className="flex items-center">
        <div className="overflow-hidden rounded-[50%]">
          <Avatar src={S3ImageUrl(userAvatar)} className="w-[60px] h-[60px]" />
        </div>
        <div className="ml-[12px]">
          <div className="text-[14px] font-medium">{userName || '--'}</div>
          <div className="mt-[4px] flex items-center">
            <span className="leading-[17px] text-text-secondary">{reviewTime}</span>
          </div>
        </div>
      </div>
      <div className="mt-[8px] leading-none">
        <Rate value={rating?.total || 0} disabled />
      </div>
      <div className="mt-[15px] flex flex-wrap gap-[8px]">
        {scoreMap.map((item) => {
          return (
            <div key={item.key} className={style['score-tag']}>
              <span>{item.label}</span>
              <span className="ml-[5px] font-semibold text-text-primary">
                {rating?.[item.key] || 0}
              </span>
            </div>
          );
        })}
      </div>

      <div className="my-[15px] ">{text}</div>
      <div className="flex flex-wrap gap-[9px]">
        {images.map((item, index) => (
          <Image key={index} src={S3ImageUrl(item)} width={120} height={120} />
        ))}
      </div>
    </div>
  );
};

export default ReviewItem;
