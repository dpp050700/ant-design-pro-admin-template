## 自定义浏览器页面的 title

```
<Helmet>
  <title>
    登录页
    - {Settings.title}
  </title>
</Helmet>
```

## 菜单超链接

app.tsx 中通过 links 可以配置超链接

```
{
  links: [ <Link key="baidu" to="www.baidu.com" target="_blank">
            <LinkOutlined />
            <span>百度</span>
          </Link>
        ]
}
```

## 如何自定义 403 页面

app.tsx 中通过 unAccessible 可以自定义 403 页面

```
{
  unAccessible: <div>unAccessible</div>,
}
```

## 开启可视化配置主题

```
<!-- app.tsx 中 childrenRender 中添加以下代码 -->
{isDev && (
  <SettingDrawer
    disableUrlParams
    enableDarkTheme
    settings={initialState?.settings}
    onSettingChange={(settings) => {
      setInitialState((preInitialState) => ({
        ...preInitialState,
        settings,
      }));
    }}
  />
)}
```

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### 关于浏览器标题

ProLayout 默认会根据菜单和路径来自动匹配浏览器的标题，可以设置 pageTitleRender=false 关掉。

### 关于菜单的标题

菜单标题是根据 route 中的 name 字段来配置的，若 locals/local/menu.ts 中有 name 的多语言配置，则显示配置的内容，否则显示 name 字段。

```
[
  {
    path: '/welcome',
    name: 'welcome', <!-- 查找 menu.welcome -->
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',  <!-- 查找 menu.admin -->
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page', <!-- 查找 menu.admin.sub-page -->
        component: './Admin',
      },
    ],
  },
]
```
