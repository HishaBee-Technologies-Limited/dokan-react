'use client'
import React from 'react'
import Card from '@/components/common/Card'
import { Button } from '@/components/ui/button'
import { AddIcon } from '@/components/common/icons'
import { PageTitle } from '@/components/common/text'
import ContactDrawers from '@/components/contact/drawers'
import { useContactStore } from '@/stores/useContactStore'
import { LeftSection } from '@/components/contact/LeftSection'
import { RightSection } from '@/components/contact/RightSection'

const ContactPage = () => {
    const handleDrawerOpen = useContactStore((state) => state.setContactDrawerState)


    return (
        <>
            <div className='space-y-space16 h-full'>
                <div className="flex flex-wrap gap-space16 justify-between items-center">
                    <PageTitle title="Contact List" />

                    <Button
                        onClick={() => handleDrawerOpen({ open: true, header: `Add new member` })}
                    >
                        <AddIcon />
                        <span>Add new member</span>
                    </Button>
                </div>

                <Card className='space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]'>
                    <LeftSection />
                    <RightSection />
                </Card>
            </div>

            <ContactDrawers />
        </>
    )
}

export default ContactPage