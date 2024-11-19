import { Fragment as ReactFragment } from 'react';
import { Button, Modal } from 'antd';
import type { ButtonProps } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
interface UseTableAddProps {
  deleteRequest: (id: any) => Promise<any>;
  tableRef: React.RefObject<ActionType>;
}

const useTableDelete = (props: UseTableAddProps) => {
  const { deleteRequest, tableRef } = props;
  const onDelete = (id: any, confirmMessage: string) => {
    if (!id) return;
    Modal.confirm({
      title: confirmMessage,
      onOk: async () => {
        await deleteRequest(id);
        tableRef.current?.reload();
      },
    });
  };

  const deleteButton = (props: { id: any; confirmMessage?: string } & ButtonProps) => {
    const { id, confirmMessage = '确定删除吗？', ...rest } = props;
    return (
      <ReactFragment>
        <Button danger {...rest} onClick={() => onDelete(id, confirmMessage)}>
          删除
        </Button>
      </ReactFragment>
    );
  };

  return {
    deleteButton,
  };
};

export default useTableDelete;
