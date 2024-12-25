import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

type TimeUnit = {
  unit: Intl.RelativeTimeFormatUnit;
  ms: number;
};

type FormatOptions = {
  numeric?: "always" | "auto";
  style?: "long" | "short" | "narrow";
  locale?: string;
};

export class TimeFormatter {
  private static readonly TIME_UNITS: TimeUnit[] = [
    { unit: "year", ms: 31536000000 },
    { unit: "month", ms: 2628000000 },
    { unit: "week", ms: 604800000 },
    { unit: "day", ms: 86400000 },
    { unit: "hour", ms: 3600000 },
    { unit: "minute", ms: 60000 },
    { unit: "second", ms: 1000 },
  ];

  /**
   * Converts DD/MM/YYYY format to Date object
   */
  private static parseDateString(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JS Date
  }

  /**
   * Safely converts any date input to Date object
   */
  private static toDateObject(date: Date | string | number): Date {
    if (date instanceof Date) return date;

    if (typeof date === "string") {
      // Check if date is in DD/MM/YYYY format
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        return this.parseDateString(date);
      }
      // Try parsing as ISO string or other formats
      return new Date(date);
    }

    return new Date(date);
  }

  /**
   * Formats a date to DD/MM/YYYY format
   */
  static formatToCustomDate(date: Date | string | number): string {
    const dateObj = this.toDateObject(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /**
   * Formats date to relative time using date-fns
   */
  static toRelativeTime(
    date: Date | string | number,
    options: FormatOptions = {},
  ): string {
    const { locale = "en" } = options;
    const dateObj = this.toDateObject(date);
    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: locale === "en" ? enUS : undefined,
    });
  }

  /**
   * Formats to readable date and time
   */
  static toReadableDate(
    date: Date | string | number,
    locale: string = "en",
  ): string {
    const dateObj = this.toDateObject(date);

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(dateObj);
  }

  /**
   * Returns time passed since date
   */
  static timeAgo(date: Date | string | number): string {
    const timestamp = this.toDateObject(date);
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();

    if (diff < 60000) {
      return "just now";
    }

    return this.toRelativeTime(timestamp, { numeric: "auto" });
  }

  /**
   * Validates if a string is in DD/MM/YYYY format
   */
  static isValidDateFormat(dateStr: string): boolean {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;

    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }
}
