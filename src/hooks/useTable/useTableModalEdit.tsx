import { useState, Fragment as ReactFragment, useRef } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';

interface UseTableAddProps<FormValue> {
  getDetail: (id: any) => Promise<any>;
  postDetail: (values: FormValue) => Promise<any>;
  putDetail: (id: any, values: FormValue) => Promise<any>;
  tableRef: React.RefObject<ActionType | undefined>;
}

const useTableModalEdit = <FormValue,>(props: UseTableAddProps<FormValue>) => {
  const formRef = useRef<ProFormInstance>();
  const [visible, setVisible] = useState(false);

  const [editId, setEditId] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  const onAdd = () => {
    setEditId(null);
    setDetail(null);
    setVisible(true);
    formRef.current?.resetFields();
  };

  const onEdit = async (id: any) => {
    if (!id) return;
    setEditId(id);
    const detail = await props.getDetail(id);
    setDetail(detail);
    setVisible(true);
    formRef.current?.setFieldsValue(detail);
  };

  const onClose = () => {
    setVisible(false);
  };

  const AddButton = () => (
    <ReactFragment>
      <Button type="primary" onClick={onAdd}>
        添加
      </Button>
    </ReactFragment>
  );

  const EditButton = (props: { id: any } & ButtonProps) => {
    const { id, ...rest } = props;
    return (
      <ReactFragment>
        <Button {...rest} onClick={() => onEdit(id)}>
          编辑
        </Button>
      </ReactFragment>
    );
  };

  return {
    AddButton,
    EditButton,
    editId,
    setEditId,
    detail,
    setDetail,
    modalFormProps: {
      open: visible,
      modalProps: {
        onCancel: onClose,
        afterOpenChange: (open: boolean) => {
          if (open) {
            formRef.current?.setFieldsValue(detail);
          }
        },
      },
      onFinish: async (values: any) => {
        if (editId) {
          console.log(values, editId, 111);
          // 修改
          await props.putDetail(editId, values);
        } else {
          // 添加
          await props.postDetail(values);
        }
        setVisible(false);
        props.tableRef.current?.reload();
      },
      formRef,
    },

    showModal: () => setVisible(true),
    hideModal: () => setVisible(false),
  };
};

export default useTableModalEdit;
