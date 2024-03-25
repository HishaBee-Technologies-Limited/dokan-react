import React from 'react';
import SellDrawers from '@/components/sell/drawers';
import SellHeader from '@/components/sell/SellHeader';
import { LeftSection } from '@/components/sell/LeftSection';
import { RightSection } from '@/components/sell/RightSection';
import SellDialogs from '@/components/sell/dialogs';

const SellPage = () => {
  return (
    <>
      <div className="space-y-space16 h-full">
        <SellHeader />

        <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-6.4rem)]">
          <LeftSection />
          <RightSection />
        </div>
      </div>

      <SellDrawers />
      <SellDialogs />
    </>
  );
};

export default SellPage;
