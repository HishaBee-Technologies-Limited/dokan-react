'use client'

import React from 'react'
import { ContactEnum } from '@/enum/contact'
import { Drawer } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import AddCustomer from '@/components/contact/drawers/AddCustomer'
import AddSupplier from '@/components/contact/drawers/AddSupplier'
import AddEmployee from '@/components/contact/drawers/AddEmployee'
import AddNewMember from '@/components/contact/drawers/AddNewMember'

const ContactDrawers = () => {
    const drawerState = useContactStore((state) => state.contactDrawerState)
    const handleClose = useContactStore((state) => state.setContactDrawerState)

    const renderedDrawers = (activeDrawer: string | undefined) => {
        if (ContactEnum.ADD_NEW_MEMBER === activeDrawer) {
            return <AddNewMember />
        } else if (ContactEnum.ADD_CUSTOMER === activeDrawer || ContactEnum.EDIT_CUSTOMER === activeDrawer) {
            return <AddCustomer />
        } else if (ContactEnum.ADD_SUPPLIER === activeDrawer || ContactEnum.EDIT_SUPPLIER === activeDrawer) {
            return <AddSupplier />
        } else if (ContactEnum.ADD_EMPLOYEE === activeDrawer || ContactEnum.EDIT_EMPLOYEE === activeDrawer) {
            return <AddEmployee />
        }
    }

    return (
        <Drawer
            open={drawerState.open}
            header={drawerState.header}
            onClose={(open) => handleClose({ open })}
        >
            {renderedDrawers(drawerState.header)}
        </Drawer>
    )
}

export default ContactDrawers