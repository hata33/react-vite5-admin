import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

const Animate = lazy(() => import('@/pages/components/animate'));
const ThemeSwitch = lazy(() => import('@/pages/components/themeSwitch'));

import { AppRouteObject } from '#/router';

const components: AppRouteObject = {
  order: 3,
  path: '/components',
  element: (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
  meta: { title: 'sys.menu.components', icon: 'ic-blog', key: '/components' },
  children: [
    {
      index: true,
      element: <Navigate to="animate" replace />,
    },
    {
      path: '/components/animate',
      element: <Animate />,
      meta: { title: 'sys.menu.animate', key: '/components/animate' },
    },
    {
      path: '/components/themeSwitch',
      element: <ThemeSwitch />,
      meta: {
        title: '主题切换',
        key: '/components/themeSwitch',
      },
    },
  ],
};

export default components;
