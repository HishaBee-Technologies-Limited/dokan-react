import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function productProfitCalculation(
  buyPrice: number,
  sellPrice: number,
  stock: number,
): number {
  const perProductPrice = sellPrice - buyPrice;
  return stock * perProductPrice;
}
