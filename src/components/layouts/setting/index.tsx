'use client'
import React from 'react'
import { PageTitle } from '@/components/common/text'
import MenuLink from '@/components/layouts/setting/MenuLink'
import SideNavBar from '@/components/layouts/setting/SideNavBar'

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full space-y-space16'>
            <PageTitle title='Settings' />

            <MenuLink />

            <div className="h-full md:h-[calc(100%-4.4rem)] w-full flex  ">
                <SideNavBar />

                <div className="h-full w-full md:w-9/12 md:pl-space24 flex justify-center md:block md:overflow-y-scroll ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SettingLayout