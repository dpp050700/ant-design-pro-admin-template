export const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    hideInForm: true,
    valueEnum: () => {
      return {
        admin: '管理员',
        user: '用户',
      };
    },
    sorter: true,
    valueType: 'text',
    render: (_: any, record: any) => {
      return <div>{record.username}</div>;
    },
  },
];
