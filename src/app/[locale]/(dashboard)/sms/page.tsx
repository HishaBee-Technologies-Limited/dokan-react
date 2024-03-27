import React from 'react';
import { PageTitle } from '@/components/common/text';
import { LeftSection } from '@/components/sms/LeftSection';
import { RightSection } from '@/components/sms/RightSection';

const SMSMarketingPage = () => {
  return (
    <div className="space-y-space16 h-full">
      <PageTitle title="Sms Marketing" />

      <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-4.4rem)]">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default SMSMarketingPage;
