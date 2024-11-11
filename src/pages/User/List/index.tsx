import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Image, message } from 'antd';
import { S3ImageUrl } from '@/components/Image';
import { RoleName, User, UserAdminServiceApi, UserAdminServiceFindRequest } from '@/apifox/index';
import { history, useModel } from '@umijs/max';

const TablePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const actionRef = useRef<ActionType>();

  const userService = new UserAdminServiceApi();

  const getUserList = (params?: UserAdminServiceFindRequest) => {
    return userService.userAdminServiceFind(params);
  };

  const userAdminService = new UserAdminServiceApi();

  const setRole = async (id: string, role: RoleName) => {
    await userAdminService.userAdminServiceUpdateRole({
      id,
      body: {
        role,
      },
    });
    message.success('设置成功');
    actionRef.current?.reload();
  };

  const columns: ProColumns<User>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      ellipsis: true,
      search: false,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      ellipsis: true,
      search: false,
      render: (text, record, _, action) => [
        <Image
          style={{ width: 100, height: 100 }}
          key={record.avatar}
          src={S3ImageUrl(record.avatar!)}
        />,
      ],
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      ellipsis: true,
      valueType: 'select',
      search: false,
      valueEnum: {
        all: { text: '全部' },
        man: {
          text: '男',
        },
        woman: {
          text: '女',
        },
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'role',
      ellipsis: true,
      search: false,
      render: (dom, record) => {
        return record.role === 'admin'
          ? '管理员'
          : // : record.role === "manager"
            // ? "系统管理员"
            '成员';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '180px',
      fixed: 'right',
      render: (dom, record) => {
        const view = (
          <Button
            key="view"
            size="small"
            type="default"
            onClick={() => history.push(`/user/detail/${record.id}`)}
          >
            查看
          </Button>
        );
        const setuser =
          record.role === 'normal_user' ? (
            <Button key="view" size="small" onClick={() => setRole(record.id, 'admin')}>
              设为管理员
            </Button>
          ) : (
            <Button key="view" size="small" onClick={() => setRole(record.id, 'normal_user')}>
              设为成员
            </Button>
          );
        const opts = [view];
        if (initialState?.currentUser!.role === 'admin') {
          opts.push(setuser);
        }
        return opts;
      },
    },
  ];
  return (
    <ProTable<User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        console.log(params, 222);
        const data = {
          name: params.email,
          pageLimit: params.pageSize!,
          pageOffset: params.current!,
        };
        const res = await getUserList(data);
        return {
          data: res.users || [],
          success: true,
          total: res.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{ pageSize: 10 }}
      headerTitle="用户列表"
    />
  );
};

export default TablePage;
