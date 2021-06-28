import { dateDaySchema } from "./dateDay";
import * as yup from "yup";

export const dateHourSchema = dateDaySchema.shape({
  hour: yup.number().required(),
});

export type DateHour = yup.InferType<typeof dateHourSchema>;

export const duplicateDateHour = (oldDateHour: DateHour): DateHour => ({
  ...oldDateHour,
});
