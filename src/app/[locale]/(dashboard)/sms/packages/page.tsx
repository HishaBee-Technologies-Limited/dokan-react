'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { PageTitle, Text } from '@/components/common/text';
import { ArrowForwardIcon } from '@/components/common/icons';
import { getSmsPackages } from '@/actions/sms/getSmsPackages';
import { createSmsPayment } from '@/actions/sms/createSmsPayment';

export interface ISMSPackage {
  id: string;
  description: string;
  sms_amount: number;
  price: number;
  created_at: string;
  updated_at: string;
}

const PackagesPage = () => {
  const [packages, setPackages] = useState<ISMSPackage[]>();

  const fetChSMSPackages = async () => {
    const res = await getSmsPackages();
    console.log(res);
    setPackages(res?.data);
  };

  useEffect(() => {
    fetChSMSPackages();
  }, []);

  const calculatePerSMSCost = (pkg: ISMSPackage) => {
    return (pkg.sms_amount / pkg.price).toFixed(2);
  };

  const paymentForSMS = async (pkg: ISMSPackage) => {
    const res = await createSmsPayment(pkg);
    console.log(res);
    location.replace(res?.data.url);
  };
  return (
    <div className="h-full overflow-y-scroll space-y-space24">
      <div className="flex items-center gap-space12">
        <Link href={'/sms'}>
          <ArrowForwardIcon rotate={2} />
        </Link>
        <PageTitle title="SMS Package" />
      </div>

      <Card className="p-space8 sm:p-space16 shadow-sm flex items-center gap-space8 sm:gap-space16">
        <Image src={'/images/sms.svg'} alt="" height={72} width={72} />

        <article className="space-y-space16 w-full">
          <Text title="এস এম এস কেন কিনবেন?" className="font-bold text-xl" />
          <Text
            variant="secondary"
            title="হিসাবী থেকে প্রতি মাসে আপনাকে ৩০ টি  করে এস এম এস ফ্রি দেয়া হয় । যা আপনি মার্কেটিং অথবা বিক্রির রিসিপ্ট পাঠাতে ব্যবহার করতে পারবেন । এর থেকে বেশি এস এম এস যদি প্রয়োজন হয় তাহলে আপনার চাহিদা অনুযায়ী সাশ্রয়ী প্যাকেজ কিনে নিতে পারবেন এখান থেকে ।"
            className="md:w-3/4"
          />
        </article>
      </Card>
      <div className="grid sm:grid-cols-2 gap-space12">
        {packages?.map((pkg, i) => (
          <Card
            key={'package' + i}
            className="py-space8 sm:py-space12 px-space12 sm:px-space16 shadow-md flex hover:bg-opacity-65 cursor-pointer"
            onClick={() => paymentForSMS(pkg)}
          >
            <Text
              variant="success"
              className="text-center pr-space24 border-r border-color min-w-max"
            >
              <span className="font-bold block text-[3.6rem]">
                {pkg.sms_amount}
              </span>
              <span className="">এস এম এস</span>
            </Text>

            <div className="w-full flex justify-between gap-space12 items-center pl-space16">
              <article>
                <Text
                  title={`৳ ${pkg.price}`}
                  className="text-lg font-semibold mb-space12"
                />
                <Text
                  title={`Per sms ${calculatePerSMSCost(pkg)} TK only`}
                  variant="secondary"
                />
              </article>
              <ArrowForwardIcon />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackagesPage;
