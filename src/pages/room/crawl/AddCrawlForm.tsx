import { ModalForm, ModalFormProps, ProFormText } from '@ant-design/pro-components';
import { RoomAdminServiceApi, RoomCrawler } from '@/apifox/index';
import React, { useRef, useState } from 'react';

interface RoomFormProps extends ModalFormProps<RoomCrawler> {
  initialValues: RoomCrawler | undefined;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const AddCrawlForm = ({ onCancel, initialValues, onAddSuccess, ...props }: RoomFormProps) => {
  const roomAdminServiceApi = new RoomAdminServiceApi();
  const title = '从Airbnb爱彼迎导入房源信息';

  const onFinish = async (value: any) => {
    roomAdminServiceApi
      .roomAdminServiceCreateRoomCrawler({
        body: { data: { kind: 'airbnb', name: value.name, url: value.url } },
      })
      .then(() => {
        onAddSuccess();
      });

    return true;
  };

  return (
    <ModalForm<RoomCrawler>
      title={title}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
      size="large"
      width={'700px'}
      {...props}
    >
      <ProFormText
        width="lg"
        name="name"
        label="爬虫名称"
        placeholder="请输入房源名称、房源标签等标识"
      />

      <ProFormText
        width="lg"
        name="url"
        label="将您在Airbnb爱彼迎的房源链接黏贴至此"
        placeholder="请复制黏贴链接地址"
      />
    </ModalForm>
  );
};

export default AddCrawlForm;
