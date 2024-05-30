import { DiscountType } from '@/schemas/products';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { ulid } from 'ulid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the profit made on a sale of a product, given the purchase price,
 * selling price, and quantity sold.
 *
 * @param buyPrice - the purchase price of the product
 * @param sellPrice - the selling price of the product
 * @param stock - the quantity of products sold
 * @returns the profit made on the sale
 */
export function productProfitCalculation(
  buyPrice: number,
  sellPrice: number,
  stock: number
): number {
  const perProductPrice = sellPrice - buyPrice;
  return perProductPrice;
}

/**
 * Calculates the percentage of a number.
 * @param number - the number to calculate the percentage of
 * @param percent - the percentage to calculate
 * @returns the calculated percentage
 */
export function percentage(number: number, percent: number): number {
  return (number / 100) * percent;
}
/**
 * Calculates the grand total of an purchase, taking into account the specified
 * discount type, total price, delivery charge, and discount amount.
 *
 * @param discountType - the type of discount to apply (e.g., PERCENT, AMOUNT)
 * @param totalPrice - the total price of the order
 * @param deliveryCharge - the delivery charge for the order
 * @param discountAmount - the amount of discount to apply (only applicable for
 * AMOUNT discount type)
 * @returns the grand total of the order
 */
export function calculateGrandTotal(
  discountType: DiscountType,
  totalPrice: number,
  deliveryCharge: number,
  discountAmount: number
) {
  return discountType
    ? discountType === 'PERCENT'
      ? totalPrice - percentage(totalPrice, discountAmount) + deliveryCharge
      : totalPrice - discountAmount + deliveryCharge
    : totalPrice + deliveryCharge;
}
export function calculateTotal(
  totalPrice: number,
  deliveryCharge: number,
  discountAmount: number,
  discountType?: DiscountType
) {
  const totalWithoutDelivery = totalPrice - deliveryCharge;
  if (discountType) {
    if (discountType === 'PERCENT') {
      const discountPercentToTaka = 1 - discountAmount / 100;
      return totalWithoutDelivery / discountPercentToTaka;
    }

    if (discountType === 'AMOUNT') {
      return totalPrice + discountAmount - deliveryCharge;
    }
  } else {
    return totalWithoutDelivery;
  }
}

/**
 * Formats a date using the given format string.
 *
 * @param formatString - the format string to use for the date
 * @returns the formatted date string
 */
export function formatDate(formatString: string, date?: Date): string {
  if (date) {
    return format(date, formatString);
  } else {
    return format(Date.now(), formatString);
  }
}

/**
 * generates a Universally Unique Lexicographically Sortable Identifier (ULID)
 * @returns a 26-character string that is a ULID
 * @example  01ARZ3NDEKTSV4RRFFQ69G5FAV
 */
export function generateUlid() {
  return ulid();
}
