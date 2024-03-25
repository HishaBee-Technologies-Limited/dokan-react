'use client';
import React from 'react';
import { PageTitle } from '@/components/common/text';
import MenuLink from '@/components/layouts/common/MenuLink';
import SideNavBar from '@/components/layouts/common/SideNavBar';

export type CommonLayoutProps = {
  pageTitle: string;
  children: React.ReactNode;
  menuLinks: { link: string; title: string }[];
};

const CommonLayout = ({
  children,
  menuLinks,
  pageTitle,
}: CommonLayoutProps) => {
  return (
    <div className="h-full w-full space-y-space16">
      <PageTitle title={pageTitle} />

      <MenuLink data={menuLinks} title={pageTitle} />

      <div className="h-full md:h-[calc(100%-4.4rem)] w-full flex">
        <SideNavBar data={menuLinks} />

        <div className="h-full w-full md:w-9/12 md:pl-space24 flex justify-center md:block md:overflow-y-scroll ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
