import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { Form } from 'antd';
import { RollerAnnouncement } from '@/apifox/models';

interface NoticeItemProps {
  initialValues: RollerAnnouncement;
}

const NoticeItem = forwardRef(function NoticeItem({ initialValues }: NoticeItemProps, ref) {
  const [form]: any = Form.useForm();
  useImperativeHandle(ref, () => ({
    getNoticeItemValue: () => {
      return { ...form.getFieldsValue(), id: initialValues.id };
    },
  }));
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);
  console.log(initialValues);
  return (
    <div className="relative w-full h-full">
      <ProForm
        form={form}
        autoFocusFirstInput
        submitter={false}
        layout="horizontal"
        initialValues={initialValues}
      >
        <ProFormText width="lg" name="desc" label="公告内容" placeholder="请输入公告内容" />
      </ProForm>
    </div>
  );
});

export default NoticeItem;
