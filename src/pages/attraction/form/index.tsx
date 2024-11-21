import ProFormQuill from '@/components/ProFormFields/ProFormQuill';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

interface FormProps {
  id?: string | number;
}

const Form = (props: FormProps & ModalFormProps) => {
  const { title: _title, id, ...modalFormProps } = props;

  const title = _title ? _title : id ? `修改` : '添加';
  // console.log(title, modalFormProps);
  return (
    <ModalForm
      {...modalFormProps}
      title={title}
      grid
      layout="inline"
      rowProps={{ gutter: [10, 10] }} // gutter 设置 x 轴 y轴 间距
      labelCol={{ span: 6 }}
      colProps={{ span: 12 }}
    >
      <ProFormText
        name="name"
        label="名称"
        placeholder="请输入名称"
        colProps={{ span: 12 }}
        labelCol={{ span: 6 }} //{span: '120px'} 设置 label 固定宽度
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormText
        name="description"
        label="描述"
        placeholder="请输入描述"
        colProps={{ span: 12 }}
        labelCol={{ span: 6 }}
        rules={[{ required: true, message: '请输入描述' }]}
      />
      <ProFormText
        name="name"
        label="Name"
        placeholder=""
        labelCol={{ span: 3 }}
        colProps={{ span: 24 }}
      />
      <ProFormText
        name="age"
        label="age"
        placeholder=""
        labelCol={{ span: 6 }}
        colProps={{ span: 12 }}
      />

      <ProFormSelect
        name="select"
        label="Select"
        valueEnum={{
          china: 'China',
          usa: 'U.S.A',
        }}
        placeholder="Please select a country"
        rules={[{ required: true, message: 'Please select your country!' }]}
      />
      <ProFormQuill name="detail" label="detail" labelCol={{ span: 6 }} colProps={{ span: 12 }} />
    </ModalForm>
  );
};

export default Form;
