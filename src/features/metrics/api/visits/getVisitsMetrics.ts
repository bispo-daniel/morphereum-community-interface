import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

export const VisitsMetricsSchema = z.object({
  total: z.number(),
  highestCount: z.number(),
  daily: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
    }),
  ),
});

export type VisitsMetrics = z.infer<typeof VisitsMetricsSchema>;

const getVisitsMetrics = async (): Promise<VisitsMetrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/visits`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de visitas.");
  }

  const data = (await response.json()) as VisitsMetrics;

  return VisitsMetricsSchema.parse(data);
};

export const useVisitsMetrics = () =>
  useQuery({
    queryKey: ["visits-metrics"],
    queryFn: getVisitsMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
