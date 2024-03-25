'use client';
import React, { useState } from 'react';
import Header from '@/components/layouts/dashboard/Header';
import AsideBar from '@/components/layouts/dashboard/AsideBar';
import { SessionProvider } from 'next-auth/react';

// import { useSession } from "next-auth/react";

export interface IMenuOpenProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session?: any;
}

const Dashboard = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  return (
    <section className="flex pb-space16 lg:pb-0 bg-primary-5 dark:bg-[#171717] relative overflow-hidden">
      <AsideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div
        className={`hidden xl:block hd:hidden ${
          menuOpen ? 'w-[34.4rem] left-0' : 'left-0 w-[8rem]'
        } duration-500`}
      ></div>

      <main
        className={`h-screen ${
          menuOpen
            ? 'w-full xl:w-[calc(100%-34.4rem)]'
            : 'w-full xl:w-[calc(100%-8rem)]'
        } duration-500`}
      >
        <Header
          session={session}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />

        <div className="h-[calc(100vh-7.2rem)] lg:h-[calc(100vh-10rem)] overflow-y-scroll">
          <div className="h-full px-space8 sm:px-space24 pt-space16 text-justify ">
            {children}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
