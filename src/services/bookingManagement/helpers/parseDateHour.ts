import { DateHour } from "../interfaces";
import parseDateDay from "./parseDateDay";

const parseDateHour = (
  date: DateHour,
  includeYear: boolean,
  includeMonth: boolean,
  includeDay: boolean,
  includeHour: boolean
) => {
  let parsed = parseDateDay(date, includeYear, includeMonth, includeDay);

  if (includeHour) parsed += " " + ("0" + date.hour).slice(-2);

  return parsed.trim();
};

export default parseDateHour;