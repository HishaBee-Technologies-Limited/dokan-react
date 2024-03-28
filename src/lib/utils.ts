import { DiscountType } from '@/schemas/products';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function productProfitCalculation(
  buyPrice: number,
  sellPrice: number,
  stock: number
): number {
  const perProductPrice = sellPrice - buyPrice;
  return stock * perProductPrice;
}

export function percentage(number: number, percent: number) {
  return (number / 100) * percent;
}

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
