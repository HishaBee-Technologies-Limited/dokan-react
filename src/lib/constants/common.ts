export const DATE_FORMATS = {
  default: 'yyyy-MM-dd HH:mm:ss',
  dateWithOutTime: 'yyyy-MM-dd',
  dateOnlyTime: 'HH:mm:ss',
};

export enum PAYMENT_METHODS {
  'Cash' = 1,
  'Digital Payment',
  'Due Payment',
  'QR Code',
  'Bank Cheque',
  'Online Sale',
}

export const PAYMENT_METHOD_NAMES = {
  Cash: 'Cash',
  Digital_Payment: 'Digital Payment',
  Due_Payment: 'Due Payment',
  QR_Code: 'QR Code',
  Bank_Cheque: 'Bank Cheque',
  Online_Sale: 'Online Sale',
};

export enum PAYMENT_STATUS {
  'PAID' = 'PAID',
  'UNPAID' = 'UNPAID',
}

export enum TRANSACTION_TYPE {
  'PRODUCT_SELL' = 'PRODUCT_SELL',
  'QUICK_SELL' = 'QUICK_SELL',
}

export const SUBSCRIPTION_PACKAGES = {
  free: 'FREE',
  standard: 'STANDARD',
  advanced: 'ADVANCED',
  trial: 'TRIAL',
};
