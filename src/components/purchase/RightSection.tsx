'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/Card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import { usePurchaseStore } from '@/stores/usePurchase';
import { ArrowForwardIcon } from '@/components/common/icons';

// import ProductSellCalculation from '@/components//ProductSellCalculation';
import { ScrollArea } from '../ui/scroll-area';
import { usePurchase } from '@/stores/usePurchaseStore';
import { IProduct } from '@/types/product';
import { PurchaseEnum } from '@/enum/purchase';
import ProductFiledRow, { IProductPurchase } from './ProductFiledRow';
import ProductSellCalculation from './ProductSellCalculation';
import { toast } from 'sonner';
import { getCookie } from 'cookies-next';
import { createDueItem } from '@/actions/due/createDueItem';
import { formatDate, generateUlid } from '@/lib/utils';
import { DATE_FORMATS } from '@/lib/constants/common';
import { createDue } from '@/actions/due/createDue';
import {
  DEFAULT_DELETE_VERSION,
  DEFAULT_STARTING_VERSION,
} from '@/lib/constants/product';
import { createPurchase } from '@/actions/purchase/createPurchase';
import { jwtDecode } from 'jwt-decode';
import { createItemPurchase } from '@/actions/purchase/createItemPurchase';
import { ReloadIcon } from '@radix-ui/react-icons';
import { getDueByPurchaseId } from '@/actions/due/getDueByPurchaseId';
import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog';
import { BounceLoader } from 'react-spinners';

export const RightSection = () => {
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);
  const products = usePurchase((state) => state.products);
  const [sellType, setSellType] = useState('');
  const currentPurchase = usePurchase((state) => state.currentPurchase);
  const purchase = usePurchase((state) => state.purchase);
  const tkn = getCookie('access_token');
  const [loading, setLoading] = useState(false);
  const setProducts = usePurchase((state) => state.setProducts);
  const setPurchase = usePurchase((state) => state.setPurchase);
  const setCalculatedProducts = usePurchase(
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
    console.log(updatedProducts, purchase);
    if (!updatedProducts.length) {
      toast.warning('No Product Selected or Total is 0');
    }
    if (!!updatedProducts.length) {
      if (!!purchase?.length) {
        setLoading(true);
        const totalItems = updatedProducts.reduce((prev, current: any) => {
          return prev + Number(current?.calculatedAmount?.quantity!);
        }, 0);
        const uniqueId = generateUlid();

        const responseCreatePurchase = await createPurchase({
          batch: '',
          date: formatDate(DATE_FORMATS.default, data.date),

          created_at: currentPurchase?.created_at!,
          discount: Number(data.discount),
          discount_type: data.discountType ?? '',
          employee_mobile: currentPurchase?.employee_mobile,
          employee_name: currentPurchase?.employee_name,
          note: currentPurchase?.note ?? '',
          payment_method: currentPurchase?.payment_method!,
          payment_status: currentPurchase?.payment_status!,
          purchase_barcode: uniqueId,

          received_amount: Number(data.totalPrice),
          supplier_mobile: currentPurchase?.supplier_mobile,
          supplier_name: currentPurchase?.supplier_name,
          // supplier_address: currentPurchase?.supplier_address,
          total_item: totalItems,
          total_price: Number(data.totalPrice),
          unique_id: currentPurchase?.unique_id!,
          updated_at: formatDate(DATE_FORMATS.default),
          user_id: tkn ? Number(jwtDecode(tkn).sub) : 0,
          version: currentPurchase?.version! + 1,
          extra_charge: Number(data.delivery_charge),
        });

        if (!responseCreatePurchase?.success)
          return toast.error('Something went wrong');

        if (responseCreatePurchase?.success) {
          const apiCalls = async (product: any) => {
            const res = await createItemPurchase({
              created_at: formatDate(DATE_FORMATS.default),
              name: product.product.name,
              quantity: product.product.calculatedAmount?.quantity,
              selling_price: product.product.selling_price,
              unit_cost: product.product.calculatedAmount?.unit_cost,
              transaction_unique_id: currentPurchase?.unique_id!,
              profit:
                product.product.calculatedAmount?.quantity! *
                (product.product.selling_price - product.product.cost_price),
              status: currentPurchase?.payment_status,

              shop_product_id: product.product.id,
              shop_product_unique_id: product.product.unique_id,
              shop_product_variance_id: 1,
              price: product.product.calculatedAmount?.total,
              unique_id: product.unique_id,
              updated_at: formatDate(DATE_FORMATS.default),
              version: DEFAULT_DELETE_VERSION,
            });
            return res;
          };

          const promises = purchase?.map(apiCalls);
          const res = await Promise.all(promises);
          const isItemsDeleted = !res.some((response) => !response?.success);

          if (isItemsDeleted) {
            const apiCalls = async (product: any) => {
              const res = await createItemPurchase({
                created_at: formatDate(DATE_FORMATS.default),
                name: product.name,
                quantity: product.calculatedAmount?.quantity,
                selling_price: product.selling_price,
                unit_cost: product.calculatedAmount?.unit_cost,
                purchase_id: responseCreatePurchase.data.purchase.id,
                purchase_unique_id:
                  responseCreatePurchase.data.purchase.unique_id,

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

            const promises = updatedProducts?.map(apiCalls);
            const res = await Promise.all(promises);
            const isItemsAdded = !res.some((response) => !response?.success);

            if (isItemsAdded) {
              if (currentPurchase?.payment_method === 3) {
                const due = await getDueByPurchaseId(
                  currentPurchase?.unique_id!,
                  String(currentPurchase?.id!)
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
                    amount: -Number(data.totalPrice),
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

                setPurchase([]);
                setProducts([]);

                setLoading(false);

                toast.message('Transaction Updated Successfully');
              } else {
                setPurchase([]);
                setProducts([]);

                setLoading(false);

                toast.message('Transaction Updated Successfully');
              }
            }
          }
        }
      } else {
        sellType == 'cash'
          ? handleDrawerOpen({
              open: true,
              header: PurchaseEnum.CONFIRM_PAYMENT,
            })
          : handleDrawerOpen({
              open: true,
              header: PurchaseEnum.MONEY_GIVEN_ENTRY,
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
        className="lg:pl-space12 border-color space-y-space16 h-full lg:w-8/12 lg:border-l"
      >
        <ScrollArea className="p-space8 background relative h-[calc(100%-30rem)] w-full rounded-md pt-0 shadow">
          <Text
            title="Products Added for Purchase"
            className="background pt-space8 sticky top-0 z-20 font-semibold"
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

          <Card className="p-space8 py-space12 space-y-space8 rounded-none">
            {/* <Text title="মূল্য পরিশোধ পদ্ধতি" className="text-sm" /> */}

            <div className="gap-space8 sm:gap-space16 flex">
              {!!purchase?.length ? (
                ''
              ) : (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full p-8"
                  onClick={() => {
                    setSellType('cash');
                  }}
                >
                  নগদ টাকা <ArrowForwardIcon />
                </Button>
              )}
              {!!purchase?.length ? (
                ''
              ) : (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full p-8 "
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

              {!!purchase?.length ? (
                <Button
                  size="sm"
                  type="submit"
                  className="w-full p-8"
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
          {/* <Text
            title="Please wait ..."
            className="text-lg text-slate-50 mr-4"
          /> */}
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};
