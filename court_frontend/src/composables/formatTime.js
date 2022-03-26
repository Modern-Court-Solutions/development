import { format } from "date-fns";

export const formatTime = (time) => {
  return format(time, "hh:mm aa");
};
