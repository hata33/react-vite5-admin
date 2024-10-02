import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { asyncRoutes } from './routes';
console.log(asyncRoutes, 'asyncRoutes');

const router: any = createBrowserRouter(asyncRoutes as unknown as RouteObject[]);

export default router;
