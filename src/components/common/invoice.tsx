// import React, { Fragment } from 'react';
// import { createTw } from 'react-pdf-tailwind';
// import {
//   Page,
//   Text as PDFText,
//   View,
//   Document,
//   StyleSheet,
//   PDFDownloadLink,
//   BlobProvider,
//   Image,
// } from '@react-pdf/renderer';
// import { useSellStore } from '@/stores/useSellStore';
// import { IProduct } from '@/types/product';
// import { IProductPurchase } from '../sell/ProductFiledRow';
// import { DISCOUNT_TYPE } from '@/lib/constants/product';

// const tw = createTw({
//   theme: {
//     fontFamily: {
//       sans: ['Comic Sans'],
//     },
//     extend: {
//       colors: {
//         custom: '#bada55',
//       },
//     },
//   },
// });

// const styles = StyleSheet.create({
//   page: {
//     fontSize: 11,
//     paddingTop: 20,
//     paddingLeft: 40,
//     paddingRight: 40,
//     lineHeight: 1.5,
//     flexDirection: 'column',
//   },

//   spaceBetween: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     color: '#3E3E3E',
//   },

//   titleContainer: { flexDirection: 'row', marginTop: 24 },

//   logo: { width: 90 },

//   reportTitle: { fontSize: 16, textAlign: 'center' },

//   addressTitle: { fontSize: 11, fontStyle: 'bold' },

//   invoice: { fontWeight: 'bold', fontSize: 20 },

//   invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

//   address: { fontWeight: 400, fontSize: 10 },

//   theader: {
//     marginTop: 20,
//     fontSize: 10,
//     fontStyle: 'bold',
//     paddingTop: 4,
//     paddingLeft: 7,
//     flex: 1,
//     height: 20,
//     backgroundColor: '#DEDEDE',
//     borderColor: 'whitesmoke',
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//   },

//   theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

//   tbody: {
//     fontSize: 9,
//     paddingTop: 4,
//     paddingLeft: 7,
//     flex: 1,
//     borderColor: 'whitesmoke',
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//   },

//   total: {
//     fontSize: 9,
//     paddingTop: 4,
//     paddingLeft: 7,
//     flex: 1.5,
//     borderColor: 'whitesmoke',
//     borderBottomWidth: 1,
//   },

//   tbody2: { flex: 2, borderRightWidth: 1 },
// });

// function Invoice({
//   calculatedProducts,
//   shop,
//   due,
// }: {
//   calculatedProducts: any;
//   shop: any;
//   due: number;
// }) {
//   //   const calculatedProducts = useSellStore((state) => state.calculatedProducts);
//   console.log(calculatedProducts, shop);
//   const shopInfo = JSON.parse(shop);
//   console.log(shopInfo.logo_url, shopInfo);
//   const InvoiceTitle = () => (
//     // update InvoiceTitle component here
//     <View style={styles.titleContainer}>
//       <View style={styles.spaceBetween}>
//         {shop.logo_url ? (
//           <Image style={styles.logo} src={shopInfo.logo_url} />
//         ) : (
//           <PDFText
//             style={{
//               backgroundColor: '#512DA8',
//               borderRadius: '50',
//               color: 'black',
//               fontWeight: 'bold',
//               fontSize: ' 35',
//               padding: '10',
//               // textAlign: 'center',
//               // lineHeight: '50px',
//             }}
//           >
//             {shopInfo.name[0]}
//           </PDFText>
//         )}
//       </View>
//       <View>
//         <PDFText style={styles.reportTitle}>{shopInfo.name}</PDFText>
//       </View>
//     </View>
//   );

//   const Address = () => (
//     // update Address component here
//     <View style={styles.titleContainer}>
//       <View style={styles.spaceBetween}>
//         <View>
//           <PDFText style={styles.invoice}>Invoice </PDFText>
//         </View>
//         <View style={{ maxWidth: 200 }}>
//           <PDFText style={styles.addressTitle}>{shopInfo.address}</PDFText>

//           <PDFText style={styles.addressTitle}>{shopInfo.number}</PDFText>
//           {/* <PDFText style={styles.address}>{reciept_data.address}</PDFText> */}
//         </View>
//       </View>
//     </View>
//   );

//   const UserAddress = () => (
//     // update UserAddress component here
//     <View style={styles.titleContainer}>
//       <View style={styles.spaceBetween}>
//         <View style={{ maxWidth: 200 }}>
//           <PDFText style={styles.addressTitle}>Bill to </PDFText>
//           <PDFText style={styles.address}>
//             Name: {calculatedProducts.user.name ?? 'N/A'}{' '}
//           </PDFText>
//           <PDFText style={styles.addressTitle}>
//             Mobile: {calculatedProducts.user.mobile ?? 'N/A'}{' '}
//           </PDFText>
//         </View>
//         <View>
//           <PDFText style={styles.addressTitle}>
//             {calculatedProducts.date ?? 'N/A'}{' '}
//           </PDFText>
//         </View>
//       </View>
//     </View>
//   );

//   const TableHead = () => (
//     // update TableHead component here
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       <View style={[styles.theader, styles.theader2]}>
//         <PDFText>Items</PDFText>
//       </View>
//       <View style={styles.theader}>
//         <PDFText>Price</PDFText>
//       </View>
//       <View style={styles.theader}>
//         <PDFText>Qty</PDFText>
//       </View>
//       <View style={styles.theader}>
//         <PDFText>Amount</PDFText>
//       </View>
//     </View>
//   );

//   const TableBody = () =>
//     // update TableBody component here
//     calculatedProducts.products.map((receipt: IProductPurchase) => (
//       <Fragment key={receipt.id}>
//         <View style={{ width: '100%', flexDirection: 'row' }}>
//           <View style={[styles.tbody, styles.tbody2]}>
//             <PDFText>{receipt.name}</PDFText>
//           </View>
//           <View style={styles.tbody}>
//             <PDFText>{receipt.calculatedAmount?.unit_price} </PDFText>
//           </View>
//           <View style={styles.tbody}>
//             <PDFText>{receipt.calculatedAmount?.quantity}</PDFText>
//           </View>
//           <View style={styles.tbody}>
//             <PDFText>{receipt.calculatedAmount?.total!.toFixed(2)}</PDFText>
//           </View>
//         </View>
//       </Fragment>
//     ));
//   const TableDiscount = () => (
//     // update TableTotal component here
//     <View style={{ width: '100%', flexDirection: 'row' }}>
//       <View style={styles.total}>
//         <PDFText></PDFText>
//       </View>
//       <View style={styles.total}>
//         <PDFText> </PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>
//           (-) Discount{' '}
//           {calculatedProducts.discountType === 'AMOUNT' ? '(Taka)' : '(%)'}
//         </PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>{calculatedProducts.discount ?? 0}</PDFText>
//       </View>
//     </View>
//   );

//   const TableDelivery = () => (
//     // update TableTotal component here
//     <View style={{ width: '100%', flexDirection: 'row' }}>
//       <View style={styles.total}>
//         <PDFText></PDFText>
//       </View>
//       <View style={styles.total}>
//         <PDFText> </PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>Delivery</PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>{calculatedProducts.deliveryCharge ?? 0}</PDFText>
//       </View>
//     </View>
//   );
//   const TablePayment = () => (
//     // update TableTotal component here
//     <View style={{ width: '100%', flexDirection: 'row' }}>
//       <View style={styles.total}>
//         <PDFText></PDFText>
//       </View>
//       <View style={styles.total}>
//         <PDFText> </PDFText>
//       </View>
//       <View style={[styles.tbody, { color: 'green' }]}>
//         <PDFText>Paid</PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>{calculatedProducts.paymentAmount ?? 0}</PDFText>
//       </View>
//     </View>
//   );

//   const TableTotalPayable = () => (
//     // update TableTotal component here
//     <View style={{ width: '100%', flexDirection: 'row' }}>
//       <View style={styles.total}>
//         <PDFText></PDFText>
//       </View>
//       <View style={styles.total}>
//         <PDFText> </PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>Total Payable</PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>{calculatedProducts.totalPrice}</PDFText>
//       </View>
//     </View>
//   );

//   const TableDue = () => (
//     // update TableTotal component here
//     <View style={{ width: '100%', flexDirection: 'row' }}>
//       <View style={styles.total}>
//         <PDFText></PDFText>
//       </View>
//       <View style={styles.total}>
//         <PDFText> </PDFText>
//       </View>
//       <View style={[styles.tbody, { color: 'red' }]}>
//         <PDFText>Due</PDFText>
//       </View>
//       <View style={styles.tbody}>
//         <PDFText>{due}</PDFText>
//       </View>
//     </View>
//   );

//   const Footer = () => (
//     // update TableTotal component here
//     <View
//       style={{
//         flexDirection: 'row',
//         marginTop: 24,
//         textAlign: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//       }}
//     >
//       <View style={{}}>
//         <Image
//           src={'../../../public/images/branding/hishabeeIcon.png'}
//           style={{ width: '10' }}
//         />
//         <PDFText>Powered by Hishabee Business Manager </PDFText>
//       </View>
//     </View>
//   );
//   return (
//     <Document>
//       <Page
//         size="A4"
//         style={{
//           fontSize: 11,
//           paddingTop: 20,
//           paddingLeft: 40,
//           paddingRight: 40,
//           lineHeight: 1.5,
//           flexDirection: 'column',
//         }}
//       >
//         <InvoiceTitle />
//         <Address />
//         <UserAddress />
//         <TableHead />
//         <TableBody />
//         <TableDelivery />
//         <TableDiscount />
//         <TablePayment />
//         <TableTotalPayable />
//         <TableDue />

//         <Footer />
//       </Page>
//     </Document>
//   );
// }

// export default Invoice;
