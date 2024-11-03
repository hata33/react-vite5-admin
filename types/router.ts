import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  key: string;
  title: string;
  icon?: string;
  path?: string;
  // show in tab
  hideTab?: boolean;
  // show in menu
  hideMenu?: boolean;
  // need to auth,
  auth?: boolean;
}
export type AppRouteObject = {
  index?: boolean;
  path?: RouteObject['path'];
  element?: RouteObject['element'];
  children?: AppRouteObject[];
  meta?: RouteMeta;
  order?: number;
};
