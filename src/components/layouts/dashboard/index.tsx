'use client'

import Header from './Header'
import AsideBar from './AsideBar'
import React, { useState } from 'react'

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

            <main className={`bg-gray-50 min-h-screen ${menuOpen ? 'w-full xl:w-[calc(100%-34.4rem)]' : 'w-full xl:w-[calc(100%-8rem)]'} duration-500 `}>
                <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

                <div className='min-h-[calc(100vh-7.2rem)] lg:min-h-[calc(100vh-10rem)] bg-blue-300'>
                    {children}
                </div>
            </main>
        </section>)
}

export default Dashboard