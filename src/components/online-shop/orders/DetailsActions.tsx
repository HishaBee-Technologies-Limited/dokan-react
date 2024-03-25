'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const DetailsActions = () => {
  const [accept, setAccept] = useState<boolean>(false);
  return (
    <div className="flex justify-end gap-space12 flex-wrap pb-space12">
      <Button variant={'danger'} onClick={() => setAccept(false)}>
        Reject
      </Button>
      <Button
        variant={'success'}
        onClick={() => setAccept(true)}
        className={`${accept ? 'hidden' : 'flex'}`}
      >
        Accept
      </Button>
      <div className={`gap-space12 ${accept ? 'flex' : 'hidden'}`}>
        <RadioGroup
          name="status"
          onValueChange={(e) => {}}
          defaultValue={'pending'}
          className="flex gap-space8"
        >
          <Label
            htmlFor="pending"
            className="flex items-center gap-space8 bg-success-100 px-space16 rounded-lg font-semibold text-md"
          >
            <RadioGroupItem id="pending" value={'pending'} />
            Pending
          </Label>

          <Label
            htmlFor="processing"
            className="flex items-center gap-space8 bg-primary-30 px-space16 rounded-lg font-semibold text-md"
          >
            <RadioGroupItem id="processing" value={'processing'} />
            Processing
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DetailsActions;
