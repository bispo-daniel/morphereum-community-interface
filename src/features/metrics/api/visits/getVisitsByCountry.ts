import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

export const VisitsByCountrySchema = z.object({
  highestCount: z.number(),
  countries: z.array(
    z.object({
      count: z.number(),
      country: z.string(),
    }),
  ),
});

export type VisitsByCountry = z.infer<typeof VisitsByCountrySchema>;

const getVisitsByCountry = async (): Promise<VisitsByCountry> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/visits/countries`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de visitas por país.");
  }

  const data = await response.json();

  return VisitsByCountrySchema.parse(data);
};

export const useVisitsByCountry = () =>
  useQuery({
    queryKey: ["visitsByCountry"],
    queryFn: getVisitsByCountry,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
