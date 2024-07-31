'use client';
import { z } from 'zod';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  AddIcon,
  ArrowForwardIcon,
  CancelIcon,
} from '@/components/common/icons';
import { useContactStore } from '@/stores/useContactStore';
import { sendSMS } from '@/actions/sms/sendSMS';
import { getCookie } from 'cookies-next';
import { getSmsCount } from '@/actions/sms/getSmsCount';

const formSchema = z.object({
  number: z.string().max(11).min(11, {
    message: 'This field is required.',
  }),
});

export const RightSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
    },
  });
  const { contacts, removeContact } = useContactStore((state) => state);
  const [newNumber, setNewNumber] = useState<string[]>([]);
  const [sms, setSMS] = useState('');
  const [smsCount, setSMSCount] = useState(0);
  const shop = getCookie('shop');
  // console.log('dd', JSON.parse(shop));/
  const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data------------', data);
  }

  const fetChSMSCount = async () => {
    const res = await getSmsCount();
    console.log(res);

    setSMSCount(res?.data.sms_count);
  };

  useEffect(() => {
    fetChSMSCount();
  }, []);

  return (
    <div className="lg:pl-space12 lg:border-l border-color h-full lg:w-8/12 flex flex-col gap-space16 justify-between">
      <div className="h-full flex flex-col gap-space24">
        <div className="flex justify-between gap-space16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <Text title="Input mobile number" className="font-semibold" />
              <div className="flex items-center gap-space12">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-full">
                      <FormControl>
                        <Input
                          placeholder="Mobile Number"
                          {...field}
                          type="number"
                          maxLength={11}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length <= 11) {
                              const result = e.target?.value.replace(/\D/g, '');
                              field.onChange(result);
                            }
                          }}
                          ref={field.ref}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  variant={'secondary'}
                  className="!h-[4.4rem] !px-space12"
                  onClick={() =>
                    setNewNumber([...newNumber, form.watch('number')])
                  }
                >
                  <AddIcon />
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-col items-end gap-space4">
            <Text
              variant="success"
              className="text-sm font-medium flex items-center gap-space4 bg-success-20 dark:bg-primary-80 py-space4 px-space12 rounded-full uppercase"
            >
              <Icon icon="material-symbols:sms" />
              SMS Balance {smsCount}
            </Text>
            <Link href="/sms/packages">
              <Button variant={'secondary'} size={'sm'}>
                Buy sms <ArrowForwardIcon />
              </Button>
            </Link>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="space-y-space8">
            <Text title="SMS Sending to" className="font-semibold" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space8">
              {contacts?.map((contact, i) => (
                <Card
                  key={contact.id}
                  className="px-space12 py-space12 flex justify-center items-center gap-space8"
                >
                  <Text title={contact.mobile} />
                  <div
                    className="cursor-pointer"
                    onClick={() => removeContact(contact)}
                  >
                    <CancelIcon color="red" />
                  </div>
                </Card>
              ))}
              {newNumber?.map((number, i) => (
                <Card
                  key={i + 1}
                  className="px-space12 py-space12 flex justify-center items-center gap-space8"
                >
                  <Text title={number} />
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setNewNumber(newNumber.filter((numb) => number !== numb))
                    }
                  >
                    <CancelIcon color="red" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-space8 mt-space16">
            <Card className="px-space12 py-space12 space-y-space8 shadow-sm">
              <Text title="Write your message" className="font-semibold" />

              <Textarea
                placeholder="Write your message here"
                className="resize-none bg-primary-5 h-[14rem]"
                onChange={(e) => setSMS(e.target.value)}
              />
            </Card>
          </div>
          <Text
            title={`${`${sms} - ${shop && JSON.parse(shop).name} ${shop && JSON.parse(shop).number}`.length} Character  | 1 SMS (160 Character/SMS)`}
            variant="secondary"
          />

          <div className=" h-24 w-80 float-right mt-[-105px] mr-[15px] flex items-center justify-center">
            <Text
              title={`- ${shop && JSON.parse(shop).name}, ${shop && JSON.parse(shop).number}`}
              variant="secondary"
              className=""
            />
          </div>
        </ScrollArea>
      </div>
      <Card className="p-space8 py-space12 rounded-none space-y-space8">
        <Button
          size="sm"
          className="w-full"
          disabled={loading || (!!!newNumber.length && !!!contacts?.length)}
          onClick={async () => {
            if (shop) {
              setLoading(true);
              const res = await sendSMS({
                message: `${sms} - ${JSON.parse(shop!).name}, ${JSON.parse(shop!).number}`,
                sms_count: String(
                  Math.ceil(
                    `${sms} ${JSON.parse(shop!).name} ${JSON.parse(shop!).number}`
                      .length / 160
                  )
                ),
                number: `[${[...newNumber.map((nmb) => `"${nmb}"`), ...contacts?.map((con) => con.mobile)!?.map((numb) => `"${numb}"`)]}]`,
              });
              console.log(res);
              setLoading(false);
              fetChSMSCount();
              setSMS('');
            }
          }}
        >
          Send SMS
        </Button>
      </Card>
    </div>
  );
};
