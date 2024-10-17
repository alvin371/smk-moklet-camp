export type TimeUnits = `${number}${"s" | "m" | "h" | "d"}`;

const API_URL: string =
  import.meta.env.VITE_BASE_API_URL ||
  "https://ukkcafe.smktelkom-mlg.sch.id/api";
const EXP_SESSION: TimeUnits = import.meta.env.VITE_EXP_SESSION || "30m";

export { API_URL, EXP_SESSION };
