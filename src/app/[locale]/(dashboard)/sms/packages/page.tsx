'use client';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { PageTitle, Text } from '@/components/common/text';
import { ArrowForwardIcon } from '@/components/common/icons';

const PackagesPage = () => {
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
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card
              key={'package' + i}
              className="py-space8 sm:py-space12 px-space12 sm:px-space16 shadow-md flex"
            >
              <Text
                variant="success"
                className="text-center pr-space24 border-r border-color min-w-max"
              >
                <span className="font-bold block text-[3.6rem]">30</span>
                <span className="">এস এম এস</span>
              </Text>

              <div className="w-full flex justify-between gap-space12 items-center pl-space16">
                <article>
                  <Text
                    title={`৳ 11.5`}
                    className="text-lg font-semibold mb-space12"
                  />
                  <Text title={`Per sms 0.38 TK only`} variant="secondary" />
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
