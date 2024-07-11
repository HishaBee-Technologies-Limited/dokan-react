import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Image } from '@/components/common/Image';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { PhoneIcon } from '@heroicons/react/24/solid';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Separator } from '../ui/separator';
import { IProductPurchase } from '../sell/ProductFiledRow';
import { format } from 'date-fns';
import { ToWords } from 'to-words';

const toWords = new ToWords({
  localeCode: 'en-BD',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: 'Taka',
      plural: 'Taka',
      symbol: 'BDT',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});
const scale = 4; // Adjust scale for better quality
const opt = {
  scale: scale,
  useCORS: true,
};

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

const PDFGenerator = ({
  calculatedProducts,
  shop,
  due,
}: {
  calculatedProducts: any;
  shop: any;
  due: any;
}) => {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const shopInfo = JSON.parse(shop);

  const generatePDF = () => {
    if (!pdfRef.current) return;

    const input = pdfRef.current;
    html2canvas(input, opt).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-stone-50">
        <div ref={pdfRef} className="p-4">
          <div className="flex justify-between  ">
            <div className="flex items-center gap-2 self-start">
              <div className="mt-2">
                {shopInfo.logo_url ? (
                  <Image
                    src={shopInfo.logo_url}
                    height={40}
                    width={40}
                    alt="ll"
                    className="w-10 h-10 "
                  />
                ) : (
                  <div className="bg-secondary-50 w-8 h-8  flex items-center justify-center text-[7px] font-bold">
                    <Text
                      className="mb-4"
                      title={shopInfo.name[0].toUpperCase()}
                    />
                  </div>
                )}
              </div>
              <div className="mb-2">
                <h1 className="text-[9px] font-bold">{shopInfo.name}</h1>
                {/* <p className="w-32">123 Main St, Anytown USA 12345</p> */}
                <Text title={shopInfo.address} className="text-[6px]" />
                <p className=" flex items-center flex-row  gap-1">
                  {/* <PhoneIcon className="w-3 h-3 text-blue-400" /> */}
                  <Text
                    title={shopInfo.number}
                    className="text-[6px] mb-[.5 rem]"
                  />
                </p>
              </div>
            </div>
            <div className=" self-start">
              <div>
                {/* <p className="w-32">123 Main St, Anytown USA 12345</p> */}
                <Text title="Invoice To" className="text-[8px] font-bold" />

                <Text
                  title={
                    (calculatedProducts?.user?.name ?? 'Not Available') ||
                    (!calculatedProducts?.user?.name.length
                      ? 'Not Available'
                      : calculatedProducts?.user?.name)
                  }
                  className="text-[6px]"
                />
                <p className=" flex items-center flex-row  gap-1">
                  {/* <PhoneIcon className="w-2 h-2 text-blue-400" /> */}
                  <Text
                    title={
                      (calculatedProducts?.user?.mobile ?? 'Not Available') ||
                      (!calculatedProducts?.user?.mobile.length
                        ? 'Not Available'
                        : calculatedProducts?.user?.mobile)
                    }
                    className="text-[6px] mb-[1.35rem]"
                  />
                </p>
                <p className=" flex items-center flex-row  gap-1">
                  {/* <PhoneIcon className="w-2 h-2 text-blue-400" /> */}
                  <Text
                    title={
                      `Date: ${format(calculatedProducts?.date, 'dd/MM/yyyy')}` ??
                      'Not Available'
                    }
                    className="text-[6px] mb-[1.35rem]"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 mt-6 ">
            <div className="grid grid-cols-7">
              <div className="text-[5px] col-span-1 font-bold">S.N</div>
              <div className="text-[5px]  col-span-3 font-bold">
                Product Name
              </div>
              <div className="text-[5px] text-end font-bold">Unit Price</div>
              <div className="text-[5px] text-end font-bold">Quantity</div>
              <div className="text-[5px] text-end font-bold">Total</div>
            </div>
            {calculatedProducts.products.map(
              (prod: IProductPurchase, index: number) => (
                <div className="grid grid-cols-7 " key={index + 1}>
                  <div className="text-[5px] ">{index + 1}</div>
                  <div className="text-[5px]  col-span-3 text-start">
                    {prod.name}
                  </div>
                  <div className="text-[5px]  text-end pr-1">
                    {prod.calculatedAmount?.unit_price ??
                      prod.calculatedAmount?.unit_cost}
                  </div>
                  <div className="text-[5px]  text-end pr-1">
                    {prod.calculatedAmount?.quantity}
                  </div>
                  <div className="text-[5px] text-end pr-1">
                    {prod.calculatedAmount?.total}
                  </div>
                </div>
              )
            )}
            <Separator className="my-2 mt-4" />

            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                {/* <h3 className="text-lg font-bold">Payment Terms</h3> */}
                <div className="">
                  <Text
                    title="Total bill in words: "
                    className="text-[6px] font-bold"
                  />

                  <p className="text-[5px] text-gray-500 dark:text-gray-400">
                    {/* Net 30 days. Late payments are subject to a 2% monthly fee. */}
                    {toWords.convert(calculatedProducts.totalPrice, {
                      currency: true,
                    })}
                  </p>
                </div>
                <div className="">
                  <Text title="Payment Way" className="text-[6px] font-bold" />

                  <p className="text-[5px] text-gray-500 dark:text-gray-400">
                    {/* Net 30 days. Late payments are subject to a 2% monthly fee. */}
                    {due > 0 ? 'Due' : 'Cash'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="grid gap-2 ml-16">
                  <div className="flex items-center justify-between">
                    <span className="text-[4px] ">Discount:</span>
                    <span className="font-bold text-[4px] ">
                      - {calculatedProducts.discount ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[4px]">Delivery Charge:</span>
                    <span className="font-bold text-[4px]">
                      {calculatedProducts.deliveryCharge ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[4px]">Total Payable:</span>
                    <span className="font-bold text-[4px]">
                      {calculatedProducts.totalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[5px] font-bold">Paid:</span>
                    <span className="font-bold text-[5px]">
                      {calculatedProducts.paymentAmount}
                    </span>
                  </div>
                  {/* <Separator className="my-1 " /> */}
                  {due > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[5px] ">Due:</span>
                      <span className="font-bold text-[5px]">{due}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[5px] text-center flex items-center justify-center gap-1">
            <Image
              src="/images/branding/Bee.svg"
              width={100}
              height={100}
              alt={''}
              className="w-2 h-2"
            />
            <Text title="Powered by Hishabee" className="text-[5px] mb-4" />
          </div>
        </div>
      </div>

      {/* <button >Download PDF</button> */}
      <div
        onClick={generatePDF}
        className="w-full  flex flex-col items-center p-2 justify-center mt-4 bg-stone-100 hover:bg-stone-200 rounded-md cursor-pointer "
      >
        <Image src="/images/print_receipt.svg" alt="" height={36} width={36} />

        <Text title="Download/Print Receipt" className="text-sm font-medium" />
      </div>
    </div>
  );
};

export default PDFGenerator;
