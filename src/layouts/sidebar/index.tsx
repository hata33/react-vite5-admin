import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/interface';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/ic-logo.svg';
import { SvgIcon } from '@/components/icon';
import { getMenuRoutes } from '@/router/menus';

import { AppRouteObject } from '#/router';

type SidebarProps = {
  closeSideBarDrawer?: () => void;
};
function Sidebar(props: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // submenu keys of first level
  const rootSubmenuKeys = ['management'];

  // router -> menu
  const routeToMenu = useCallback(
    (items: AppRouteObject[], parentPath = '') => {
      console.log('routeToMenu');
      return items.map((item) => {
        const menuItem: any = {
          key: parentPath + (item.path!.startsWith('/') ? item.path : `/${item.path}`),
        };
        if (item.meta?.title) {
          menuItem.label = t(item.meta?.title);
        }
        if (item.meta?.icon) {
          menuItem.icon = <SvgIcon icon={item.meta?.icon} size="24" className="mr-6" />;
        }
        if (item.children) {
          menuItem.children = routeToMenu(item.children, item.path);
        }
        return menuItem;
      });
    },
    [t],
  );

  const [openKeys, setOpenKeys] = useState(['dashboard']);
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, openKeys]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const menus = routeToMenu(menuRoutes);
    setMenuList(menus);
  }, [routeToMenu]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={90}
      className="relative h-screen w-64 duration-300 ease-linear"
    >
      <NavLink to="/">
        <img src={Logo} alt="" className="mb-2 ml-8 mt-6 h-10 w-10" />
      </NavLink>
      <div className="p1-2">
        <Menu
          mode="inline"
          items={menuList}
          className="!border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
        />
      </div>
      <button
        onClick={toggleCollapsed}
        className="absolute right-0 top-0 z-10 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full border-[1px] border-dashed border-[#919eab33] bg-white text-center lg:block"
      >
        {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
      </button>
    </Sider>
  );
}
export default Sidebar;
