import React from 'react';
import PurchaseDialogs from '@/components/purchase/dialogs';
import PurchaseDrawers from '@/components/purchase/drawers';
import { LeftSection } from '@/components/purchase/LeftSection';
import { RightSection } from '@/components/purchase/RightSection';
import PurchaseHeader from '@/components/purchase/PurchaseHeader';
import { getShopsProducts } from '@/actions/product/getShopProducts';

const PurchasePage = async () => {
  const allProductsResponse = await getShopsProducts();

  return (
    <>
      <div className="space-y-space16 h-full">
        <PurchaseHeader />

        <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-6.4rem)]">
          <LeftSection productData={allProductsResponse?.data} />
          <RightSection />
        </div>
      </div>

      <PurchaseDrawers />
      <PurchaseDialogs />
    </>
  );
};

export default PurchasePage;
