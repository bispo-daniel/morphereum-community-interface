import { useQuery } from "@tanstack/react-query";

import env from "@/config";

import { Metrics, MetricsSchema } from "../../types";

const getArtsMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/arts`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de artes.");
  }

  const data = (await response.json()) as Metrics;

  return MetricsSchema.parse(data);
};

export const useArtsMetrics = () =>
  useQuery({
    queryKey: ["arts-metrics"],
    queryFn: getArtsMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
