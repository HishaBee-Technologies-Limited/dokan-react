'use client'
import React from 'react'
import BannerPart from '@/components/layouts/auth/BannerPart'
import { CopyRight } from '@/components/layouts/auth/CopyRight'
import BrandingLogo from '@/components/layouts/auth/BrandingLogo'
import TranslateToggle from '@/components/layouts/auth/TranslationToggle'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen'>
            <BannerPart />

            <section className="h-full w-full lg:w-1/2 flex flex-col gap-space24 justify-between p-space16 sm:p-space32 overflow-y-scroll">
                <div className="flex justify-end w-full">
                    <TranslateToggle />
                </div>

                <div className="max-w-[42rem] w-full mx-auto space-y-space16">
                    <BrandingLogo />
                    {children}
                </div>

                <CopyRight />
            </section>
        </div>
    )
}

export default AuthLayout