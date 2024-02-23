'use client'
import React from 'react'
import { PageTitle } from '@/components/common/text'
import MenuLink from '@/components/layouts/setting/MenuLink'
import SideNavBar from '@/components/layouts/setting/SideNavBar'

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full flex flex-col gap-space16'>
            <PageTitle title='Settings' />

            <MenuLink />

            <div className="h-full w-full flex">
                <SideNavBar />

                <div className="h-full w-full md:w-9/12 pl-space24">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SettingLayout