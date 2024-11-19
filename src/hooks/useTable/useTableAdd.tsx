import { useState, Fragment as ReactFragment } from 'react';
import { Button } from 'antd';
import type { ModalFormProps } from '@ant-design/pro-components';

interface UseTableAddProps {
  isModal?: boolean;
  Modal?: (props: ModalFormProps) => React.ReactNode;
  key?: string;
}

const useTableAAdd = (props: UseTableAddProps) => {
  const { Modal = () => null, isModal = true, key = 'add' } = props;
  const [visible, setVisible] = useState(false);

  const onAdd = () => {
    if (isModal) {
      setVisible(true);
    }
  };

  const button = (
    <ReactFragment key={key}>
      <Button type="primary" onClick={onAdd}>
        添加
      </Button>
      {isModal && (
        <Modal
          open={visible}
          modalProps={{
            onCancel: () => {
              setVisible(false);
            },
          }}
          onFinish={async () => {
            await new Promise((resolve) => {
              setTimeout(resolve, 2000);
            });
            console.log(111);
          }}
        />
      )}
    </ReactFragment>
  );

  return {
    button,
  };
};

export default useTableAAdd;
