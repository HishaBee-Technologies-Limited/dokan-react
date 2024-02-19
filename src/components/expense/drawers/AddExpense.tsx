import { z } from "zod"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { DrawerFooter } from '@/components/common/Drawer'
import { useExpenseStore } from '@/stores/useExpenseStore'
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import DatePicker from "@/components/common/DatePicker"
import { Select } from "@/components/common/forms/Select"


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


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    number: z.string().max(11).min(11, {
        message: "Number must be 11 characters.",
    }),
    address: z.string(),
    email: z.string(),
})

const AddExpense = () => {
    const [value, setValue] = useState<string>("")
    const setExpenseDrawer = useExpenseStore((state) => state.setExpenseDrawerState)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            number: '',
            address: '',
            email: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // closeDrawer({ open: false })
        console.log("data------------", data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
                <div className="flex justify-between gap-space12">
                    <DatePicker onChange={() => { }} />
                </div>

                <Select
                    searchable
                    data={frameworks}
                    className="w-full"
                    placeholder={'Category *'}
                    onChange={(value) => setValue(value)}
                />


                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer Name <span className="text-error-100">*</span> </FormLabel>
                            <FormControl>
                                <Input placeholder="Customer Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number <span className="text-error-100">*</span> </FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DrawerFooter>
                    <Button type="submit" className='w-full'>Save</Button>
                </DrawerFooter>
                <DrawerFooter>
                    <Button variant={'secondary'} onClick={() => setExpenseDrawer({ open: false })} className="w-full">Cancel</Button>
                    <Button type="submit" className="w-full">Add</Button>
                </DrawerFooter>
            </form>
        </Form>
    )
}

export default AddExpense