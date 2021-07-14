import { DateDay, DateHour } from "../types";

const isToday = (date: DateDay | DateHour) => {
  let currentDate = new Date();
  return (
    date.year === currentDate.getFullYear() &&
    date.month === currentDate.getMonth() + 1 &&
    date.day === currentDate.getDate()
  );
};

export { isToday };