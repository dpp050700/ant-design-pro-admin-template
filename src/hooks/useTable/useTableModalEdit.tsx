import { useState, Fragment as ReactFragment } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface UseTableAddProps {
  getDetail: (id: any) => Promise<any>;
}

const useTableModalEdit = (props: UseTableAddProps) => {
  const [visible, setVisible] = useState(false);

  const [editId, setEditId] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  const onAdd = () => {
    setEditId(null);
    setVisible(true);
  };

  const onEdit = async (id: any) => {
    if (!id) return;
    setEditId(id);
    const detail = await props.getDetail(id);
    setDetail(detail);
    setVisible(true);
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
      },
    },
    showModal: () => setVisible(true),
    hideModal: () => setVisible(false),
  };
};

export default useTableModalEdit;
