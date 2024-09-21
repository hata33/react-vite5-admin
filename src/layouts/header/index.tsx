import { Drawer } from 'antd';
import { useState } from 'react';

import { AppLocalePicker } from '@/components/app';
import { SvgIcon } from '@/components/icon';

import Sidebar from '../sidebar';
import UserSetting from './UserSetting';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 w-full">
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
            <div className="animate-spin-slow">
              <button className="item-center flex h-10 w-10 transform-none cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover">
                <SvgIcon icon="ic-setting" size={24} />
              </button>
            </div>
            <UserSetting />
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
        width="auto"
      >
        <Sidebar closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
export default Header;