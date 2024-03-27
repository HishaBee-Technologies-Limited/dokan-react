'use client';
import React from 'react';
import { Text } from '@/components/common/text';

const HistoryReport = ({ totalValues }: { totalValues: any }) => {
  // give == ( + ) value

  return (
    <div className="grid lg:grid-cols-2 gap-space16">
      <div className="flex justify-between items-center gap-space12 bg-error-10 dark:bg-primary-90 border border-error-80 rounded-lg p-space12">
        <article className="space-y-space4">
          <Text title="দিয়েছি" variant="error" className="text-xs sm:text-sm" />
          <Text
            title={`৳ ${totalValues?.customer_total_give}`}
            variant="error"
            className="text-xs sm:text-sm"
          />
        </article>
        -
        <article className="space-y-space4">
          <Text
            title="নিয়েছি"
            variant="success"
            className="text-xs sm:text-sm"
          />
          <Text
            title={`৳ ${totalValues?.customer_total_get}`}
            variant="success"
            className="text-xs sm:text-md font-semibold"
          />
        </article>
        =
        <article className="space-y-space4">
          <Text
            className="text-xs sm:text-md font-semibold"
            variant={
              totalValues?.customer_total_give -
                totalValues?.customer_total_get <
              0
                ? 'error'
                : 'success'
            }
            title={
              totalValues?.customer_total_give -
                totalValues?.customer_total_get <
              0
                ? 'কাস্টমারকে দিবো'
                : 'কাস্টমার থেকে পাবো'
            }
          />
          <Text
            className="text-xs sm:text-md font-semibold"
            title={`৳ ${
              totalValues?.customer_total_give - totalValues?.customer_total_get
            }`}
            variant={
              totalValues?.customer_total_give -
                totalValues?.customer_total_get <
              0
                ? 'error'
                : 'success'
            }
          />
        </article>
      </div>

      <div className="flex justify-between items-center gap-space12 bg-success-10 dark:bg-primary-90 border border-success-80 rounded-lg p-space12">
        <article className="space-y-space4">
          <Text
            title="নিয়েছি"
            variant="success"
            className="text-xs sm:text-sm"
          />
          <Text
            title={`৳ ${totalValues?.supplier_total_get}`}
            variant="success"
            className="text-xs sm:text-sm"
          />
        </article>
        -
        <article className="space-y-space4">
          <Text title="দিয়েছি" variant="error" className="text-xs sm:text-sm" />
          <Text
            title={`৳ ${totalValues?.supplier_total_give}`}
            variant="error"
            className="text-xs sm:text-md font-semibold"
          />
        </article>
        =
        <article className="space-y-space4">
          <Text
            className="text-xs sm:text-md font-semibold"
            variant={
              totalValues?.supplier_total_get -
                totalValues?.supplier_total_give <
              0
                ? 'error'
                : 'success'
            }
            title={
              totalValues?.supplier_total_get -
                totalValues?.supplier_total_give <
              0
                ? 'সাপ্লায়ার থেকে পাবো'
                : 'সাপ্লায়ারকে দিবো'
            }
          />
          <Text
            className="text-xs sm:text-md font-semibold"
            title={`৳ ${
              totalValues?.supplier_total_get - totalValues?.supplier_total_give
            }`}
            variant={
              totalValues?.supplier_total_get -
                totalValues?.supplier_total_give <
              0
                ? 'error'
                : 'success'
            }
          />
        </article>
      </div>
    </div>
  );
};

export default HistoryReport;
