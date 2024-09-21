import { Outlet } from 'react-router-dom';

import Header from './header';
import SiderBar from './sidebar';

function BasicLayout() {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <div className="hidden lg:block">
          <SiderBar />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default BasicLayout;
