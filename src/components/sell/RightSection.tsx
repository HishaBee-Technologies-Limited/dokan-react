'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/Card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { ArrowForwardIcon } from '@/components/common/icons';
import ProductFiledRow, {
  IProductPurchase,
} from '@/components/sell/ProductFiledRow';
import ProductSellCalculation from '@/components/sell/ProductSellCalculation';
import { useSellStore } from '@/stores/useSellStore';
import { SellEnum } from '@/enum/sell';
import { ScrollArea } from '../ui/scroll-area';
import { IProduct } from '@/types/product';
import { toast } from 'sonner';
import { createSell } from '@/actions/sell/createSell';
import { formatDate, generateUlid } from '@/lib/utils';
import { DATE_FORMATS, TRANSACTION_TYPE } from '@/lib/constants/common';
import { jwtDecode } from 'jwt-decode';
import {
  DEFAULT_DELETE_VERSION,
  DEFAULT_STARTING_VERSION,
} from '@/lib/constants/product';
import { getCookie } from 'cookies-next';
import { sellItemCreate } from '@/actions/sell/sellItemCreate';
import { ReloadIcon } from '@radix-ui/react-icons';
import { createDueItem } from '@/actions/due/createDueItem';
import { createDue } from '@/actions/due/createDue';
import { getDueByTransactionId } from '@/actions/due/getDueByTransactionId';
import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';
import { BounceLoader } from 'react-spinners';

export const RightSection = () => {
  const handleSellDrawer = useSellStore((state) => state.setSellDrawerState);
  const [sellType, setSellType] = useState('');
  const products = useSellStore((state) => state.products);
  const currentSell = useSellStore((state) => state.currentSell);
  const transaction = useSellStore((state) => state.transaction);
  const tkn = getCookie('access_token');
  const [loading, setLoading] = useState(false);
  const setTransaction = useSellStore((state) => state.setTransaction);
  const setProducts = useSellStore((state) => state.setProducts);

  const setCalculatedProducts = useSellStore(
    (state) => state.setCalculatedProducts
  );

  const form = useForm({
    defaultValues: {
      quantity: [],
      discount_type: 'AMOUNT',
    },
  });

  async function onSubmit(data: any) {
    const updatedProducts = products.map((product) => {
      if (
        data.products.some(
          (prod: IProduct) => Object.keys(prod)[0] === `product-${product.id}`
        )
      ) {
        const updatedProduct = Object.values(
          data.products.find(
            (prod: IProduct) => Object.keys(prod)[0] === `product-${product.id}`
          )
        )[0];
        return {
          ...product,
          calculatedAmount: updatedProduct,
        };
      }
    });

    console.log(updatedProducts);

    if (!updatedProducts.length) {
      toast.warning('No Product Selected or Total is 0');
    }

    if (!!updatedProducts.length) {
      if (!!transaction.length) {
        setLoading(true);
        const totalItems = updatedProducts.reduce((prev, current: any) => {
          return prev + Number(current?.calculatedAmount?.quantity!);
        }, 0);
        const totalProfit = updatedProducts.reduce((prev, current: any) => {
          return (
            prev +
            current.calculatedAmount?.quantity! *
              (current.selling_price - current.cost_price)
          );
        }, 0);

        const responseCreateSell = await createSell({
          created_at: currentSell?.created_at!,
          discount: Number(data.discount),
          discount_type: data.discountType ?? '',
          employee_mobile: currentSell?.employee_mobile,
          employee_name: currentSell?.employee_name,
          note: currentSell?.note,
          payment_method: currentSell?.payment_method!,
          payment_status: currentSell?.payment_status!,
          purchase_barcode: '',
          received_amount: Number(data.totalPrice),
          customer_mobile: currentSell?.customer_mobile,
          customer_name: currentSell?.customer_name,
          customer_address: currentSell?.customer_address,
          total_item: totalItems,
          total_price: Number(data.totalPrice),
          unique_id: currentSell?.unique_id!,
          updated_at: formatDate(DATE_FORMATS.default),
          user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
          version: currentSell?.version! + 1,
          extra_charge: Number(data.delivery_charge),
          total_discount: Number(data.discount),
          transaction_type: TRANSACTION_TYPE.PRODUCT_SELL,
          total_profit: String(totalProfit),
        });

        if (!responseCreateSell?.success)
          return toast.error('Something went wrong');

        if (responseCreateSell?.success) {
          const apiCalls = async (product: any) => {
            const res = await sellItemCreate({
              created_at: formatDate(DATE_FORMATS.default),
              name: product.shop_product_by_uniqueid.name,
              quantity:
                product.shop_product_by_uniqueid.calculatedAmount?.quantity,
              unit_price:
                product.shop_product_by_uniqueid.calculatedAmount?.unit_price,
              unit_cost: product.shop_product_by_uniqueid.cost_price,
              transaction_unique_id: currentSell?.unique_id!,
              profit:
                product.shop_product_by_uniqueid.calculatedAmount?.quantity! *
                (product.shop_product_by_uniqueid.selling_price -
                  product.shop_product_by_uniqueid.cost_price),
              status: 'PAID',

              shop_product_id: product.shop_product_by_uniqueid.id,
              shop_product_unique_id:
                product.shop_product_by_uniqueid.unique_id,
              shop_product_variance_id: 1,
              price: product.shop_product_by_uniqueid.calculatedAmount?.total,
              unique_id: product.unique_id,
              updated_at: formatDate(DATE_FORMATS.default),
              version: DEFAULT_DELETE_VERSION,
            });
            return res;
          };

          const promises = transaction.map(apiCalls);
          const res = await Promise.all(promises);
          const isTransactionsDeleted = !res.some(
            (response) => !response?.success
          );

          if (isTransactionsDeleted) {
            const apiCalls = (product: any) => {
              const res = sellItemCreate({
                created_at: formatDate(DATE_FORMATS.default),
                name: product.name,
                quantity: product.calculatedAmount?.quantity,
                unit_price: product.calculatedAmount?.unit_price,
                unit_cost: product.cost_price,
                transaction_unique_id:
                  responseCreateSell.data.transaction.unique_id,
                profit:
                  product.calculatedAmount?.quantity! *
                  (product.selling_price - product.cost_price),
                status: 'PAID',

                shop_product_id: product.id,
                shop_product_unique_id: product.unique_id,
                shop_product_variance_id: 1,
                price: product.calculatedAmount?.total,
                unique_id: generateUlid(),
                updated_at: formatDate(DATE_FORMATS.default),
                version: DEFAULT_STARTING_VERSION,
              });
              return res;
            };

            const promises = updatedProducts.map(apiCalls);
            const res = await Promise.all(promises);
            const isTransactionsCreated = !res.some(
              (response) => !response?.success
            );

            if (!isTransactionsCreated)
              return toast.error('Something went wrong');
            if (isTransactionsCreated) {
              if (currentSell?.payment_method === 3) {
                const due = await getDueByTransactionId(
                  currentSell?.unique_id!,
                  String(currentSell?.id!)
                );

                const shop_id = getCookie('shopId') as string;

                // Current Total - (Prev Total - Prev due)
                const amount =
                  Number(data.totalPrice) -
                    (due?.data.due_item.amount -
                      due?.data.due_item.due_left) !==
                  due?.data.due_item.due_left
                    ? Number(data.totalPrice) -
                      due?.data.due_item.amount +
                      due?.data.due_item.due.due_amount
                    : due?.data.due_item.due.due_amount;

                const payload = {
                  shop_id: Number(shop_id),
                  amount: amount,
                  unique_id: due?.data.due_item.due.unique_id,
                  due_left: amount,
                  version: due?.data.due_item.due.version + 1,
                  updated_at: formatDate(DATE_FORMATS.default),
                  created_at: due?.data.due_item.due.created_at,
                  message: data.details,
                  contact_mobile: due?.data.due_item.due.contact_mobile,
                  contact_type: 'CUSTOMER',
                  contact_name: due?.data.due_item.due.contact_name,
                  transaction_unique_id:
                    due?.data.due_item.transaction_unique_id,
                };

                const dueRes = await createDue(payload);

                if (!dueRes?.success)
                  return toast.error('Something went wrong');
                if (dueRes?.success) {
                  const payload = {
                    amount: Number(data.totalPrice),
                    unique_id: due?.data.due_item.unique_id,
                    due_left: due?.data.due_item.due_left,
                    version: due?.data.due_item.version + 1,
                    updated_at: formatDate(DATE_FORMATS.default),
                    created_at: due?.data.due_item.created_at,
                    message: due?.data.due_item.note,
                    contact_mobile: due?.data.due_item.due.contact_mobile,
                    contact_type: 'CUSTOMER',
                    contact_name: due?.data.due_item.due.contact_name,
                    // sms: data.sms ?? false,
                    transaction_unique_id:
                      due?.data.due_item.transaction_unique_id,
                    due_unique_id: due?.data.due_item.due.unique_id,
                  };

                  await createDueItem(payload);
                }

                setTransaction([]);
                setProducts([]);
                setLoading(false);

                toast.message('Transaction Updated Successfully');
              } else {
                setTransaction([]);
                setProducts([]);
                setLoading(false);

                toast.message('Transaction Updated Successfully');
              }
            }
          }
        }
      } else {
        sellType == 'cash'
          ? handleSellDrawer({
              open: true,
              header: SellEnum.CONFIRM_PAYMENT,
            })
          : handleSellDrawer({
              open: true,
              header: SellEnum.MONEY_GIVEN_ENTRY,
            });
        setCalculatedProducts({
          products: updatedProducts as IProductPurchase[],
          deliveryCharge: data.delivery_charge,
          discount: data.discount,
          totalPrice: data.totalPrice,
          discountType: data.discount_type,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:pl-space12 lg:border-l border-color h-full lg:w-8/12 space-y-space16"
      >
        <ScrollArea className="w-full h-[calc(100%-30rem)] shadow p-space8 pt-0 relative background rounded-md">
          <Text
            title="Products Added for Sell"
            className="font-semibold sticky top-0 z-20 background pt-space8"
          />

          <div className="space-y-space12">
            {products.map((product, index) => (
              <ProductFiledRow
                key={product.unique_id}
                data={product}
                {...{ index, form }}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-space8">
          <ProductSellCalculation form={form} />

          <Card className="p-space8 py-space12 rounded-none space-y-space8">
            <Text title="মূল্য পরিশোধ পদ্ধতি" className="text-sm" />

            <div className="flex gap-space8 sm:gap-space16">
              {!!transaction.length ? (
                ''
              ) : (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    setSellType('cash');
                  }}
                >
                  নগদ টাকা <ArrowForwardIcon />
                </Button>
              )}
              {!!transaction.length ? (
                ''
              ) : (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    setSellType('due');
                  }}
                >
                  বাকি <ArrowForwardIcon />
                </Button>
              )}
              {/* <Button
                size="sm"
                type="submit"
                className="w-full"
                onClick={() =>
                  handleSellDialog({ open: true, header: SellEnum.QR_CODE })
                }
              >
                নিজস্ব QR কোড <ArrowForwardIcon />
              </Button> */}

              {!!transaction.length ? (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full"
                  // onClick={() =>
                  //   handleSellDialog({ open: true, header: SellEnum.QR_CODE })
                  // }
                  disabled={loading}
                >
                  Save{' '}
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              ) : (
                ''
              )}
            </div>
          </Card>
        </div>
      </form>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <BounceLoader color="#FFC600" />
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};
