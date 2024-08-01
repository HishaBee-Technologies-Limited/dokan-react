'use client';
import { getAllSms } from '@/actions/sms/getAllSms';
import { Pagination } from '@/components/ui/pagination';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PageTitle, Text } from '@/components/common/text';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowForwardIcon } from '@/components/common/icons';
import Link from 'next/link';

export interface ISms {
  created_at: string;
  id: number;
  message: string;
  msg_len: number;
  name: string;
  number: number;
  shop_id: number;
  sms_delivered: number;
  updated_at: string;
}

export default function SmsHistory() {
  const [allSMS, setAllSMS] = useState<ISms[]>();
  const fetchAllSMS = async () => {
    const res = await getAllSms();
    console.log(res);
    setAllSMS(res?.data);
  };
  useEffect(() => {
    fetchAllSMS();
  }, []);
  return (
    <div>
      <div className="flex items-center gap-space12 mb-14">
        <Link href={'/sms'}>
          <ArrowForwardIcon rotate={2} />
        </Link>
        <PageTitle title="SMS History" />
      </div>
      <ScrollArea className="pb-space8">
        <Table wrapperClass="rounded-md border border-color min-w-[80rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="">SMS dispatched from</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Number of SMS sent</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allSMS?.map((sms, i) => (
              <TableRow
                className="cursor-pointer"
                key={sms.id}
                //   onClick={() => handleEdit(item)}
              >
                <TableCell>
                  <div className="flex items-center gap-space8">
                    <Text
                      title={sms.name ? sms.name : 'Not Given'}
                      className={cn(
                        sms.name?.includes('ENCRYPTED') && 'blur-sm',
                        'text-sm'
                      )}
                    />
                  </div>
                </TableCell>
                <TableCell
                  className={cn(sms.name?.includes('ENCRYPTED') && 'blur-sm')}
                >
                  {sms.number}
                </TableCell>
                <TableCell>{sms.message}</TableCell>
                <TableCell>{sms.created_at}</TableCell>
                <TableCell className="text-center">
                  <article className="flex items-center gap-space16 justify-center">
                    {sms.sms_delivered}
                  </article>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              {/* <TableCell colSpan={5} className="text-center">
          Showing 10 of 100 Transactions
        </TableCell> */}
            </TableRow>
          </TableFooter>
        </Table>
        <ScrollBar orientation="horizontal" />
        {/* {dueList?.data.length !== 0 && (
        <Pagination
          pageCount={Math.ceil(dueList.total / dueList.per_page)}
          currentPage={dueList.current_page ?? 0}
          lastPage={dueList.last_page ?? 0}
          onChanage={(page) => {
            router.push(`${pathname}?${setQueryString('page', page)}`);
          }}
        />
      )} */}
      </ScrollArea>
    </div>
  );
}
