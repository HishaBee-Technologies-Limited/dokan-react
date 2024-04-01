import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DrawerFooter } from '@/components/common/Drawer';
import { useContactStore } from '@/stores/useContactStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { contactSchema } from '@/schemas/contacts';
import { filesUpload } from '@/actions/upload';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { editCustomer } from '@/actions/contacts/editCustomer';
import { editSupplier } from '@/actions/contacts/editSupplier';
import { editEmployee } from '@/actions/contacts/editEmployee';
import { useRouter } from 'next/navigation';

const EditUser = () => {
  const router = useRouter();
  const { getQueryString } = useCreateQueryString();

  const activeTab = getQueryString('tab') ?? '';
  const userID = getQueryString('active_user') ?? '';

  const { party } = useContactStore((state) => state);
  const closeDrawer = useContactStore((state) => state.setContactDrawerState);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: party?.name as string,
      number: party?.mobile as string,
      address: party?.address ?? '',
      email: party?.email ?? '',
      salary: party?.salary ?? '',
    },
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    const payload = {
      name: data.name,
      mobile: data.number,
      email: data.email as string,
      address: data.address as string,
      id: userID,
    };

    const updateParty = () => {
      if (activeTab === 'Customer') {
        return editCustomer(payload);
      } else if (activeTab === 'Supplier') {
        return editSupplier(payload);
      } else if (activeTab === 'Employee') {
        return editEmployee({ ...payload, salary: data.salary });
      }
    };

    const updatedParty = async () => {
      const response = await updateParty();
      if (response?.success) {
        router.refresh();
        closeDrawer({ open: false });
        console.log('response true', response);
      } else {
        console.log('error', response?.error);
      }
    };

    updatedParty();
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // filesUpload()
    console.log(e.target.files);
  };

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
            <Image
              src={`/images/add_user.svg`}
              alt=""
              height={100}
              width={100}
            />

            <p className="text-blue-600 font-medium text-center">Add Photo</p>
          </label>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {activeTab} Name <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input placeholder={`${activeTab} Name`} {...field} />
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
              <FormLabel>
                Phone Number <span className="text-error-100">*</span>{' '}
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Phone Number" {...field} />
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

        {activeTab === 'Employee' && (
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary (Monthly) </FormLabel>
                <FormControl>
                  <Input placeholder="Salary (Monthly)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DrawerFooter>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};

export default EditUser;
