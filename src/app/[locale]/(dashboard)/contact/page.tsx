import React, { Suspense } from 'react';
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
import { IUserResponse } from '@/types/contact/partyResponse';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

//TODO: need refactoring and BE refactoring in this component
const ContactPage = async ({
  params: { locale },
  searchParams,
}: IContactProps) => {
  const shopId = cookies().get('shopId')?.value;
  let customerDetails: IUserResponse | undefined;
  let supplierDetails: IUserResponse | undefined;
  let employeeDetails: IUserResponse | undefined;

  const tab = searchParams.tab?.split('-')[0];
  if (tab === ContactType.CUSTOMER && searchParams.active_user) {
    const res = await getSingleCustomer(Number(searchParams.active_user));
    customerDetails = res?.data;
  }
  if (tab === ContactType.SUPPLIER && searchParams.active_user) {
    const res = await getSingleSupplier(Number(searchParams.active_user));

    supplierDetails = res?.data;
  }
  if (tab === ContactType.EMPLOYEE && searchParams.active_user) {
    const res = await getSingleEmployee(Number(searchParams.active_user));
    employeeDetails = res?.data;
  }

  const userDetails =
    tab === ContactType.CUSTOMER
      ? customerDetails
      : tab === ContactType.SUPPLIER
        ? supplierDetails
        : employeeDetails;

  return (
    <>
      <div className="space-y-space16 h-full">
        <ContactHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection />
          <Suspense fallback={<div>Loading...</div>}>
            <RightSection
              userDetails={userDetails}
              // transactions={transactionsPerUser}
            />
          </Suspense>
        </Card>
      </div>

      <ContactDrawers />
    </>
  );
};

export default ContactPage;
