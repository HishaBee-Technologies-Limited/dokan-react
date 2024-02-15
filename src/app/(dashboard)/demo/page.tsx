'use client'
import Card from '@/components/common/Card'
import { Dialog, Footer } from '@/components/common/Dialog'
import { Drawer, DrawerFooter } from '@/components/common/Drawer'
import Tooltip from '@/components/common/Tooltip'
import { RadioGroupForm } from '@/components/common/forms/RadioGroupDemo'
import { Select } from '@/components/common/forms/Select'
import { PageSubTitle, PageTitle, Text } from '@/components/common/text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const DemoPage = () => {
    const [value, setValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <div className=''>
            <div className="flex gap-space24">
                <PageTitle title='Page Title' />
                <PageSubTitle title='Page Sub Title' />
                <Text title='primary' variant='primary' />
                <Text title='secondary' variant='secondary' />
                <Text title='muted' variant='muted' />
                <Text title='error' variant='error' />
                <Text title='success' variant='success' />
                <Text title='warning' variant='warning' />
            </div>
            <br />
            <div className="flex gap-space24">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="transparent">Transparent</Button>
                <Button variant="danger">Danger</Button>

                <Tooltip trigger="Tooltip" triggerClass='ml-space24'>
                    <div>Tooltip Content</div>
                </Tooltip>
            </div>
            <br />
            <Input type="text" placeholder="Example input .." />
            <br />
            <div className="flex gap-space16">
                <Select data={frameworks} onChange={(value) => setValue(value)} searchable />

                <Button variant="outline" onClick={() => setOpenDialog(!openDialog)}> Dialog Open</Button>
                <Dialog header="Modal" open={openDialog} onClose={(open) => setOpenDialog(open)}>
                    <div>

                        Dialog Content

                        <Footer>
                            this is footer
                        </Footer>
                    </div>
                </Dialog>


                <Button variant="outline" onClick={() => setOpen(!open)}> drawer Open</Button>
                <Drawer
                    open={open}
                    header="Demo Drawer"
                    onClose={(open) => setOpen(open)}
                >
                    <div className=' h-full'>
                        <DrawerFooter>
                            <Button>Button</Button>
                        </DrawerFooter>
                    </div>
                </Drawer>
            </div>
            <br />
            <Card>Card</Card>
            <br />
            <div className="inline-flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <label htmlFor="airplane-mode">Switch</label>
            </div>
            <br />
            <Tabs defaultValue="account">
                <TabsList className='grid grid-cols-4'>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
            <br />

            <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <label htmlFor="option-one">RadioGroupItem One</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <label htmlFor="option-two">RadioGroupItem Two</label>
                </div>
            </RadioGroup>
            <RadioGroupForm />

        </div>
    )
}

export default DemoPage