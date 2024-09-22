import { Drawer } from 'antd';
import { CSSProperties, useState } from 'react';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { AppLocalePicker } from '@/components/app';
import { SvgIcon } from '@/components/icon';

import Sidebar from '../sidebar';
import Settings from './Settings';
import UserAvatar from './UserAvatar';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
    transform: 'none',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  };

  return (
    <>
      <header className="sticky top-0 w-full">
        <div className="shadow-2 text-gary flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
          <div className="flex items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="cursor-point flex h-9 w-9 items-center justify-center rounded-full hover:bg-hover lg:hidden"
            >
              <SvgIcon icon="ic-menu" size="24" />
            </button>

            <button className="cursor-point flex h-9 w-9 items-center justify-center rounded-full hover:bg-hover lg:hidden">
              <SvgIcon icon="ic-search" size="24" />
            </button>
            <span className="flex h-6 cursor-pointer items-center justify-center rounded-md bg-hover px-2 py-0 text-xs font-bold">
              ctrl + K
            </span>
          </div>

          <div className="flex">
            <AppLocalePicker />
            <Settings />
            <UserAvatar />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        style={style}
        width="auto"
      >
        <Sidebar closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
export default Header;
