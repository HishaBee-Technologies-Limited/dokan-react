import React from 'react';
import CommonLayout from '@/components/layouts/common';
import { onlineShopLinks } from '@/config/onlineShopLinks';

const OnlineShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonLayout menuLinks={onlineShopLinks} pageTitle="Online Store">
      {children}
    </CommonLayout>
  );
};

export default OnlineShopLayout;
