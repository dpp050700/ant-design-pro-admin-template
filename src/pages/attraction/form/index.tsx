import ProFormQuill from '@/components/ProFormFields/ProFormQuill';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { useRef } from 'react';
import type {} from 'antd';

interface FormProps {
  id?: string | number;
}

const Form = (props: FormProps & ModalFormProps) => {
  const ref = useRef<any>(null);
  const { title: _title, id, ...modalFormProps } = props;

  const title = _title ? _title : id ? `修改` : '添加';
  // console.log(title, modalFormProps);
  return (
    <ModalForm
      {...modalFormProps}
      title={title}
      grid
      layout="horizontal"
      rowProps={{ gutter: [0, 0] }} // gutter 设置 x 轴 y轴 间距
      labelCol={{ span: 6 }}
      colProps={{ span: 12 }}
      formRef={ref}
    >
      <ProFormText
        name="name"
        label="Name"
        placeholder=""
        labelCol={{ span: 6 }}
        colProps={{ span: 12 }}
      />
      <ProFormText
        name="age"
        label="age"
        placeholder=""
        labelCol={{ span: 6 }}
        colProps={{ span: 12 }}
        initialValue={'111111'}
      />

      <ProFormText
        name="name11"
        label="Name"
        placeholder=""
        labelCol={{ span: 3 }}
        colProps={{ span: 24 }}
      />

      <ProFormQuill
        initialValue={'<div>11112</div>'}
        name="detail"
        label="detail"
        labelCol={{ span: 3 }}
        colProps={{ span: 24 }}
      />
      <div
        onClick={() => {
          // alert(ref.current.getFieldValue('detail'));
          ref.current.setFieldValue('detail', '<div>hello</div>');
        }}
      >
        1111112
      </div>
    </ModalForm>
  );
};

export default Form;
