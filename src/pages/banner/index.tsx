import React, { useEffect, useState } from 'react';
import { ProForm, ProFormUploadButton } from '@ant-design/pro-components';
import {
  BannerServiceApi,
  BannerServiceSaveBannerTypeEnum,
  BannerServiceSaveRequest,
} from '@/apifox/index';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { Form, Tabs } from 'antd';

const BannerForm = () => {
  const [form]: any = Form.useForm();

  const bannerService = new BannerServiceApi();
  const onBannerChange = async (type: BannerServiceSaveBannerTypeEnum, value: any) => {
    const data: BannerServiceSaveRequest['body'] = {
      banner: {
        images: value.map((item: any) => {
          const key = item.response ? item.response.key : item.key;
          return key;
        }),
      },
    };
    await updateBanner(type, data);
  };

  const getBanner = async () => {
    const rsp = await bannerService.bannerServiceFind();
    const data: Partial<Record<BannerServiceSaveBannerTypeEnum, any>> = {};

    rsp.data?.forEach((item) => {
      const { type, images = [] } = item;
      const list = images.map((item: string) => ({
        key: item,
        url: S3ImageUrl(item),
      }));
      data[type!] = list;
    });
    form.resetFields();
    form.setFieldsValue(data);
  };

  const updateBanner = async (
    type: BannerServiceSaveBannerTypeEnum,
    data: BannerServiceSaveRequest['body'],
  ) => {
    await bannerService.bannerServiceSave({ body: data, bannerType: type });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div>
      <ProForm form={form} submitter={false}>
        <ProFormUploadButton
          name="type_home"
          label={
            <div className="flex items-center justify-center">
              <label>首页Banner</label>
              <div className="ml-[20px] text-[#999]">(图片尺寸: 2:1)</div>
            </div>
          }
          action={PutS3ImageUrl}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onChange({ file, fileList }: any) {
              console.log(file);
              if (file.status === 'done') {
                onBannerChange('type_home', fileList);
              }
              if (file.status === 'removed') {
                onBannerChange('type_home', fileList);
              }
            },
          }}
        />

        <ProFormUploadButton
          name="type_order"
          label={
            <div className="flex items-center justify-center">
              <label>订房Banner</label>
              <div className="ml-[20px] text-[#999]">(图片尺寸: 2:1)</div>
            </div>
          }
          action={PutS3ImageUrl}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onChange({ file, fileList }: any) {
              if (file.status === 'done') {
                onBannerChange('type_order', fileList);
              }
              if (file.status === 'removed') {
                onBannerChange('type_order', fileList);
              }
            },
          }}
        />

        <ProFormUploadButton
          name="type_store_info"
          label={
            <div className="flex items-center justify-center">
              <label>门店信息横幅图</label>
              <div className="ml-[20px] text-[#999]">(图片尺寸: 18:5)</div>
            </div>
          }
          action={PutS3ImageUrl}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onChange({ file, fileList }: any) {
              if (file.status === 'done') {
                onBannerChange('type_store_info', fileList);
              }
              if (file.status === 'removed') {
                onBannerChange('type_store_info', fileList);
              }
            },
          }}
        />
      </ProForm>
    </div>
  );
};

export default BannerForm;
