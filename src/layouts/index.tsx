import { theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Progress } from '@/components/app';
import { useSettings } from '@/store/settingStore';

import ProContent from './content';
import Header from './header';
import SiderBar from './sidebar';
import TopMenu from './sidebar/TopMenu';

import { ThemeLayout } from '#/enum';
function BasicLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  const { themeLayout } = useSettings();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
    return () => setIsLoading(true);
  }, [pathname]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      <Progress isAnimating={isLoading} />
      <div
        className="flex h-screen overflow-hidden"
        style={{ background: colorBgBase, color: colorTextBase }}
      >
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div className="hidden lg:block">
            <div className="hidden lg:block">
              <SiderBar />
            </div>
          </div>
        ) : null}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          {themeLayout === ThemeLayout.Horizontal ? <TopMenu /> : null}
          <ProContent />
        </div>
      </div>
    </>
  );
}
export default BasicLayout;
