'use client';
import React, { useEffect, useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { CloseIcon, SaveIcon } from '@/components/common/icons';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICommonGetResponse } from '@/types/common';
import { IProductPayload } from '@/types/product';
import ProductPagination from '../product/ProductPagination';
import { StockQueries } from './StockQueries';
import { Package } from 'lucide-react';
import { format } from 'util';
import { createProductOrUpdate } from '@/actions/product/createProductOrUpdate';

const UpdateStockTable = ({
  products,
}: {
  products: ICommonGetResponse<IProductPayload>;
}) => {
  const [stockValue, setStockValue] = useState<number>(0);
  const [updatedProducts, setUpdatedProducts] = useState<IProductPayload[]>();
  const [changedProducts, setChangedProducts] = useState<IProductPayload[]>([]);

  useEffect(() => {
    setUpdatedProducts(products.data);
  }, []);

  console.log(changedProducts);

  const saveChangedStock = async () => {
    changedProducts.map(async (product) => {
      const res = await createProductOrUpdate({
        stock: product.stock,
        unique_id: product?.unique_id,
        name: product.name,
        selling_price: product.selling_price,
        ...(product.version && { version: product.version + 1 }),
        updated_at: format(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
        created_at: product?.created_at,
        cost_price: product.cost_price!,
        sell_online: product.sell_online,
        gallery: product.gallery,
        image_url: product.image_url,
        sub_category: Number(product.sub_category),
        wholesale_amount: Number(product.wholesale_amount),
        wholesale_price: Number(product.wholesale_price),
        stock_alert: Number(product.stock_alert),
        warranty: Number(product.warranty),
        warranty_type: product.warranty_type,
        discount: product.discount,
        discount_type: product.discount_type,
        // description: ,
        vat_applicable: product.vat_applicable,
        vat_percent: Number(product.vat_percent),
        unit: Number(product.unit),
      });
      console.log(res);
    });
  };

  return (
    <div className="w-full relative space-y-space8">
      <div className="flex justify-between">
        <StockQueries />

        <div className="flex justify-end gap-space16">
          <Button
            variant={'secondary'}
            className="sm:px-space40"
            onClick={() => setUpdatedProducts(products.data)}
          >
            <CloseIcon />
            Cancel
          </Button>
          <Button
            className="sm:px-space40"
            onClick={() => saveChangedStock()}
            disabled={!changedProducts.length}
          >
            <SaveIcon />
            Save
          </Button>
        </div>
      </div>

      <ScrollArea className="pb-space8">
        <Table wrapperClass="rounded-md border border-color min-w-[80rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="">Product name</TableHead>
              <TableHead>Current stock</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Current stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {updatedProducts?.map((product, i) => (
              <TableRow key={product.id}>
                <TableCell className="w-5/12">
                  <div className="flex items-center gap-space8">
                    {!!product?.image_url && product?.image_url !== 'null' ? (
                      <Image
                        src={product?.image_url}
                        height={40}
                        width={40}
                        alt=""
                      />
                    ) : (
                      <Package size={40} />
                    )}

                    <Text title={product.name} className="text-sm" />
                  </div>
                </TableCell>
                <TableCell className="w-2/12">{product.stock}</TableCell>
                <TableCell className="w-2/12">{product.cost_price}</TableCell>
                <TableCell className="w-3/12">
                  <div className="flex items-center gap-space12">
                    <Button
                      size={'sm'}
                      variant={'danger'}
                      className="!font-bold !text-xl"
                      onClick={() => {
                        const changedProduct = updatedProducts.map((prod) => {
                          if (prod.id === product.id) {
                            return {
                              ...prod,
                              stock: Number(prod.stock) - 1,
                            };
                          } else {
                            return prod;
                          }
                        });
                        setUpdatedProducts(changedProduct);

                        const isStockEqual =
                          products.data.find((prod) => prod.id === product.id)
                            ?.stock ===
                          changedProduct.find((prod) => prod.id === product.id)
                            ?.stock;
                        if (!isStockEqual) {
                          const index = changedProducts.findIndex(
                            (prod) => prod.id === product.id
                          );
                          if (index === -1) {
                            setChangedProducts((prev) => [
                              ...prev,
                              ...changedProduct.filter(
                                (prod) => prod.id === product.id
                              ),
                            ]);
                          } else {
                            setChangedProducts((prev) => [
                              ...changedProducts.map((prod) => {
                                if (prod.id === product.id) {
                                  return {
                                    ...prod,
                                    stock: Number(prod.stock) - 1,
                                  };
                                } else {
                                  return prod;
                                }
                              }),
                            ]);
                          }
                        }
                      }}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={Number(product.stock)}
                      onChange={(e) => {
                        const changedProduct = updatedProducts.map((prod) => {
                          if (prod.id === product.id) {
                            return {
                              ...prod,
                              stock: Number(e.target.value),
                            };
                          } else {
                            return prod;
                          }

                          setUpdatedProducts(changedProduct);
                        });
                      }}
                      className=" h-[3.6rem] border-b-[.4rem] bg-transparent border-[#0C66E4] text-[#0C66E4] text-md font-medium py-space12 min-w-[10rem] max-w-[14rem] text-center focus:outline-none"
                    />
                    <Button
                      size={'sm'}
                      variant={'success'}
                      className="!font-bold !text-xl"
                      onClick={() => {
                        const changedProduct = updatedProducts.map((prod) => {
                          if (prod.id === product.id) {
                            return {
                              ...prod,
                              stock: Number(prod.stock) + 1,
                            };
                          } else {
                            return prod;
                          }
                        });
                        const isStockEqual =
                          products.data.find((prod) => prod.id === product.id)
                            ?.stock ===
                          changedProduct.find((prod) => prod.id === product.id)
                            ?.stock;

                        if (!isStockEqual) {
                          const index = changedProducts.findIndex(
                            (prod) => prod.id === product.id
                          );
                          if (index === -1) {
                            setChangedProducts((prev) => [
                              ...prev,
                              ...changedProduct.filter(
                                (prod) => prod.id === product.id
                              ),
                            ]);
                          } else {
                            setChangedProducts((prev) => [
                              ...changedProducts.map((prod) => {
                                if (prod.id === product.id) {
                                  return {
                                    ...prod,
                                    stock: Number(prod.stock) + 1,
                                  };
                                } else {
                                  return prod;
                                }
                              }),
                            ]);
                          }
                        }
                        setUpdatedProducts(changedProduct);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Showing 20 of {products.total} Transactions
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <ScrollBar orientation="horizontal" />
        <div className="my-10">
          <ProductPagination
            pageCount={Math.ceil(products?.total / products?.per_page)}
            currentPage={products?.current_page ?? 0}
            lastPage={products?.last_page ?? 0}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UpdateStockTable;
