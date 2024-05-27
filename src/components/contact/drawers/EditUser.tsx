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
import { contactSchema } from '@/schemas/contacts';
import { filesUpload } from '@/actions/upload';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { editCustomer } from '@/actions/contacts/editCustomer';
import { editSupplier } from '@/actions/contacts/editSupplier';
import { editEmployee } from '@/actions/contacts/editEmployee';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFileUpload } from '@/hooks/uploadMultipleFile';

const EditUser = () => {
  const router = useRouter();
  const { getQueryString } = useCreateQueryString();
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [imageUrls, loading] = useFileUpload(selectedFiles);
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
      salary: party?.salary_amount ?? '',
    },
  });

  useEffect(() => {
    console.log(party);
    form.setValue('name', party?.name as string);
    form.setValue('number', party?.mobile as string);
    form.setValue('address', party?.address as string);
    form.setValue('email', party?.email as string);
    form.setValue('salary', party?.monthly_salary as string);
    form.setValue('image_src', party?.image_src as string);
  }, [party]);

  function onSubmit(data: z.infer<typeof contactSchema>) {
    const payload = {
      name: data.name,
      mobile: data.number,
      email: data.email as string,
      address: data.address as string,
      unique_id: party?.unique_id,
      id: party?.id,
      image_src: data.image_src,
      salary_amount: data.salary,
    };

    console.log(party);

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
      } else {
        toast.error('Something went wrong');
        console.log('error', response?.error);
      }
    };

    updatedParty();
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFiles(selectedFiles);
  };

  useEffect(() => {
    form.setValue('image_src', imageUrls[0]);
  }, [imageUrls]);

  console.log(party);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-space12">
        <FormField
          control={form.control}
          name="image_src"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center gap-space16 py-space12">
              <div className="h-[10rem] w-[10rem] bg-primary-5 dark:bg-primary-80 border border-color rounded-full flex items-center justify-center">
                <img
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

export default EditUser;
