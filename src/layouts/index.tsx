import { Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useSettings } from '@/store/settingStore';

import ProContent from './content';
import ProHeader from './header';
import ProSider from './sidebar';
import TopMenu from './sidebar/TopMenu';

import { ThemeLayout } from '#/enum';
import ProgressBar from '@/components/app/progress-bar';
function BasicLayout() {
  const {
    token: { colorBgElevated, colorTextBase },
  } = theme.useToken();

  const { themeLayout } = useSettings();

  return (
    <>
      <ProgressBar />
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
