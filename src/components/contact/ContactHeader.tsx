'use client';
import React from 'react';
import { ContactEnum } from '@/enum/contact';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import { PageTitle } from '@/components/common/text';
import { useContactStore } from '@/stores/useContactStore';

const ContactHeader = () => {
  const handleDrawerOpen = useContactStore(
    (state) => state.setContactDrawerState
  );

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Contact List" />

      <Button
        onClick={() =>
          handleDrawerOpen({
            open: true,
            header: ContactEnum.ADD_NEW_MEMBER,
          })
        }
      >
        <AddIcon />
        <span>Add new member</span>
      </Button>
    </div>
  );
};

export default ContactHeader;
