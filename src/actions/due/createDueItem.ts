'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IProductPayload } from '@/types/product';
import { IProductPurchasePayload } from '@/types/purchase';
import { IDueCreateItem } from '@/types/due/dueResponse';

export const createDueItem = async ({
  amount,
  unique_id,
  version,
  updated_at,
  created_at,
  message,
  due_left,
  due_unique_id,
  sms,
  transaction_unique_id,
}: IDueCreateItem) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const payload: IDueCreateItem = {
      shop_id: Number(shopId),
      amount,
      unique_id,
      version,
      updated_at,
      created_at,
      message,
      due_left,
      due_unique_id,
      sms,
      transaction_unique_id,
    };
    console.log(payload);

    const res = await fetch(
      'https://api-dev.hishabee.business/api/V3/due_item/add',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmViOWM2YmUyNWFjZmVmOGZiNTA4MDQ1OTBmMjIxZjVjZDAyNTRmODIxMDczOGE0NTU5YjFkYTgyMzY3NDg4YjY2NDcwOGFmZTgwZWY2ZGMiLCJpYXQiOjE3MTUyNTgwMTUuMTk5NzUyLCJuYmYiOjE3MTUyNTgwMTUuMTk5NzU1LCJleHAiOjE3NDY3OTQwMTUuMTkyNzYxLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.UnuoOfVhBk0jk3fnUwJ9gEv2JxzKI8iz4g8m6us8JyhOSSyVSg0jMMHw3pBW5rq5nph-6uZBywHrxzcGzMT940IrTWq8d-0SUwIpNW-Gt65IcxdBTFqoDzZlkeheXAEqHga-zOgY9aB70Qok1NWhuD9Piwu_aa3-DVHkobSgT1PYKUpNBrFa_aTcYHRsJkDx9ianqqqGetRxIJF1zaeHlaJ2BeUZQaBqV0TqaavAzKzNgWFIEg_gyCMHIaHdhee_qpneB0JITPJuMPZ7Ys9PC4_HES5D3UMWntHrxLeA4lSTZ1PNLH3wIMdEpDz_TxXeRLk5mYleq2YrrSgEGxKxIZULhE3Q1Z0kq3AFUkfQcDElxPDgRoDBP1ViqLt5vFm2YF1lON4VWYFAgbOIdfiRBLoiTe5PsAITctLk37ckG_lWdDCM_x_s3YucHoyZf2ZWu2c9p3v6F4afv1l4NO7i9Zj-dSOyWn9ndCWx6VreZdxAbdZW7nW4sQITkMzheEWC97a1F_7FVYySyZrGYUUq8Aw3SI4RHmSBUyxnpqcrP4Kv9j7BdwicNmRSotGrWjxIZnylqpkVW6r-BCdXvbuPGKxZzvAL3tkcD51qnLsEUoRRDQd53OvDzaFm8likv3hBIRImsKoSAOwAe2yDmPAG6ctCYVRN3uRrlIpQjlQclhM`,
        },
        body: JSON.stringify({ ...payload }),
      }
    );
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      return {
        success: true,
        status: data?.status_code,
        data: data,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};
