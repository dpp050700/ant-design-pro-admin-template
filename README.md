# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).


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