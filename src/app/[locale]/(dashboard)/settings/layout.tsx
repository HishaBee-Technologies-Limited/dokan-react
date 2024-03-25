import React from 'react';
import { settingLinks } from '@/config/settingLinks';
import CommonLayout from '@/components/layouts/common';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonLayout menuLinks={settingLinks} pageTitle="Settings">
      {children}
    </CommonLayout>
  );
};

export default SettingsLayout;
