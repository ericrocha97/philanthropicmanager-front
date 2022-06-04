import { FinancialTypeData, FinancialTypeMapper } from "../models/financialType";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/UTC");

export function FinancialMapper(financial: FinancialTypeData[]): FinancialTypeMapper[] {
  const formatDate = (date: string) => {
    const x = dayjs(date).tz();
    return dayjs(x).format("DD/MM/YYYY");
  };

  return financial.map((item) => {
    const dateToFormat = new Date(item.date).toISOString();
    const formattedDate = formatDate(dateToFormat);

    return {
      id: item.id,
      description: item.description,
      type: item.type,
      date: formattedDate,
      value: item.value
    };
  });
}

export function FinancialDetailsMapper(financial: FinancialTypeData) {
  const formatDate = (date: string) => {
    const x = dayjs(date).tz();
    return dayjs(x).format("YYYY-MM-DD");
  };
  const dateToFormat = new Date(financial.date).toISOString();
  const formattedDate = formatDate(dateToFormat);

  return {
    id: financial.id,
    description: financial.description,
    type: financial.type,
    date: formattedDate,
    value: financial.value
  };
}
