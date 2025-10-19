import { getCountryForTimezone } from "countries-and-timezones";

export const getUserCountryByTimeZone = (): string | null => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const countryData = getCountryForTimezone(timeZone);

  if (!countryData) {
    return null;
  }

  return countryData.name;
};
