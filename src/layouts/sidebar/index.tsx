import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType } from 'antd/es/menu/interface';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useMatches, useNavigate } from 'react-router-dom';

import Logo from '@/assets/icons/ic-logo.svg';
import { SvgIcon } from '@/components/icon';
import { getMenuRoutes } from '@/router/menus';

import { AppRouteObject } from '#/router';

type SidebarProps = {
  closeSideBarDrawer?: () => void;
};
function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { t } = useTranslation();

  // router -> menu
  const routeToMenu = useCallback(
    (items: AppRouteObject[]) => {
      return items.map((item) => {
        const menuItem: any = {};
        const { meta, children } = item;
        if (meta) {
          menuItem.key = meta.key;
          menuItem.label = t(meta?.title);

          if (meta.icon) {
            menuItem.icon = <SvgIcon icon={meta.icon} className="ant-menu-item-icon" size="20" />;
          }
          if (children) {
            menuItem.children = routeToMenu(children);
          }
          return menuItem;
        }
      });
    },
    [t],
  );

  const [openKeys, setOpenKeys] = useState(['dashboard']);
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<ItemType[]>([]);

  useEffect(() => {
    const openKeys = matches
      .filter((match) => match.pathname !== '/')
      .map((match) => match.pathname);
    setOpenKeys(openKeys);
    setSelectedKeys([pathname]);
  }, [pathname, matches, collapsed]);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const menus = routeToMenu(menuRoutes);
    setMenuList(menus);
  }, [routeToMenu]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
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
      className="relative h-screen duration-300 ease-linear"
    >
      <NavLink to="/">
        <img src={Logo} alt="" className="mb-2 ml-8 mt-6 h-10 w-10" />
      </NavLink>
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
