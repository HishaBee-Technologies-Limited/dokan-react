'use client'
import Card from '@/components/common/Card'
import { Select } from '@/components/common/forms/Select'
import { PageSubTitle, PageTitle, Text } from '@/components/common/text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },

]

const HomePage = () => {
    const [value, setValue] = useState<string>("")
    return (
        <div className=''>
            <div className="flex gap-space24">
                <PageTitle title='Page Title' />
                <PageSubTitle title='Page Sub Title' />
                <Text title='primary' type='primary' />
                <Text title='secondary' type='secondary' />
                <Text title='muted' type='muted' />
                <Text title='error' type='error' />
                <Text title='success' type='success' />
                <Text title='warning' type='warning' />
            </div>
            <br />
            <div className="flex gap-space24">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="transparent">Transparent</Button>
                <Button variant="danger">Danger</Button>
            </div>
            <br />
            <Input type="text" placeholder="Example input .." />
            <br />
            <Select data={frameworks} onChange={(value) => setValue(value)} />
            <br />
            <br />
            <Card>Card</Card>

        </div>
    )
}

export default HomePage