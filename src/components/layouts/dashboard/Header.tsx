import React from 'react'
import { Icon } from '@iconify/react'
import { ModeToggle } from '@/themes'
import { Button } from '@/components/ui/button'
import FallBackImage from '@/components/common/FallBackImage'
import BreadCum from '@/components/layouts/dashboard/BreadCum'
import { IMenuOpenProps } from '@/components/layouts/Dashboard'
import AppSearch from '@/components/layouts/dashboard/AppSearch'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const Header = ({ setMenuOpen, menuOpen }: IMenuOpenProps) => {
    return (
        <header className='sticky top-0 bg-white dark:bg-primary-90 shadow-sm'>
            <nav className="h-[7.2rem] flex justify-between items-center gap-2 border-b border-primary-10 dark:border-primary-80 py-space12 px-space16">
                <div className="w-6/12 flex gap-space12 items-center">
                    <Button
                        onClick={() => setMenuOpen(prv => !prv)}
                        className='p-0 bg-transparent hover:bg-transparent text-primary-70 dark:text-primary-60'
                    >
                        <Icon icon="ic:round-menu-open" width="30" height="30" rotate={menuOpen ? 4 : 2} />
                    </Button>
                    <AppSearch />
                </div>

                {/* right side */}
                <div className="w-6/12 h-full flex justify-end items-center gap-space16 ">
                    <ModeToggle />
                    <Button className="text-primary-70 dark:text-primary-60 bg-transparent hover:bg-transparent">
                        <Icon
                            icon="material-symbols:help-outline"
                            width="24"
                            height="24"
                        />
                    </Button>

                    <Button className="text-primary-70 dark:text-primary-60 bg-transparent hover:bg-transparent">
                        <div
                            className={`relative after:absolute  after:h-[1.2rem] after:w-[1.2rem] after:rounded-full after:right-0 after:top-1/4 after:transform after:-translate-y-1/2 after:bg-red-400`}
                        >
                            <Icon icon="mi:notification" width="24" height="24" />
                        </div>
                    </Button>


                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex gap-space8 items-center text-md focus:outline-none'>
                            <FallBackImage src='' fallback='MM' className='h-[3.8rem] w-[3.8rem] text-sm' />
                            <span className='hidden lg:block text-primary-90 dark:text-primary-40'>MD Maruf Hossain</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-[20rem] bg-white dark:bg-primary-80 dark:border-none'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            <BreadCum />
        </header>
    )
}

export default Header