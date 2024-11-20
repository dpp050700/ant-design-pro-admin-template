import { ModalForm, ProFormText } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

interface FormProps {
  id?: string | number;
}

const Form = (props: FormProps & ModalFormProps) => {
  const { title: _title, id, ...modalFormProps } = props;

  const title = _title ? _title : id ? `修改` : '添加';
  // console.log(title, modalFormProps);
  return (
    <ModalForm {...modalFormProps} title={title}>
      <ProFormText width="md" name="name" label="Name" placeholder="" />
    </ModalForm>
  );
};

export default Form;
