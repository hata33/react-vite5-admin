# React + TypeScript + Vite

该项目是使用 `React 18.3` 和 `Vite 5` 构建的一个管理员模板，主要目的是用于学习和练习。

页面的主要结构由 `Layout` 组件组成，该组件整合了 `Header` 和 `SideBar`，形成了整体布局。在父路由组件中，通过 `<Outlet />` 来渲染子路由对应的子页面内容。

在用户退出登录时，需要清空存储在 `localStorage` 中的用户信息和 `token`。

## 动态路由实现说明
主要利用React、React Router和Vite的特性实现了灵活的动态路由配置。以下是主要技术点和实现方法：

### 实现步骤
1. 自动导入路由模块
使用Vite的`import.meta.glob` 功能自动导入路由模块：
```js
const modules = import.meta.glob('./modules/**/*.tsx', { eager: true });
```

2. 路由收集
遍历导入的模块，将它们添加到路由集合中：
```js
Object.keys(modules).forEach((key) => {
  const mod = (modules as any)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
```

3. 路由配置
使用收集到的路由创建主路由配置：
```js
export const RootRoute: AppRouteObject = {
  path: '/',
  element: <AuthRouter />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    ...routeModuleList
  ],
};
```

4. 懒加载
使用 `React` 的 `lazy` 函数实现路由组件的懒加载：
```js
const Page404 = lazy(() => import('@/pages/Page404'));
const Login = lazy(() => import('@/pages/sys/login/Login'));
```

5. 权限路由
使用`AuthRouter` 组件包装主路由，实现权限控制。
核心逻辑：检查用户是否已登录，根据登录状态决定渲染内容或重定向，实现基本的权限控制。
```js
const token = useUserToken();

if (!token?.accessToken) {
  return <Navigate to="/login" replace />;
}

return <BasicLayout />;
```
