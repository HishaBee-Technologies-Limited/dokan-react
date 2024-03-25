import React from 'react';
import { cookies } from 'next/headers';
import Card from '@/components/common/Card';
import { ContactType } from '@/enum/contact';
import ContactDrawers from '@/components/contact/drawers';
import ContactHeader from '@/components/contact/ContactHeader';
import { LeftSection } from '@/components/contact/LeftSection';
import { RightSection } from '@/components/contact/RightSection';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import { getSingleCustomer } from '@/actions/contacts/getSingleCustomer';
import { getSingleEmployee } from '@/actions/contacts/getSingleEmployee';
import { getSingleSupplier } from '@/actions/contacts/getSingleSupplier';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const ContactPage = async ({
  params: { locale },
  searchParams,
}: IContactProps) => {
  const shopId = cookies().get('shopId')?.value;

  const tab = searchParams.tab?.split('-')[0];
  const userID = searchParams.active_user?.split('-')[0];

  const customers = await getAllCustomer(Number(shopId));
  const suppliers = await getAllSupplier(Number(shopId));
  const employees = await getAllEmployee(Number(shopId));
  const customerDetails = await getSingleCustomer(Number(userID));
  const supplierDetails = await getSingleSupplier(Number(userID));
  const employeeDetails = await getSingleEmployee(Number(userID));

  const userList =
    tab === ContactType.CUSTOMER
      ? customers?.data
      : tab === ContactType.SUPPLIER
        ? suppliers?.data
        : employees?.data;
  const userDetails =
    tab === ContactType.CUSTOMER
      ? customerDetails?.data
      : tab === ContactType.SUPPLIER
        ? supplierDetails?.data
        : employeeDetails?.data;

  return (
    <>
      <div className="space-y-space16 h-full">
        <ContactHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection userList={userList} />
          <RightSection userDetails={userDetails} />
        </Card>
      </div>

      <ContactDrawers />
    </>
  );
};

export default ContactPage;
