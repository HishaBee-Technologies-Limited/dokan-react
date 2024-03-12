'use client'

import React from 'react'
import { ContactEnum } from '@/enum/contact'
import { Drawer } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import EditParty from '@/components/contact/drawers/EditParty'
import AddNewParty from '@/components/contact/drawers/AddNewParty'
import AddNewMember from '@/components/contact/drawers/AddNewMember'

const ContactDrawers = () => {
    const drawerState = useContactStore((state) => state.contactDrawerState)
    const handleClose = useContactStore((state) => state.setContactDrawerState)

    const renderedDrawers = (activeDrawer: string | undefined) => {
        if (ContactEnum.ADD_NEW_MEMBER === activeDrawer) {
            return <AddNewMember />
        } else if (ContactEnum.ADD_CUSTOMER === activeDrawer || ContactEnum.ADD_SUPPLIER === activeDrawer || ContactEnum.ADD_EMPLOYEE === activeDrawer) {
            return <AddNewParty />
        } else if (ContactEnum.EDIT_CUSTOMER === activeDrawer || ContactEnum.EDIT_SUPPLIER === activeDrawer || ContactEnum.EDIT_EMPLOYEE === activeDrawer) {
            return <EditParty />
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