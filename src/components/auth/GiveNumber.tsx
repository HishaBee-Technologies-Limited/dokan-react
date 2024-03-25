'use client';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { checkNumber } from '@/actions/checkNumber';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  mobile_number: z.string().max(11).min(11, {
    message: 'Number must be 11 characters.',
  }),
});

const GiveNumber = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile_number: '',
    },
  });

  async function onSubmit({ mobile_number }: z.infer<typeof formSchema>) {
    // closeDrawer({ open: false })
    const response = await checkNumber({ mobile_number });
    console.log('data------------', response);
    if (response?.success) {
      if (response.data?.status_code === 200) {
        router.push('/auth/pin');
      } else if (response?.data?.status_code === 206) {
        router.push('/auth/signup');
      } else if (response?.data?.status_code === 208) {
        router.push('/auth/setup-pin');
      } else {
        router.push('/auth/error');
      }
    }
    if (!response?.success) {
      if (
        response?.error?.status_code === 403 ||
        response?.error?.status_code === 404
      ) {
        router.push('/auth/otp');
      } else {
        router.push('/auth/error');
      }
    }
  }
  return (
    <div>
      <Text
        title="Create your Hishabee account"
        className="text-[2.8rem] font-semibold mb-space32"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space16"
        >
          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Mobile number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.watch('mobile_number').length !== 11}
          >
            Save
          </Button>
        </form>
      </Form>

      <Text className="mt-space24 text-xs flex gap-space6">
        By registering, you accept our
        <span className="underline">Terms of use</span> and
        <span className="underline">Privacy Policy</span>
      </Text>
    </div>
  );
};

export default GiveNumber;
