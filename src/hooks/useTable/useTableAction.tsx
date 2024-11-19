import { history } from '@umijs/max';
import { Modal } from 'antd';
const useTableAction = () => {
  const onEdit = (id: string) => {
    history.push(`/user/edit/${id}`);
  };

  const onDelete = (id: string) => {
    const confirm = Modal.confirm({
      title: '确定删除吗？',
    });
    if (confirm) {
      console.log('删除', id);
    }
  };

  return {
    onEdit,
    onDelete,
  };
};

export default useTableAction;
