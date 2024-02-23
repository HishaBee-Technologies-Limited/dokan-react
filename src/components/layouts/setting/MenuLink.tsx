import React from 'react'
import Link from 'next/link'
import { settingLinks } from '@/config/settingLinks'
import { ExpandMoreIcon } from '@/components/common/icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MenuLink = () => {
    return (
        <div className="w-full md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger className='flex gap-space12 justify-between items-center text-lg focus:outline-none background w-full py-space12 px-space12 rounded-lg'>
                    Setting Links

                    <ExpandMoreIcon />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center" className='w-[32rem]'>
                    <DropdownMenuLabel className='px-space16'>My Setting</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {settingLinks.map((link) => (
                        <DropdownMenuItem key={link.title} asChild>
                            <Link href={link.link} className='w-full cursor-pointer py-space8 px-space16 !text-md'>{link.title}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuLink