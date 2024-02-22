'use client'
import React from 'react'
import Card from '@/components/common/Card'
import DueHeader from '@/components/due/DueHeader'
import ContactDrawers from '@/components/contact/drawers'
import { LeftSection } from '@/components/contact/LeftSection'
import { RightSection } from '@/components/contact/RightSection'

const DuePage = () => {

    return (
        <>
            <div className='space-y-space16 h-full'>
                <DueHeader />

                <Card className='space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]'>
                    <LeftSection />
                    <RightSection />
                </Card>
            </div>

            <ContactDrawers />
        </>
    )
}

export default DuePage