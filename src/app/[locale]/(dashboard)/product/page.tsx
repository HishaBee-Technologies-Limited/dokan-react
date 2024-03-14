import React from "react";
import { ProductDialogs } from "@/components/product/dialogs";
import { ProductDrawers } from "@/components/product/drawers";
import { ProductTable } from "@/components/product/ProductTable";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductQueries } from "@/components/product/ProductQueries";
import { getShopsProducts } from "@/actions/product/getShopProducts";

const ProductPage = async () => {
  const res = await getShopsProducts();

  console.log(res);
  return (
    <>
      <div className="space-y-space16">
        <ProductHeader />
        {/* <ProductQueries /> */}
        <ProductTable productData={res?.data} />
      </div>

      <ProductDrawers />
      <ProductDialogs />
    </>
  );
};

export default ProductPage;
