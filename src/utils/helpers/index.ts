import { isNumber } from "remeda";
import { TimeUnits } from ".";

export * from "./environments";
export * from "./encryptions";
export * from "./numberToWords";

export const toMiliseconds = (time: TimeUnits) => {
  const [number, unit] = time.split(/(?=[a-z])/);
  const units: {
    [key: string]: number;
  } = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
  };

  if (!units[unit]) {
    throw new Error(
      `Invalid time unit. Expected one of ${Object.keys(units).join(
        ", "
      )}, got ${unit}`
    );
  }
  return parseInt(number) * units[unit];
};

export function truncate(str: string, n: number) {
  return str?.length > n ? str.substring(0, n) + "..." : str;
}

export function formatCurrencyString(number: string) {
  if (!isNumber(parseInt(number))) return number;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parseInt(number));
}
