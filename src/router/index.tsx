import {  createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import Blog from '@/pages/Blog';
import Dashboard from '@/pages/Dashboard';
import Page404 from '@/pages/Page404';
import Login from '@/pages/sys/login/Login';
import User from '@/pages/User';

import AuthenticatedRoute from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'
export default function Router() {
  const routesForPublic: RouteObject[] = [];
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element:<AuthenticatedRoute />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'user', element: <User /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
  const routesForNotAuthenticateOnly: RouteObject[] = [
    {
      path: '/',
      element: <UnauthenticatedRoute />,
      children: [{ path: 'login', element: <Login />, index: true }],
    }
  ];
  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticateOnly,
    ...routesForAuthenticatedOnly
  ])
  return <RouterProvider router={router} />;
}
