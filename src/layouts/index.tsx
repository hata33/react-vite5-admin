import { Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Progress } from '@/components/app';
import { useSettings } from '@/store/settingStore';

import ProContent from './content';
import ProHeader from './header';
import ProSider from './sidebar';
import TopMenu from './sidebar/TopMenu';

import { ThemeLayout } from '#/enum';
function BasicLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgElevated, colorTextBase },
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
      <Layout className="flex h-screen overflow-hidden">
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div
            className="hidden h-full lg:block"
            style={{
              background: colorBgElevated,
            }}
          >
            <ProSider />
          </div>
        ) : null}
        <div
          className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
          style={{
            color: colorTextBase,
          }}
        >
          <ProHeader />
          {themeLayout === ThemeLayout.Horizontal ? <TopMenu /> : null}
          <ProContent />
        </div>
      </Layout>
    </>
  );
}
export default BasicLayout;
