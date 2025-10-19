import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

export const LinksSchema = z.array(
  z.object({
    _id: z.string().nonempty(),
    label: z.string().nonempty(),
    url: z.string().nonempty(),
    icon: z.string().nonempty(),
    type: z.enum(["community-links", "official-links"]),
  }),
);

export type Links = z.infer<typeof LinksSchema>;

const getLinks = async () => {
  const response = await fetch(`${env.VITE_API_URL}/links`);
  const data = await response.json();

  return data as Links;
};

export const useLinks = () =>
  useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
