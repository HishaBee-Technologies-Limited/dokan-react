import React from "react";
import { ProductDialogs } from "@/components/product/dialogs";
import { ProductDrawers } from "@/components/product/drawers";
import { ProductTable } from "@/components/product/ProductTable";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductQueries } from "@/components/product/ProductQueries";
import { getShopsProducts } from "@/actions/product/getShopProducts";
import { getSingleProduct } from "@/actions/product/getSingleProduct";
import { IProduct } from "@/types/product";

type IPageProps = {
  params: { locale: string };
  searchParams: any;
};
const ProductPage = async ({
  params: { locale },
  searchParams,
}: IPageProps) => {
  const allProductsResponse = await getShopsProducts();
  const productId = searchParams.product;
  let singleProduct;

  if (productId) {
    singleProduct = await getSingleProduct(productId);
  }

  return (
    <>
      <div className="space-y-space16">
        <ProductHeader />
        {/* <ProductQueries /> */}
        <ProductTable productData={allProductsResponse?.data} />
      </div>

      <ProductDrawers />
      <ProductDialogs product={singleProduct?.data.data as IProduct} />
    </>
  );
};

export default ProductPage;
