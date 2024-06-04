'use client';
import React from 'react';
import { CopyRight } from '@/components/layouts/auth/CopyRight';
import BrandingLogo from '@/components/layouts/auth/BrandingLogo';
import TranslateToggle from '@/components/layouts/auth/TranslationToggle';
import { logout } from '@/actions/logout';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <section className="h-full w-full flex flex-col gap-space24 justify-between  p-space16 sm:p-space32 overflow-y-scroll">
        <div className="flex items-center gap-2 justify-end w-full">
          <TranslateToggle />
          <div
            onClick={() => logout()}
            className="p-2 px-4 bg-black text-white rounded-sm cursor-pointer"
          >
            Logout
          </div>
        </div>

        <div className="max-w-[78rem] w-full mx-auto space-y-space16">
          <BrandingLogo />
          {children}
        </div>

        <CopyRight />
      </section>
    </div>
  );
};

export default ShopLayout;
