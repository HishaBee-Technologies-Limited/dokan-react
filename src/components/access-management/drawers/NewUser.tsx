import React from 'react';
import Image from 'next/image';
import { FormProps } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/common/text';
import DatePicker from '@/components/common/DatePicker';
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const NewUser = ({ form }: { form: FormProps<any> }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // filesUpload()
    console.log(e.target.files);
  };

  return (
    <div className="space-y-space12">
      <div className="flex flex-col items-center justify-center gap-space16 py-space8">
        <label className="space-y-space12 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e)}
          />
          <Image src={`/images/add_user.svg`} alt="" height={100} width={100} />

          <p className="text-blue-600 font-medium text-center">Add Photo</p>
        </label>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-error-100">*</span>{' '}
            </FormLabel>
            <FormControl>
              <Input placeholder={`Name`} {...field} />
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

      <div className="space-y-space6">
        <Text title="Joining Date" />
        <DatePicker
          onChange={() => {}}
          contentAlign={'center'}
          triggerClasses={'w-full justify-center !h-[4.4rem]'}
        />
      </div>
    </div>
  );
};

export default NewUser;
