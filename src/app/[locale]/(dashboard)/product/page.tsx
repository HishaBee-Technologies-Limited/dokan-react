import React from 'react';
import { ProductDialogs } from '@/components/product/dialogs';
import { ProductDrawers } from '@/components/product/drawers';
import { ProductTable } from '@/components/product/ProductTable';
import { ProductHeader } from '@/components/product/ProductHeader';
import { ProductQueries } from '@/components/product/ProductQueries';
import { getShopsProducts } from '@/actions/product/getShopProducts';
import { getSingleProduct } from '@/actions/product/getSingleProduct';
import { IProduct, IProductPayload, IUnits } from '@/types/product';
import { getUnits } from '@/actions/product/getUnits';
import { auth } from '@/auth';
import { getCategories } from '@/actions/product/getCategories';

type IPageProps = {
  params: { locale: string };
  searchParams: any;
};
const ProductPage = async ({
  params: { locale },
  searchParams,
}: IPageProps) => {
  const session = await auth();

  const productUnits = await getUnits();
  const allProductsResponse = await getShopsProducts();
  const categories = await getCategories(session?.user?.id as string);

  const productCategories = categories?.data.data.data;

  const productId = searchParams.product;
  let singleProduct;
  if (productId) {
    singleProduct = await getSingleProduct(productId);
  }

  console.log('User-----', session?.user?.id);
  return (
    <>
      <div className="space-y-space16">
        <ProductHeader />
        {/* <ProductQueries /> */}
        <ProductTable productData={allProductsResponse?.data} />
      </div>

      <ProductDrawers
        product={singleProduct?.data.data as IProduct}
        units={productUnits?.data.data as IUnits[]}
        {...{ productCategories }}
      />
      <ProductDialogs product={singleProduct?.data.data as IProduct} />
    </>
  );
};

export default ProductPage;
