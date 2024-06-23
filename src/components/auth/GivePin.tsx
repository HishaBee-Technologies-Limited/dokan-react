'use client';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { authenticate } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PasswordInput } from '@/components/password-input';
import { toast } from 'sonner';

const GivePin = ({ mobile_number }: { mobile_number: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState(false);

  const login = async () => {
    setLoading(true);
    if (pin.length) {
      const res = await authenticate(undefined, { mobile_number, pin });
      if (res === 'Something went wrong.') {
        toast.error('You phone or pin is incorrect');
      } else {
        router.push('/shop');
      }
      setLoading(false);
    } else {
      setLoading(false);

      setError(true);
    }
  };

  return (
    <div>
      <Text
        title="Welcome Back to Hishabee!"
        className="text-[2.8rem] font-semibold mb-space16"
      />

      <div className="space-y-space8 mb-space24">
        <Text title="Enter PIN Number" />

        <div className="relative">
          <PasswordInput
            id="current_password"
            value={pin}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const result = e.target?.value.replace(/\D/g, '');
              setPin(result);
            }}
            autoComplete="current-password"
          />
          {error && <Text title="Please Enter Your Pin" variant="error" />}
        </div>
      </div>

      <Button type="submit" onClick={login} className="w-full">
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Confirm
      </Button>
    </div>
  );
};

export default GivePin;
