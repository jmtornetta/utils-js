export type ISODatePart = `${number}-${number}${number}-${number}${number}`;
export type ISOTimePart =
  `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;
export type ISODateTimeString = `${ISODatePart}T${ISOTimePart}Z`;

export type TimeForSwitchboardOrderForm = `${number}:${number}`;

/**
 * Convert a date into a ISO string for the browser. Useful for HTML <input type="date" value={dateString} /> elements.
 * @param {Date} d Date
 * @returns {string} string
 */
export const dateToString = (d?: Date): string => d ? new Date(d).toISOString().split("T")[0] : "";

export function formatDate(dateString: string | undefined, options?: {includeYear?: boolean}) {
  if (!dateString) throw Error("No date string provided.");
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const period = date.getHours() < 12 ? 'AM' : 'PM';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return {
    date: `${month}/${day}${options?.includeYear ? `/${year}` : ''}`,
    time: `${hours}:${minutes.toString().padStart(2, '0')} ${period}`,
    timezone, 
  } as const;
}

export function isISODateString(
  dateString: string | undefined
): asserts dateString is ISODateTimeString {
  const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).\d{3}Z$/;
  if (!dateString || !isoRegex.test(dateString)) throw Error("Invalid ISO date format");
}

export function formatPhone(
  phoneNumberString: string,
  options?:
    | {
        format: "us";
        countryCode?: never;
      }
    | {
        format: "e164";
        countryCode: number;
      }
): string {
  const { format = "us", countryCode = 1 } = options ?? {}; // typesafety
  const cleaned = ("" + phoneNumberString).replace(/[^\d+]/g, "");
  const e164Match =
    cleaned.startsWith("+") &&
    cleaned.match(/^\+((\d{1,3})(\d{3})(\d{3})(\d{4}))$/);
  if (format === "e164" && e164Match) return phoneNumberString;
  const match = e164Match
    ? [e164Match[1], ...e164Match.slice(3)]
    : cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    if (format === "e164") return `+${countryCode}${match[0]}`;
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumberString;
}