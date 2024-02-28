
'use client'
import { z } from "zod"
import React from 'react'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
    business_name: z.string().max(11).min(11, {
        message: "Number must be 11 characters.",
    }),
    area: z.string(),
    address: z.string(),
    division: z.string(),
    district: z.string(),
})

const Information = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            business_name: '',
            area: '',
            address: '',
            division: '',
            district: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // closeDrawer({ open: false })
        console.log("data------------", data)
    }
    return (
        <div>
            <Text title='Tell us about your business' className='text-[2.8rem] font-semibold mb-space16' />
            <Text title='Tell us about your business' variant='secondary' className='mb-space32 font-semibold' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space16">

                    <FormField
                        control={form.control}
                        name="business_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business name <span className="text-error-100">*</span></FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Business name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-space8 sm:gap-space16">
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="" >
                                                <SelectValue placeholder="Division" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <div className="max-h-[24rem] overflow-y-scroll">
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="" >
                                                <SelectValue placeholder="District" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <div className="max-h-[24rem] overflow-y-scroll">
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address <span className="text-error-100">*</span></FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Area" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full' disabled={!form.watch('business_name').length}>Save</Button>
                </form>
            </Form>
        </div>
    )
}

export default Information