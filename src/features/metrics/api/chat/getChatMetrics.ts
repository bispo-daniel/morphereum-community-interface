import { useQuery } from "@tanstack/react-query";

import env from "@/config";

import { Metrics, MetricsSchema } from "../../types";

const getChatMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/chat`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas do chat.");
  }

  const data = (await response.json()) as Metrics;

  return MetricsSchema.parse(data);
};

export const useChatMetrics = () =>
  useQuery({
    queryKey: ["chat-metrics"],
    queryFn: getChatMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
