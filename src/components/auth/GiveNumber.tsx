
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

const formSchema = z.object({
    number: z.string().max(11).min(11, {
        message: "Number must be 11 characters.",
    }),
})

const GiveNumber = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        // closeDrawer({ open: false })
        console.log("data------------", data)
    }
    return (
        <div>
            <Text title='Create your Hishabee account' className='text-[2.8rem] font-semibold mb-space32' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space16">

                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Input Mobile number</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full' disabled={form.watch('number').length !== 11}>Save</Button>
                </form>
            </Form>

            <Text className='mt-space24 text-xs flex gap-space6'>
                By registering, you accept our
                <span className="underline">Terms of use</span> and
                <span className="underline">Privacy Policy</span>
            </Text>
        </div>
    )
}

export default GiveNumber