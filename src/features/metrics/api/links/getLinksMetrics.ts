import { useQuery } from "@tanstack/react-query";

import env from "@/config";

import { Metrics, MetricsSchema } from "../../types";

const getLinksMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/links`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de links.");
  }

  const data = (await response.json()) as Metrics;

  return MetricsSchema.parse(data);
};

export const useLinksMetrics = () =>
  useQuery({
    queryKey: ["links-metrics"],
    queryFn: getLinksMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
