// import ProFormQuill from '@/components/ProFormFields/ProFormQuill';
import React from 'react';
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { PutS3ImageUrl, S3ImageUrl } from '@/constants/s3Image';

interface FormProps {
  id?: string | number;
}

const Form = (props: FormProps & ModalFormProps) => {
  const { title: _title, id, formRef, initialValues, ..._props } = props;

  const title = _title ? _title : id ? `修改` : '添加';
  return (
    <ModalForm
      {..._props}
      title={title}
      initialValues={initialValues}
      grid
      layout="horizontal"
      rowProps={{ gutter: [0, 0] }} // gutter 设置 x 轴 y轴 间距
      labelCol={{ flex: '120px' }}
      colProps={{ span: 24 }}
      formRef={formRef}
    >
      <ProFormText name="name" label="景点名字" placeholder="" />
      <ProFormText name="country" label="国家" placeholder="" />
      <ProFormText name="city" label="城市" placeholder="" />
      <ProFormUploadButton
        name="images"
        label="图片"
        max={1}
        convertValue={(value) => {
          if (!value) return [];
          return value.map((item: any) => {
            if (typeof item === 'string') {
              console.log(item);
              return {
                url: S3ImageUrl(item),
                thumbUrl: S3ImageUrl(item),
                uid: item,
                name: item,
                status: 'done',
              };
            }
            return item;
          });
        }}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        action={PutS3ImageUrl}
        transform={(value) => {
          return {
            images: value.map((item: any) => {
              if (item.response) {
                return item.response.key;
              }
              return item;
            }),
          };
        }}
      />
    </ModalForm>
  );
};

export default Form;
