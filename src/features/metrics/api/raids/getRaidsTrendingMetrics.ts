import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const RaidsTrendingSchema = z.object({
  total: z.number(),
  raids: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
      platform: z.string(),
    }),
  ),
});

type RaidsTrending = z.infer<typeof RaidsTrendingSchema>;

const getRaidsTrendingMetrics = async (): Promise<RaidsTrending> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/raids/trending`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de raids em alta.");
  }

  const data = (await response.json()) as RaidsTrending;

  return RaidsTrendingSchema.parse(data);
};

export const useRaidsTrendingMetrics = () =>
  useQuery({
    queryKey: ["raids-trending-metrics"],
    queryFn: getRaidsTrendingMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
