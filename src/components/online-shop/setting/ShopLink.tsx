import React from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';

const ShopLink = () => {
  return (
    <div className="w-full space-y-space16">
      <Card className="p-space12 space-y-space12 pb-space32">
        <Text title="Your online shop link" className="font-semibold" />

        <Text className="font-medium text-sm" variant="secondary">
          Your shop link
          <span className="text-blue-500 pl-space8">
            (https://hishabee.market/shop/abc-enterprise)
          </span>
        </Text>

        <Input placeholder="abc-enterprise" />
      </Card>

      <div className="flex justify-end gap-space16">
        <Button variant={'secondary'}>Cancel</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
};

export default ShopLink;
