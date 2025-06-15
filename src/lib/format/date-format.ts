import { format } from "date-fns";

export const dateFormat = {
  ddMMMyyyy: (date: Date | string) => formatDate(date, "dd MMM yyyy"),
  HHmm: (date: Date | string) => formatDate(date, "HH:mm"),
  EEEEddMMMyyyyHHmm: (date: Date | string) =>
    formatDate(date, "EEEE, dd MMM yyyy, HH:mm"),
  EEEEddMMMyyyy: (date: Date | string) => formatDate(date, "EEEE, dd MMM yyyy"),
  ddMMMyyyyHHmm: (date: Date | string) =>
    formatDate(date, "dd MMM yyyy, HH:mm"),
  yyyyMMdd: (date: Date | string) => formatDate(date, "yyyy-MM-dd"),
  MMMMdyyyy: (date: Date | string) => formatDate(date, "MMMM d, yyyy"),
  MMMMdyyyyHHmm: (date: Date | string) =>
    formatDate(date, "MMMM d, yyyy HH:mm"),
};

export const formatDate = (date: Date | string, dateFormat: string) => {
  return format(date, dateFormat);
};
