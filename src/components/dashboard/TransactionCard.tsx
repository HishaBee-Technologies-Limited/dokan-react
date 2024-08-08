import Card from '@/components/common/Card';
import React from 'react';

type TransactionCardType = {
  title: string;
  value: number;
  classes?: string;
};

export default function TransactionCard({
  classes,
  value,
  title,
}: TransactionCardType) {
  return (
    <Card
      className={`py-4 px-6 text-center w-1/2 text-lg font-medium ${classes}`}
    >
      <h5>{title}</h5>
      <span>৳ {value}</span>
    </Card>
  );
}
