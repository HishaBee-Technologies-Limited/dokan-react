'use client'

import React from 'react'
import { ContactEnum } from '@/enum/contact'
import { Drawer } from '@/components/common/Drawer'
import { useContactStore } from '@/stores/useContactStore'
import AddNewMember from '@/components/contact/drawers/AddNewMember'

const ContactDrawers = () => {
    const { contactDrawerState, setContactDrawerState } = useContactStore((state) => state)

    const renderedDrawers = (activeDrawer: string | undefined) => {
        if (ContactEnum.ADD_NEW_MEMBER === activeDrawer) {
            return <AddNewMember />
        } else {
            return <></>
        }
    }


    return (
        <Drawer
            open={contactDrawerState.open}
            header={contactDrawerState.header}
            onClose={(open) => setContactDrawerState({ open })}
        >
            {renderedDrawers(contactDrawerState.header)}
        </Drawer>
    )
}

export default ContactDrawers