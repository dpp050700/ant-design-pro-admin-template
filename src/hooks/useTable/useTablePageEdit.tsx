import { Fragment as ReactFragment } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { history } from '@umijs/max';

interface UseTablePageEditProps {
  path: string;
}

const useTablePageEdit = (props: UseTablePageEditProps) => {
  const { path } = props;

  const onAdd = () => {
    history.push(`${path}/add`);
  };

  const onEdit = async (id: any) => {
    if (!id) return;
    history.push(`${path}/${id}`);
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
  };
};

export default useTablePageEdit;
