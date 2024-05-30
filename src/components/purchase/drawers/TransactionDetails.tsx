import React, { useEffect, useMemo, useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { usePurchaseStore } from '@/stores/usePurchase';
import { DrawerFooter } from '@/components/common/Drawer';
import FallBackImage from '@/components/common/FallBackImage';
import { DeleteIcon, EditIcon } from '@/components/common/icons';
import { PurchaseEnum } from '@/enum/purchase';
import { usePurchase } from '@/stores/usePurchaseStore';
import { calculateTotal } from '@/lib/utils';

import { PAYMENT_STATUS } from '@/lib/constants/purchase';
import { getPurchaseItems } from '@/actions/purchase/getPurchaseItems';
import { IPurchaseProducts } from '@/types/purchase';
import ProductListCard from '../ProductListCard';

const TransactionDetails = () => {
  const [purchaseProducts, setPurchaseProducts] = useState<IPurchaseProducts>();
  const handleDialogOpen = usePurchaseStore((state) => state.setDialogState);
  const handleDrawerOpen = usePurchaseStore((state) => state.setDrawerState);
  const currentPurchase = usePurchase((state) => state.currentPurchase);

  const total = useMemo(() => {
    return (
      currentPurchase?.total_price &&
      Math.round(
        calculateTotal(
          currentPurchase?.total_price,
          currentPurchase?.extra_charge ?? 0,
          currentPurchase?.discount ?? 0,
          currentPurchase?.discount_type
        ) ?? 0
      )
    );
  }, [currentPurchase]);

  useEffect(() => {
    const getPurchaseProducts = async () => {
      const res = await getPurchaseItems({
        id: currentPurchase?.unique_id ? currentPurchase?.unique_id : '',
      });
      console.log(res);
      if (res?.success) {
        setPurchaseProducts(res?.data);
      }
    };
    getPurchaseProducts();
  }, [currentPurchase]);

  console.log(purchaseProducts);

  return (
    <div className="space-y-space12">
      <section className="bg-secondary rounded-lg p-space12 space-y-space16 ">
        <Text
          title={`Total Item: ${purchaseProducts?.items?.length ?? 0}`}
          className="font-semibold"
        />

        {currentPurchase?.supplier_name && (
          <div className="flex items-center gap-space8">
            <Text title="Customer" />
            <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
              <FallBackImage
                src=""
                fallback="M"
                className="w-space24 h-space24 mr-space8"
              />
              <span> {currentPurchase?.supplier_name}</span>
            </div>
          </div>
        )}
        {currentPurchase?.employee_name && (
          <div className="flex items-center gap-space8">
            <Text title="Employee" />
            <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
              <FallBackImage
                src=""
                fallback="M"
                className="w-space24 h-space24 mr-space8"
              />
              <span> {currentPurchase.employee_name}</span>
            </div>
          </div>
        )}

        <Text
          title={`Transaction date  ${currentPurchase?.created_at} `}
          className="font-semibold"
        />
      </section>
      <article className="bg-secondary rounded-lg p-space12 space-y-space16 ">
        <article className="flex justify-between items-center gap-space8 border-b border-color pb-space12">
          <Text
            title={`Payment: ৳ ${currentPurchase?.total_price}`}
            className="text-lg font-semibold"
          />

          <article className="flex gap-space8">
            {currentPurchase?.payment_status === PAYMENT_STATUS.unpaid ? (
              <Text
                title="Due"
                className="text-sm !text-white uppercase px-space8 py-space4 rounded-md bg-error-100"
              />
            ) : (
              <Text
                title="Cash"
                className="text-sm !text-white uppercase px-space8 py-space4 rounded-md bg-blue-500"
              />
            )}
          </article>
        </article>

        <article className="flex justify-between items-center gap-space8">
          <Text title="Total" />
          <Text title={`৳ ${total ?? 0}`} />
        </article>
        <article className="flex justify-between items-center gap-space8">
          <Text title="Delivery Charge" />
          <Text title={`৳ ${currentPurchase?.extra_charge ?? 0}`} />
        </article>
        <article className="flex justify-between items-center gap-space8">
          <Text title="Discount" />
          {currentPurchase?.discount_type === 'PERCENT' ? (
            <Text title={`${currentPurchase?.discount ?? 0}%`} />
          ) : (
            <Text title={`৳ ${currentPurchase?.discount ?? 0}`} />
          )}
        </article>
        {/* <article className="flex justify-between items-center gap-space8">
          <Text title="Due" />
          <Text title="৳ 1180" />
        </article> */}

        <article className="flex justify-between items-center gap-space8 border-t border-color pt-space12">
          <Text title="Grand Total" className="text-lg font-semibold" />
          <Text
            title={`৳ ${currentPurchase?.total_price}`}
            className="text-lg font-semibold"
          />
        </article>
      </article>
      <section>
        {/* <div
          onClick={() => setAccordion(!accordion)}
          className="flex justify-between items-center gap-space8 py-space8"
        >
          <Text title="Sold Product" className="text-lg font-medium" />

          <ExpandMoreIcon />
        </div> */}
        <Text title="Buy Products" className="text-lg font-medium" />
        <div className={`grid 'grid-rows-[1fr]'`}>
          {purchaseProducts?.items &&
            purchaseProducts?.items.map((product) => (
              <ProductListCard key={product.unique_id} product={product} />
            ))}
        </div>
      </section>
      {currentPurchase?.note && (
        <article className="space-y-space8">
          <Text title="Notes" />

          <Text
            title={currentPurchase.note}
            variant="secondary"
            className="text-lg"
          />
        </article>
      )}
      {/* <div className="grid grid-cols-2 gap-space16">
        <Button className="w-full h-[9.6rem] flex-col" variant="secondary">
          <Image
            src="/images/print_receipt.svg"
            alt=""
            height={36}
            width={36}
          />

          <Text title="Print Receipt" className="text-sm font-medium" />
        </Button>
        <Button className="w-full h-[9.6rem] flex-col" variant="secondary">
          <Image
            src="/images/share_receipt.svg"
            alt=""
            height={36}
            width={36}
          />

          <Text title="Share receipt " className="text-sm font-medium" />
        </Button>
      </div> */}
      <DrawerFooter>
        <Button
          className="w-full"
          variant={'danger'}
          onClick={() =>
            handleDialogOpen({
              open: true,
              header: PurchaseEnum.TRANSACTION_DELETE,
            })
          }
        >
          <DeleteIcon color="#fff" /> Delete
        </Button>
        {/* <Button
          className="w-full"
          onClick={() =>
            handleDrawerOpen({
              open: true,
              header: PurchaseEnum.TRANSACTION_EDIT,
            })
          }
        >
          <EditIcon /> Edit
        </Button> */}
      </DrawerFooter>
    </div>
  );
};

export default TransactionDetails;
