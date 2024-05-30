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
import { QueryParamsDef } from '@/types/orders';
import { cookies } from 'next/headers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ProductPagePropsDef = {
  searchParams: QueryParamsDef & {
    product?: string;
  };
};

const ProductPage = async ({ searchParams }: ProductPagePropsDef) => {
  const session = await auth();
  const shop = cookies().get('shop')?.value as string;
  console.log('shop', JSON.parse(shop).subscription);
  const hasAccess = ['ADVANCED', 'STANDARD', 'TRAIL'].includes(
    JSON.parse(shop).subscription
  );
  shop &&
    console.log(
      'dddd',
      ['ADVANCED', 'STANDARD', 'TRAIL'].includes(JSON.parse(shop).subscription)
    );
  const productUnits = await getUnits();
  const allProductsResponse = await getShopsProducts({ params: searchParams });
  const categories = await getCategories(session?.user?.id as string);

  const productCategories = categories?.data;

  const productId = searchParams.product;
  let singleProduct;
  if (productId) {
    singleProduct = await getSingleProduct(productId);
  }

  return (
    <>
      {hasAccess ? (
        <>
          <div className="space-y-space16">
            <ProductHeader />
            <ProductQueries />
            <ProductTable productData={allProductsResponse?.data} />
          </div>

          <ProductDrawers
            product={singleProduct?.data as IProduct}
            units={productUnits?.data as IUnits[]}
            {...{ productCategories }}
          />
          <ProductDialogs product={singleProduct?.data as IProduct} />
        </>
      ) : (
        <div className="flex items-center justify-center h-[80%]">
          <Card className="max-w-md p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Subscription Expired
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                Your subscription has expired. Please renew your subscription to
                continue using our services.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <Button className="w-full">Renew Subscription</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductPage;
