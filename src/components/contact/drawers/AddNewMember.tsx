import React from 'react'
import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import AddEmployee from '@/components/contact/drawers/AddEmployee'
import AddCustomer from '@/components/contact/drawers/AddCustomer'
import AddSupplier from '@/components/contact/drawers/AddSupplier'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AddNewMember = () => {
    const closeDrawer = useContactStore((state) => state.setContactDrawerState)

    return (
        <div className='h-full'>
            <Tabs defaultValue="Customer">
                <TabsList className='grid grid-cols-3 mb-space16'>
                    <TabsTrigger value="Customer">Customer</TabsTrigger>
                    <TabsTrigger value="Supplier">Supplier</TabsTrigger>
                    <TabsTrigger value="Employee">Employee</TabsTrigger>
                </TabsList>

                <TabsContent value="Customer"><AddCustomer /></TabsContent>
                <TabsContent value="Supplier"><AddSupplier /></TabsContent>
                <TabsContent value="Employee"><AddEmployee /></TabsContent>
            </Tabs>


            <DrawerFooter>
                <Button onClick={() => closeDrawer({ open: false })} className='w-full'>Save</Button>
            </DrawerFooter>
        </div>
    )
}

export default AddNewMember