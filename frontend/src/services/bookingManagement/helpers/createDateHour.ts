import { DateHour, DateDay } from "utils";
import createDateDay from "./createDateDay";

const createDateHourFromDate = (date: Date): DateHour => {
  return {
    ...createDateDay(date),
    hour: date.getHours(),
  };
};

const createDateHourFromDateDay = (
  dateDay: DateDay,
  hour: number
): DateHour => {
  return {
    ...dateDay,
    hour: hour,
  };
};

export { createDateHourFromDate, createDateHourFromDateDay };