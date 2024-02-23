import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Text } from '@/components/common/text'
import { settingLinks } from '@/config/settingLinks'

const SideNavBar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full w-3/12 hidden md:block border-r border-color pr-space24">
            <ul className='space-y-space4 w-full'>
                {settingLinks.map((link) => (
                    <li key={link.title} className={`w-full rounded-md hover:bg-primary-10 ${pathname === link.link ? 'bg-primary-10' : ''}`}>
                        <Link href={link.link} className={'w-full block px-space16 lg:px-space24 py-space8 '}>
                            <Text title={link.title} className='font-medium' />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideNavBar