import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { addCustomer } from '@/actions/contacts/addCustomer';
import { contactSchema } from '@/schemas/contacts';
import { filesUpload } from '@/actions/upload';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { addSupplier } from '@/actions/contacts/addSupplier';
import { addEmployee } from '@/actions/contacts/addEmployee';
import { useRouter } from 'next/navigation';
import { useFileUpload } from '@/hooks/uploadMultipleFile';

const AddNewUser = () => {
  const router = useRouter();
  const { getQueryString } = useCreateQueryString();
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [imageUrls, loading] = useFileUpload(selectedFiles);
  const activeTab = getQueryString('tab') ?? '';

  const closeDrawer = useContactStore((state) => state.setContactDrawerState);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      number: '',
      address: '',
      email: '',
      salary: '',
    },
  });

  async function onSubmit(data: z.infer<typeof contactSchema>) {
    const payload = {
      name: data.name,
      mobile: data.number,
      email: data.email as string,
      address: data.address as string,
      image_src: data.image_src,
    };

    const createNewUser = () => {
      if (activeTab === 'Customer') {
        return addCustomer(payload);
      } else if (activeTab === 'Supplier') {
        return addSupplier(payload);
      } else if (activeTab === 'Employee') {
        return addEmployee({ ...payload, salary: data?.salary });
      }
    };

    const response = await createNewUser();
    if (response?.success) {
      closeDrawer({ open: false });
      console.log('response true');
      router.refresh();
    } else {
      console.log('error', response?.error);
    }
    console.log('response', response);
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFiles(selectedFiles);
  };

  useEffect(() => {
    form.setValue('image_src', imageUrls[0]);
  }, [imageUrls]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <FormField
          control={form.control}
          name="image_src"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center gap-space16 py-space12">
              <div className="h-[10rem] w-[10rem] bg-primary-5 dark:bg-primary-80 border border-color rounded-full flex items-center justify-center">
                <Image
                  src={`${field.value ? field.value : '/images/add_user.svg'}`}
                  alt=""
                  height={54}
                  width={54}
                />
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <p className="text-blue-600 text-sm font-medium text-center">
                  Add a logo of your Shop
                </p>
              </label>
            </FormItem>
          )}
        />

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

export default AddNewUser;
