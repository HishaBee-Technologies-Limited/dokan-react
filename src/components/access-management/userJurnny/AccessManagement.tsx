'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { PageTitle } from '@/components/common/text';
import AccessManagementDrawer from '@/components/access-management/drawers';
import { LeftSection } from '@/components/access-management/userJurnny/LeftSection';
import { RightSection } from '@/components/access-management/userJurnny/RightSection';

const AccessManagement = () => {
  return (
    <>
      <div className="h-full flex flex-col gap-space16">
        <PageTitle title="Access Management" />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-4.4rem)]">
          <LeftSection />
          <RightSection />
        </Card>
      </div>

      <AccessManagementDrawer />
    </>
  );
};

export default AccessManagement;
