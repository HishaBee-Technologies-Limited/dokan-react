import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { addCustomer } from '@/actions/contacts/addCustomer'
import { useShopId } from '@/stores/useShopId'
import { contactSchema } from '@/schemas/contacts'
import { filesUpload } from '@/actions/upload'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'


const AddCustomer = () => {
    const { getQueryString } = useCreateQueryString()
    const shopId = useShopId((state) => state.shopId);

    const closeDrawer = useContactStore((state) => state.setContactDrawerState)


    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            number: '',
            address: '',
            email: '',
        },
    })

    function onSubmit(data: z.infer<typeof contactSchema>) {

        const payload = {
            name: data.name,
            mobile: data.number,
            email: data.email as string,
            address: data.address as string,
            shop_id: shopId,
        }

        const addNewCustomer = async () => {
            const response = await addCustomer(payload)
            if (response?.success) {
                closeDrawer({ open: false })

            } else {
                console.log("error", response?.error)
            }
            console.log("response", response)
        }

        addNewCustomer()
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // filesUpload()
        console.log(e.target.files)
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">

                <div className="flex flex-col items-center justify-center gap-space16 py-space8">
                    <label className="space-y-space12 cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e)}
                        />
                        <Image src={`/images/add_user.svg`} alt='' height={100} width={100} />

                        <p className="text-blue-600 font-medium text-center">Add Photo</p>
                    </label>
                </div>

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
            </form>
        </Form>
    )
}

export default AddCustomer