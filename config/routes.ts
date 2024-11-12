/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '',
        component: './user/Login',
      },
    ],
  },

  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './dashbord',
  },
  {
    path: '/user',
    name: '用户中心',
    icon: 'crown',
    routes: [
      {
        name: '用户列表',
        path: '/user/list',
        component: './user/List',
      },
      {
        name: '用户详情',
        path: '/user/detail/:id',
        component: './user/detail',
        hideInMenu: true,
      },
    ],
  },

  {
    path: '/room',
    name: '房源管理',
    icon: 'smile',
    routes: [
      {
        path: '/room/list',
        name: '房源列表',
        component: './room/list',
      },
      {
        path: '/room/detail/:id',
        title: '房源详情',
        component: './room/detail',
        hiddenMenu: true,
      },
      {
        path: '/room/crawl',
        name: '爬虫房源',
        component: './room/crawl',
      },
      {
        path: '/room/infra',
        name: '房源设施',
        component: './roomInfra/list',
      },
    ],
  },
  {
    path: '/attraction',
    name: '目的地管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/attraction/list',
        name: '目的地列表',
        component: './attraction/attraction.list',
      },
    ],
  },
  {
    path: '/special_service',
    name: '特色服务管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/special_service/catalog/list',
        name: '服务类型列表',
        component: './specialServiceCatalog/list',
      },
      {
        path: '/special_service/list/:id',
        name: '服务列表',
        component: './special_service/list',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'smile',
    routes: [
      {
        path: '/order/room/list',
        name: '房源订单',
        component: './roomOrder/list',
      },
    ],
  },

  {
    path: 'channel',
    name: '频道管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/channel/list',
        name: '社区分享列表',
        component: './channel/list',
      },
      {
        path: '/channel/detail/:id',
        name: '文章详情',
        component: './channel/detail',
        hideInMenu: true,
      },
    ],
  },

  {
    path: 'guide',
    name: '攻略管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/guide/list',
        name: '攻略列表',
        component: './guide/list',
      },
      {
        path: '/guide/detail/:id',
        name: '文章详情',
        component: './guide/detail',
        hideInMenu: true,
      },
    ],
  },

  {
    path: 'tag',
    name: '标签管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/tag/list',
        name: '标签列表',
        component: './tag/list',
      },
    ],
  },

  {
    path: 'notice',
    name: '公告管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/notice/list',
        name: '公告列表',
        component: './notice/detail',
      },
    ],
  },

  {
    path: 'banner',
    name: 'Banner管理',
    icon: 'TableOutlined',
    component: './banner',
  },

  {
    path: 'pointsMarket',
    name: '积分商城',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/pointsMarket/goodsList',
        name: '商品列表',
        component: './pointsMarket/goodsList',
      },
      {
        path: '/pointsMarket/goodsDetail/:id',
        name: '商品详情',
        component: './pointsMarket/goodsDetail',
        hideInMenu: true,
      },
      {
        path: '/pointsMarket/exchangeList',
        name: '兑换列表',
        component: './pointsMarket/exchangeList',
      },
    ],
  },

  {
    path: 'raffles',
    name: '轮盘活动',
    icon: 'TableOutlined',
    // element: <PointsMarket />,
    routes: [
      {
        path: '/raffles/goodsList',
        name: '奖项设置',
        component: './raffles/goodsList',
      },
      {
        path: '/raffles/goodsDetail/:id',
        name: '奖项详情',
        component: './raffles/goodsDetail',
        hideInMenu: true,
      },
      {
        path: '/raffles/exchangeList',
        name: '兑换列表',
        component: './raffles/exchangeList',
      },
    ],
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];
