'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { PageSubTitle, Text } from '@/components/common/text';

const ContactUSPage = () => {
  return (
    <div className="space-y-space32">
      <PageSubTitle title="Contact information" />

      <div className="max-w-[42rem] ml-space8 space-y-space24">
        <Text title="আমাদের ফলো করুন" className="text-sm font-medium" />

        <div className="flex gap-space24">
          <Link href="https://www.facebook.com" target="_blank">
            <Image
              src="/images/social/facebook.svg"
              alt=""
              height={64}
              width={64}
            />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Image
              src="/images/social/instagram.svg"
              alt=""
              height={64}
              width={64}
            />
          </Link>
          <Link href="https://www.youtube.com" target="_blank">
            <Image
              src="/images/social/youtube.svg"
              alt=""
              height={64}
              width={64}
            />
          </Link>
        </div>

        <div className="bg-success-20 dark:bg-primary-90 py-space12 px-space16 sm:px-space24 rounded-lg">
          <Text title="যেকোনো প্রয়োজনে কল করুন" className="font-medium" />

          <div className="flex items-center gap-space8 mt-space8">
            <Image
              src="/images/social/call.svg"
              alt=""
              height={20}
              width={20}
            />
            <article className="flex items-center gap-space8 text-lg font-semibold">
              <Text title="12345" variant="success" />
              <Text title="নম্বরে" />
            </article>
          </div>
        </div>

        <div className="flex justify-between items-center gap-space16 pt-space16">
          <div>
            <div className="flex items-center gap-space8 mt-space8">
              <Image
                src="/images/social/messenger.svg"
                alt=""
                height={20}
                width={20}
              />
              <Text
                title="লাইভ চ্যাট সাপোর্ট"
                className="text-sm font-medium"
              />
            </div>

            <Text
              variant="secondary"
              className="text-xs mt-space4 max-w-[21rem]"
              title="যেকোনো সমস্যা কিংবা সাহায্য দরকার হলে লাইভ চ্যাট সাপোর্ট নিন।"
            />
          </div>

          <Button>Chat</Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUSPage;
