import { BOOKING_ENDING_TIME, BOOKING_STARTING_TIME } from "../constants";
import { DateHour } from "../../dates/types";
import { isBeforeToday } from "../../dates/helpers";
import { isToday } from "../../dates/helpers";
import { isValidDateHour } from "../../dates/helpers";

const isValidEventDate = (date: DateHour) => {
  if (!isValidDateHour(date)) return false;

  if (date.hour < BOOKING_STARTING_TIME || date.hour > BOOKING_ENDING_TIME)
    return false;

  if (isBeforeToday(date)) return false;

  const currentDate = new Date();
  if (isToday(date)) {
    return currentDate.getHours() <= date.hour;
  }

  return true;
};

export { isValidEventDate };