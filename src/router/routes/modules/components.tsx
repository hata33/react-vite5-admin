import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

const Animate = lazy(() => import('@/pages/components/animate'));

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
      meta: { title: 'sys.menu.animate', icon: 'icon-animate', key: '/components/animate' },
    },
  ],
};

export default components;
