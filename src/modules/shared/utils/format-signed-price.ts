import { formatPrice } from "./format-price";

export function formatSignedPrice(value: number): string {
  if (Number.isNaN(value)) return "";

  let sign = "";
  if (value > 0) sign = "+";
  if (value < 0) sign = "-";

  return `${sign}${formatPrice(Math.abs(value))}`;
}
