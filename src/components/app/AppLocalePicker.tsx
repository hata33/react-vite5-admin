import { Button, Dropdown } from 'antd';
import { useState } from 'react';
import i18n from '@/locales/i18n';

import { SvgIcon } from '../icon';

import type { MenuProps } from 'antd';

type Locale = 'zh' | 'en';
function AppLocalePicker() {
  const [locale, setLocale] = useState<Locale>(() => {
    return i18n.resolvedLanguage as Locale;
  });
  const localeList: MenuProps['items'] = [
    {
      key: 'zh',
      label: 'Chinese',
      icon: <SvgIcon icon="ic-locale_zh_CN" className="mr-2" size="20" />,
    },
    {
      key: 'en',
      label: 'English',
      icon: <SvgIcon icon="ic-locale_en_US" className="mr-2" size="20" />,
    },
  ];
  const handleLocaleChange: MenuProps['onClick'] = ({ key }) => {
    setLocale(key as Locale);
    // 切换语言
    i18n.changeLanguage(key);
  };
  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      key={locale}
      menu={{ items: localeList, onClick: handleLocaleChange }}
    >
      <Button type="text" className="flex cursor-pointer items-center justify-center">
        <SvgIcon icon={`ic-locale_${locale == 'zh' ? 'zh_CN' : 'en_US'}`} size="20" />
      </Button>
    </Dropdown>
  );
}

export default AppLocalePicker;
