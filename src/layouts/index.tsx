import { Outlet } from 'react-router-dom';

import Content from './content';
import Header from './header';
import SiderBar from './sidebar';

function BasicLayout() {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <div className="hidden border-r-[1px] border-dashed border-r-[#919eab33] lg:block">
          <SiderBar />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  );
}
export default BasicLayout;