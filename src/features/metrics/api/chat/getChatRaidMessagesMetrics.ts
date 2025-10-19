import { useQuery } from "@tanstack/react-query";

import env from "@/config";

import { Metrics, MetricsSchema } from "../../types";

const getChatRaidMessagesMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/chat/raid-message`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de mensagens de raid do chat.");
  }

  const data = (await response.json()) as Metrics;

  return MetricsSchema.parse(data);
};

export const useChatRaidMessagesMetrics = () =>
  useQuery({
    queryKey: ["chat-metrics"],
    queryFn: getChatRaidMessagesMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
