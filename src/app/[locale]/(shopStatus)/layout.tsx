import React from 'react';
import ShopLayout from '@/components/layouts/shop';

const ShopStatusLayout = ({ children }: { children: React.ReactNode }) => {
  return <ShopLayout>{children}</ShopLayout>;
};

export default ShopStatusLayout;
