import React from 'react'
import Card from '@/components/common/Card'
import { Button } from '@/components/ui/button'
import { AddIcon } from '@/components/common/icons'
import { PageTitle } from '@/components/common/text'
import { LeftSection } from '@/components/contact/LeftSection'
import { RightSection } from '@/components/contact/RightSection'

const ContactPage = () => {

    return (
        <div className='space-y-space16 h-full'>
            <div className="flex flex-wrap gap-space16 justify-between items-center">
                <PageTitle title="Contact List" />

                <Button>
                    <AddIcon />
                    <span>Add new member</span>
                </Button>

            </div>

            <Card className='space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]'>
                <LeftSection />
                <RightSection />
            </Card>
        </div>
    )
}

export default ContactPage