'use client';
import { z } from 'zod';
import React, { useState } from 'react';
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
import { ReloadIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  mobile_number: z.string().max(11).min(11, {
    message: 'Number must be 11 characters.',
  }),
});

const GiveNumber = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile_number: '',
    },
  });

  async function onSubmit({ mobile_number }: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await checkNumber({ mobile_number });
    setLoading(false);

    console.log(response);

    if (response?.success) {
      if (response.data?.code === 200) {
        router.push('/auth/pin');
      } else if (response?.data?.code === 206) {
        router.push('/auth/signup');
      } else if (response?.data?.code === 208) {
        router.push('/auth/setup-pin');
      } else {
        router.push('/auth/error');
      }
    }
    if (!response?.success) {
      if (response?.error?.code === 403 || response?.error?.code === 404) {
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
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
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
