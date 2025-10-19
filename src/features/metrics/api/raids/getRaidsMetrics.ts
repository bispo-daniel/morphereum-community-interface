import { useQuery } from "@tanstack/react-query";

import env from "@/config";

import { Metrics, MetricsSchema } from "../../types";

const getRaidsMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/raids`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de raids.");
  }

  const data = (await response.json()) as Metrics;

  return MetricsSchema.parse(data);
};

export const useRaidsMetrics = () =>
  useQuery({
    queryKey: ["raids-metrics"],
    queryFn: getRaidsMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
