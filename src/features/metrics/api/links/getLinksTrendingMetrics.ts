import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const LinksTrendingSchema = z.object({
  total: z.number(),
  links: z.array(
    z.object({
      count: z.number(),
      label: z.string(),
      icon: z.string(),
    }),
  ),
});

type LinksTrending = z.infer<typeof LinksTrendingSchema>;

const getLinksTrendingMetrics = async (): Promise<LinksTrending> => {
  const response = await fetch(`${env.VITE_API_URL}/metrics/links/trending`);

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas de links em alta.");
  }

  const data = (await response.json()) as LinksTrending;

  return LinksTrendingSchema.parse(data);
};

export const useLinksTrendingMetrics = () =>
  useQuery({
    queryKey: ["links-trending-metrics"],
    queryFn: getLinksTrendingMetrics,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
