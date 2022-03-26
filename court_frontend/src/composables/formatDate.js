import { format, formatISO } from "date-fns";

export const formatDate = (date) => {
  return format(date, "MM/dd/yyyy");
};
