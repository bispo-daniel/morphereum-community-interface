import { parse } from "date-fns";

export const sortByDate = (
  data: {
    total: number;
    highestCount: number;
    daily: { date: string; count: number }[];
  },
  dateFormat = "dd/MM/yyyy",
) => {
  return {
    total: data.total,
    highestCount: data.highestCount,
    daily: data.daily.sort(
      (a, b) =>
        parse(a.date, dateFormat, new Date()).getTime() -
        parse(b.date, dateFormat, new Date()).getTime(),
    ),
  };
};
