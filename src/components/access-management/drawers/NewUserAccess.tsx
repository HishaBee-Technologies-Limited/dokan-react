import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/schemas/contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { DrawerFooter } from '@/components/common/Drawer';
import NewUser from '@/components/access-management/drawers/NewUser';
import UserAccess from '@/components/access-management/drawers/UserAccess';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';

const NewUserAccess = () => {
  const [step, setStep] = useState<number>(1);
  const closeDrawer = useAccessManagementStore((state) => state.setDrawerState);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      number: '',
      address: '',
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    const payload = {
      name: data.name,
      mobile: data.number,
      email: data.email as string,
      address: data.address as string,
    };
    console.log(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        {step === 1 ? <NewUser form={form} /> : <UserAccess />}

        <DrawerFooter>
          {step === 1 ? (
            <Button type="button" className="w-full" onClick={() => setStep(2)}>
              Continue
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Save
            </Button>
          )}
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default NewUserAccess;
