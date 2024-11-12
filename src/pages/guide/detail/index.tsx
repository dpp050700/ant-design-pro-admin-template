import { LeftOutlined } from '@ant-design/icons';
import { ActionType, ParamsType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Story, StoryServiceApi, StoryAdminServiceApi, StoryStatus } from '@/apifox/index';
import { Button, message, Modal } from 'antd';
import { history } from '@umijs/max';

const storyServiceApi = new StoryServiceApi();
const storyAdminServiceApi = new StoryAdminServiceApi();

import React, { useState } from 'react';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { WEB_SITE_URL_PC } from '../../../libs/constants';
const GuideDetail = () => {
  const params = useParams();

  const { data: detailData, runAsync } = useRequest(
    () => storyServiceApi.storyServiceDetail({ id: params.id! }),
    {
      ready: !!params.id,
      refreshDeps: [params.id],
    },
  );

  const onPublish = () => {
    Modal.confirm({
      content: '是否确定要上架？',
      onOk() {
        storyAdminServiceApi
          .storyAdminServiceUpdateStatus({
            id: params.id!,
            body: { status: 'published_status' },
          })
          .then(() => {
            message.success('上架成功');
            runAsync();
          });
      },
    });
  };
  const onOffShelf = () => {
    Modal.confirm({
      content: '是否确定要下架？',
      onOk() {
        storyAdminServiceApi
          .storyAdminServiceUpdateStatus({
            id: params.id!,
            body: { status: 'audit_status' },
          })
          .then(() => {
            message.success('下架成功');
            runAsync();
          });
      },
    });
  };

  const onDelete = () => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        storyServiceApi
          .storyServiceDelete({
            id: params.id!,
          })
          .then(() => {
            message.success('删除成功');
            runAsync();
          });
      },
    });
  };
  const onToTop = () => {
    Modal.confirm({
      content: '是否确定要置顶？',
      onOk() {
        storyServiceApi
          .storyServiceTopping({
            id: params.id!,
          })
          .then(() => {
            message.success('置顶成功');
            runAsync();
          });
      },
    });
  };
  const onDeTop = () => {
    Modal.confirm({
      content: '是否确定要取消置顶？',
      onOk() {
        storyServiceApi
          .storyServiceUnTopping({
            id: params.id!,
          })
          .then(() => {
            message.success('取消置顶成功');
            runAsync();
          });
      },
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center bg-[#fff] h-[60px] px-[20px] justify-between text-[16px]">
        <div className="flex items-center gap-[10px]">
          <LeftOutlined onClick={() => history.push(`/guide/list`)} />
          {detailData?.title}
        </div>
        <div className="flex items-center gap-[20px]">
          {detailData?.status === 'audit_status' ? (
            <Button type="primary" key="publish" onClick={() => onPublish()}>
              上架
            </Button>
          ) : (
            <>
              <Button type="primary" key="unpublish" onClick={() => onOffShelf()}>
                下架
              </Button>
              {detailData?.isTopped ? (
                <Button key="onDeTop" onClick={() => onDeTop()}>
                  取消置顶
                </Button>
              ) : (
                <Button key="onToTop" onClick={() => onToTop()}>
                  置顶
                </Button>
              )}
            </>
          )}

          <Button key="del" onClick={() => onDelete()}>
            删除
          </Button>
        </div>
      </div>
      <iframe
        className="w-full h-full mt-[10px]"
        src={`${WEB_SITE_URL_PC}/zh/guideDetail?id=${params.id}`}
      />
    </div>
  );
};

export default GuideDetail;
