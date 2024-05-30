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
import { getSellHistory } from '@/actions/sell/getSellHistory';
import { IUserResponse } from '@/types/contact/partyResponse';
import { IProductSellPayload } from '@/types/sell';
import { getPurchaseHistory } from '@/actions/purchase/getPurchaseHistory';
import {
  IProductPurchasePayload,
  IPurchaseHistoryResponse,
} from '@/types/purchase';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const ContactPage = async ({
  params: { locale },
  searchParams,
}: IContactProps) => {
  const shopId = cookies().get('shopId')?.value;
  let customerDetails: IUserResponse | undefined;
  let supplierDetails: IUserResponse | undefined;
  let employeeDetails: IUserResponse | undefined;
  let transactionsPerUser: any;
  let purchasePerSup: IPurchaseHistoryResponse[] | undefined;

  const tab = searchParams.tab?.split('-')[0];
  const userID = searchParams.active_user?.split('-')[0];

  const transactions = await getSellHistory();

  const customers = await getAllCustomer(Number(shopId));
  const suppliers = await getAllSupplier(Number(shopId));
  const employees = await getAllEmployee(Number(shopId));
  if (tab === ContactType.CUSTOMER && searchParams.active_user) {
    const res = await getSingleCustomer(Number(searchParams.active_user));
    customerDetails = res?.data;
    transactionsPerUser = transactions?.data?.filter(
      (item) => item.customer_mobile === customerDetails?.mobile
    );
  }
  if (tab === ContactType.SUPPLIER && searchParams.active_user) {
    const res = await getSingleSupplier(Number(searchParams.active_user));
    const purchase = await getPurchaseHistory();

    supplierDetails = res?.data;
    transactionsPerUser = purchase?.data?.filter(
      (item) => item.supplier_mobile === supplierDetails?.mobile
    );
  }
  if (tab === ContactType.EMPLOYEE && searchParams.active_user) {
    const res = await getSingleEmployee(Number(searchParams.active_user));
    employeeDetails = res?.data;
    transactionsPerUser = transactions?.data?.filter(
      (item) => item.employee_mobile === employeeDetails?.mobile
    );
  }

  // if (searchParams.active_user) {
  //   supplierDetails = await getSingleSupplier(Number(searchParams.active_user));
  //   employeeDetails = await getSingleEmployee(Number(searchParams.active_user));
  // }
  const userList =
    tab === ContactType.CUSTOMER
      ? customers?.data
      : tab === ContactType.SUPPLIER
        ? suppliers?.data
        : employees?.data;
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
          <LeftSection userList={userList} />
          <Suspense fallback={<div>Loading...</div>}>
            <RightSection
              userDetails={userDetails}
              transactions={transactionsPerUser}
            />
          </Suspense>
        </Card>
      </div>

      <ContactDrawers />
    </>
  );
};

export default ContactPage;
