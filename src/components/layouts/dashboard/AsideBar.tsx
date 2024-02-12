import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IMenuOpenProps } from '.'
import { Button } from '@/components/ui/button'
import { CancelIcon } from '@/components/common/icons'
import SidebarLinks from '@/config/sidebarLinks'

const AsideBar = ({ menuOpen, setMenuOpen }: IMenuOpenProps) => {
    return (
        <aside className={`bg-white h-screen fixed ${menuOpen ? 'w-[30rem] xl:w-[34.4rem] left-0' : '-left-[30rem] xl:left-0 w-[30rem] xl:w-[8rem]'} duration-500 z-50`}>
            <div className={`h-[7.2rem] border-b border-info px-space16 flex items-center justify-between sticky top-0`}>
                <Link href="/dashboard">
                    <Image
                        alt="logo"
                        height={32}
                        width={menuOpen ? 135 : 36}
                        src={menuOpen ? '/images/branding/hishabee.svg' : '/images/branding/Bee.svg'}
                    />
                </Link>

                <Button onClick={() => setMenuOpen(prv => !prv)} className='xl:hidden bg-transparent hover:bg-transparent p-0 text-black'>
                    <CancelIcon width={24} height={24} />
                </Button>
            </div>


            <nav className={`h-[calc(100vh-7.2rem)] overflow-y-scroll scroll_hidden px-space12 pt-space24 `}>
                <ul>
                    {SidebarLinks.map((menu) => {

                        return (

                            <li key={menu.id} className={`flex gap-space10 items-center p-space8 w-full hover:bg-gray-200 duration-300 rounded relative after:absolute after:w-[.4rem] hover:after:h-full after:duration-300 after:rounded-[1rem] after:-left-3 after:top-1/2 after:transform after:-translate-y-1/2  hover:after:visible after:bg-black
                    after:h-0 after:bg-primary-500 after:visible
                    `}>
                                <div className="h-[3.4rem] w-[3.6rem] bg-gray-300 relative z-20">im</div>
                                <span className={`block ${menuOpen ? 'xl:text-lg xl:left-[5.4rem] duration-500' : 'xl:-left-[34rem] xl:opacity-0'} xl:absolute z-10`}>{menu.title}</span>
                            </li>
                        )
                    })}
                </ul>

            </nav>
        </aside>
    )
}

export default AsideBar