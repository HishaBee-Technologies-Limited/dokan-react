import { SellEnum } from '@/enum/sell';
import React, { useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { useSellStore } from '@/stores/useSellStore';
import { DrawerFooter } from '@/components/common/Drawer';
import FallBackImage from '@/components/common/FallBackImage';
import WrapperOddList from '@/components/common/WrapperOddList';
import {
  DeleteIcon,
  EditIcon,
  ExpandMoreIcon,
} from '@/components/common/icons';

const productList = [
  {
    id: 1,
    img: '',
    sell: '5',
    total: '10',
    unit_price: '10',
    name: 'কোকাকোলা ৬০০ মিলি',
  },
  {
    id: 2,
    img: '',
    sell: '5',
    total: '10',
    unit_price: '10',
    name: 'কোকাকোলা ৬০০ মিলি',
  },
  {
    id: 3,
    img: '',
    sell: '5',
    total: '10',
    unit_price: '10',
    name: 'কোকাকোলা ৬০০ মিলি',
  },
];

const TransactionDetails = () => {
  const [accordion, setAccordion] = useState<boolean>(false);
  const transactionDetails = useSellStore((state) => state.sellDetails);

  const handleDialogOpen = useSellStore((state) => state.setSellDialogState);
  const handleDrawerOpen = useSellStore((state) => state.setSellDrawerState);

  const handleEditClick = () => {
    if (transactionDetails.transactionType === 'quick sell') {
      handleDrawerOpen({ open: true, header: SellEnum.QUICK_SELL_EDIT });
    } else {
      handleDrawerOpen({ open: true, header: SellEnum.TRANSACTION_EDIT });
    }
  };

  return (
    <div className="space-y-space12">
      <section className="bg-secondary rounded-lg p-space12 space-y-space16 ">
        <Text title="Total Item: 03" className="font-semibold" />

        <div className="flex items-center gap-space8">
          <Text title="Customer" />
          <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
            <FallBackImage
              src=""
              fallback="M"
              className="w-space24 h-space24 mr-space8"
            />
            <span> মতিউর রহমান</span>
          </div>
        </div>
        <div className="flex items-center gap-space8">
          <Text title="Employee" />
          <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center bg-white dark:bg-primary-90 border border-color">
            <FallBackImage
              src=""
              fallback="M"
              className="w-space24 h-space24 mr-space8"
            />
            <span> মতি ভাই</span>
          </div>
        </div>

        <Text
          title={`Transaction date  2/3/2023  |  12:30pm `}
          className="font-semibold"
        />
      </section>

      <article className="bg-secondary rounded-lg p-space12 space-y-space16 ">
        <article className="flex justify-between items-center gap-space8 border-b border-color pb-space12">
          <Text title="Payment: ৳ 1,200" className="text-lg font-semibold" />

          <article className="flex gap-space8">
            <Text
              title="Due"
              className="text-sm !text-white uppercase px-space8 py-space4 rounded-md bg-error-100"
            />
            <Text
              title="Cash"
              className="text-sm !text-white uppercase px-space8 py-space4 rounded-md bg-blue-500"
            />
          </article>
        </article>

        <article className="flex justify-between items-center gap-space8">
          <Text title="Total" />
          <Text title="৳ 1180" />
        </article>
        <article className="flex justify-between items-center gap-space8">
          <Text title="Delivery Charge" />
          <Text title="৳ 1180" />
        </article>
        <article className="flex justify-between items-center gap-space8">
          <Text title="Discount" />
          <Text title="৳ 1180" />
        </article>
        <article className="flex justify-between items-center gap-space8">
          <Text title="Due" />
          <Text title="৳ 1180" />
        </article>

        <article className="flex justify-between items-center gap-space8 border-t border-color pt-space12">
          <Text title="Grand Total" className="text-lg font-semibold" />
          <Text title="৳ 1260" className="text-lg font-semibold" />
        </article>
      </article>

      <section>
        <div
          onClick={() => setAccordion(!accordion)}
          className="flex justify-between items-center gap-space8 py-space8"
        >
          <Text title="Sold Product" className="text-lg font-medium" />

          <ExpandMoreIcon />
        </div>

        <div
          className={`grid ${accordion ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-500`}
        >
          <WrapperOddList className={`overflow-hidden`}>
            {productList.map((product) => (
              <div key={product.id} className="rounded p-space8">
                <div className="flex items-center gap-space8">
                  <Image src={product.img} height={32} width={32} alt="" />

                  <Text title={product.name} />
                </div>

                <article className="flex flex-wrap justify-between gap-space8 pl-space40">
                  <Text>
                    Sell: <span className="font-semibold">5</span>
                  </Text>
                  <Text>
                    Unit Price: <span className="font-semibold">5</span>
                  </Text>
                  <Text>
                    Total: <span className="font-semibold">5</span>
                  </Text>
                </article>
              </div>
            ))}
          </WrapperOddList>
        </div>
      </section>

      <article className="space-y-space8">
        <Text title="Notes" />

        <Text
          title="This is a sample note for sample things"
          variant="secondary"
          className="text-lg"
        />
      </article>

      <div className="grid grid-cols-2 gap-space16">
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
      </div>

      <DrawerFooter>
        <Button
          className="w-full"
          variant={'danger'}
          onClick={() =>
            handleDialogOpen({
              open: true,
              header: SellEnum.TRANSACTION_DELETE,
            })
          }
        >
          <DeleteIcon color="#fff" /> Delete
        </Button>
        <Button onClick={handleEditClick} className="w-full">
          <EditIcon /> Edit
        </Button>
      </DrawerFooter>
    </div>
  );
};

export default TransactionDetails;
