import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AddNewUser from '@/components/contact/drawers/AddNewUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

const AddNewMember = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, setQueryString } = useCreateQueryString();

  const activeTab = getQueryString('tab') ?? '';

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) =>
        router.push(`${pathname}?${setQueryString('tab', value)}`)
      }
    >
      <TabsList className="grid grid-cols-3 mb-space16">
        <TabsTrigger value="Customer">Customer</TabsTrigger>
        <TabsTrigger value="Supplier">Supplier</TabsTrigger>
        <TabsTrigger value="Employee">Employee</TabsTrigger>
      </TabsList>

      <AddNewUser />
    </Tabs>
  );
};

export default AddNewMember;
