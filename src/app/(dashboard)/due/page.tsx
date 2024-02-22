import React from 'react'
import Card from '@/components/common/Card'
import DueDialogs from '@/components/due/dialogs'
import DueDrawers from '@/components/due/drawers'
import DueHeader from '@/components/due/DueHeader'
import { LeftSection } from '@/components/due/LeftSection'
import { RightSection } from '@/components/due/RightSection'

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

            <DueDialogs />
            <DueDrawers />
        </>
    )
}

export default DuePage