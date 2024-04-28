import React from 'react';
import SellDrawers from '@/components/sell/drawers';
import SellHeader from '@/components/sell/SellHeader';
import { LeftSection } from '@/components/sell/LeftSection';
import { RightSection } from '@/components/sell/RightSection';
import SellDialogs from '@/components/sell/dialogs';
import { cookies } from 'next/headers';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { IUserResponse } from '@/types/contact/partyResponse';

const SellPage = async () => {
  const shopId = cookies().get('shopId')?.value;

  const allProductsResponse = await getShopsProducts({});
  const allCustomers = await getAllCustomer(Number(shopId));
  return (
    <>
      <div className="space-y-space16 h-full">
        <SellHeader />

        <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-6.4rem)]">
          <LeftSection productData={allProductsResponse?.data} />
          <RightSection />
        </div>
      </div>

      <SellDrawers customers={allCustomers?.data as IUserResponse[]} />
      <SellDialogs />
    </>
  );
};

export default SellPage;
