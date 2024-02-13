'use client'
import React, { useState } from 'react'
import Header from '@/components/layouts/dashboard/Header'
import AsideBar from '@/components/layouts/dashboard/AsideBar'

export interface IMenuOpenProps {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(true)

    return (
        <section className='flex'>
            <AsideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className={`hidden xl:block ${menuOpen ? 'w-[34.4rem] left-0' : 'left-0 w-[8rem]'} duration-500`}></div>

            <main className={`h-screen ${menuOpen ? 'w-full xl:w-[calc(100%-34.4rem)]' : 'w-full xl:w-[calc(100%-8rem)]'} duration-500 `}>
                <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

                <div className='h-[calc(100vh-7.2rem)] lg:h-[calc(100vh-10rem)] overflow-y-scroll'>
                    <div className="h-full p-space10 bg-primary-10 dark:bg-primary-80 text-justify">
                        {children}
                    </div>
                </div>
            </main>
        </section>)
}

export default Dashboard