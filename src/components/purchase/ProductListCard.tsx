import React from 'react';
import { Image } from '@/components/common/Image';
import { IProducts } from '@/types/purchase';
import { Text } from '@/components/common/text';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Package } from 'lucide-react';
function ProductListCard({ product }: { product: IProducts }) {
  console.log(product);
  return (
    <div key={product.unique_id} className="rounded p-space8">
      <div className="flex items-center gap-space8">
        {!!product.product?.image_url &&
        product.product?.image_url !== 'null' ? (
          <Image
            src={product.product?.image_url}
            height={32}
            width={32}
            alt=""
          />
        ) : (
          <Package />
        )}

        <Text title={product.name} />
      </div>

      <article className="flex flex-wrap justify-between gap-space8 pl-space40">
        <Text>
          Quantity: <span className="font-semibold">{product.quantity}</span>
        </Text>
        <Text>
          Unit Price:{' '}
          <span className="font-semibold">{product?.unit_cost}</span>
        </Text>
        <Text>
          Total:{' '}
          <span className="font-semibold">
            {product?.unit_cost * product?.quantity!}
          </span>
        </Text>
      </article>
    </div>
  );
}

export default ProductListCard;
