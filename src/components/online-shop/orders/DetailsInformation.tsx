'use client';
import React from 'react';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';
import FallBackImage from '@/components/common/FallBackImage';
import { orderTypeWiseStyled } from '@/components/online-shop/orders/orderTypeWiseStyled';

const DetailsInformation = ({ id }: { id: string }) => {
  return (
    <div className="space-y-space12">
      <div className="space-y-space12">
        <Text
          title="Customer Info"
          className="font-semibold text-lg border-b border-color pb-space8"
        />

        <Card className="p-space12 space-y-space12">
          <Text title="Delivery address" className="font-semibold" />

          <Text
            title={`Address: Gazipur Sadar, Dhaka, Dhaka 1200`}
            variant="secondary"
          />

          <div className="flex items-center gap-space12">
            <Text title="Customer:" variant="secondary" />

            <div className="max-w-max py-space6 pl-space6 pr-space8 rounded-full flex items-center background border border-color">
              <FallBackImage
                src=""
                fallback="M"
                className="h-space24 w-space24 mr-space8"
              />
              <span> মতিউর রহমান</span>
            </div>
          </div>

          <Text title={`Mobile: 012345678900`} variant="secondary" />
          <Text title={`Mail: mail@mail.com`} variant="secondary" />
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 gap-space16">
        <div className="space-y-space12">
          <Text
            title="Order info"
            className="font-semibold text-lg border-b border-color pb-space8"
          />

          <Card className="p-space12 space-y-space12">
            <div className="flex items-center justify-between gap-space12">
              <Text title="Order Status:" className="font-semibold" />

              <Text
                title={orderTypeWiseStyled(id).title()}
                variant={orderTypeWiseStyled(id).textVariant()}
                className={`text-xs font-medium rounded-md px-space8 py-space4 max-w-max 
                            ${orderTypeWiseStyled(id).textBackground()}`}
              />
            </div>
            <Text
              title={`Order no:  #12120102-123456`}
              className="font-semibold"
            />

            <Text
              title={`Delivery type:  Cash on Delivery`}
              variant="secondary"
            />

            <Text title={`Date:  2/3/2023  |  12:30pm `} variant="secondary" />
          </Card>
        </div>

        <div className="space-y-space12">
          <Text
            title="Charges"
            className="font-semibold text-lg border-b border-color pb-space8"
          />

          <Card className="p-space12 space-y-space12">
            <Text title={`Total Price:  ৳ ১২,০০০`} className="font-semibold" />
            <Text
              title={`Discount:  ৳ ১২,০০০`}
              className="font-semibold"
              variant="error"
            />
            <Text title={`Total:  ৳ ১২,০০০`} className="font-semibold" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsInformation;
