import React from 'react';
import PurchaseDialogs from '@/components/purchase/dialogs';
import PurchaseDrawers from '@/components/purchase/drawers';
import { LeftSection } from '@/components/purchase/LeftSection';
import { RightSection } from '@/components/purchase/RightSection';
import PurchaseHeader from '@/components/purchase/PurchaseHeader';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { cookies } from 'next/headers';
import { IUserResponse } from '@/types/contact/partyResponse';
import { getAllDue } from '@/actions/due/getAllDue';

const PurchasePage = async () => {
  const shopId = cookies().get('shopId')?.value;

  const allProductsResponse = await getShopsProducts({});
  const allSupplier = await getAllSupplier(Number(shopId));

  const dueList = await getAllDue();

  const supplierDueList = dueList?.data?.data.filter(
    (item) => item.contact_type === 'SUPPLIER'
  );

  return (
    <>
      <div className="space-y-space16 h-full">
        <PurchaseHeader />

        <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-6.4rem)]">
          <LeftSection productData={allProductsResponse?.data} />
          <RightSection />
        </div>
      </div>

      <PurchaseDrawers
        suppliers={allSupplier?.data as IUserResponse[]}
        dueList={supplierDueList!}
      />
      <PurchaseDialogs />
    </>
  );
};

export default PurchasePage;
