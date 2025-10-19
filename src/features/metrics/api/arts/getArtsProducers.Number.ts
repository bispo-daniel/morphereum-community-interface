import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const ArtsProducersNumberSchema = z.object({
  producers: z.number(),
  arts: z.number(),
});

export type ArtsProducersNumber = z.infer<typeof ArtsProducersNumberSchema>;

const getArtsMetrics = async (): Promise<ArtsProducersNumber> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/arts/producers`);

  if (!response.ok) {
    throw new Error("Erro ao buscar número de produtores de artes.");
  }

  const data = (await response.json()) as ArtsProducersNumber;

  return ArtsProducersNumberSchema.parse(data);
};

export const useArtsProducersNumber = () =>
  useQuery({
    queryKey: ["arts-producers-number"],
    queryFn: getArtsMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
