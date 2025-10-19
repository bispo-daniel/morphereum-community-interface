import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const ArtsProducersTrendingSchema = z.object({
  total: z.number(),
  producers: z.array(
    z.object({
      creator: z.string(),
      xProfile: z.string(),
      count: z.number(),
      approvedCount: z.number(),
    }),
  ),
});

export type ArtsProducersTrending = z.infer<typeof ArtsProducersTrendingSchema>;

const getArtsMetrics = async (): Promise<ArtsProducersTrending> => {
  const response = await fetch(
    `${env.VITE_API_URL}/metrics/arts/producers/trending`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar os produtores de artes em alta.");
  }

  const data = (await response.json()) as ArtsProducersTrending;

  return ArtsProducersTrendingSchema.parse(data);
};

export const useArtsProducersTrending = () =>
  useQuery({
    queryKey: ["arts-producers-trending"],
    queryFn: getArtsMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
