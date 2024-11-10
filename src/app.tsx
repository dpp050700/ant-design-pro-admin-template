import { Footer, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React from 'react';
import { User, UserServiceApi } from './apifox';
import { UserOutlined } from '@ant-design/icons';
import { USER_ID } from './constants/localStorage';
const loginPath = '/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: User;
  loading?: boolean;
  fetchUserInfo?: (id: string) => Promise<User | undefined>;
}> {
  const userService = new UserServiceApi();

  const fetchUserInfo = async (id: string) => {
    try {
      const userInfo = await userService.userServiceDetail({ id });
      return userInfo;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const id = localStorage.getItem(USER_ID);
    const currentUser = await fetchUserInfo(id!);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
      icon: <UserOutlined />,
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.nickname || '',
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 如果使用 @umijs/max 的 Request，可以配置错误处理
 */
export const request = {
  ...errorConfig,
};
