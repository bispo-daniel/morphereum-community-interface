import { useQuery } from "@tanstack/react-query";

import env from "@/config";

type TokenData = {
  tokenPriceInUSD: string;
  volumeIn24H: string;
  changeIn1H: string;
  changeIn24H: string;
  marketCap: string;
  transactions24H: string;
  sell24H: string;
  buy24H: string;
  totalSupply: string;
  holders: string;
};

const getTokenData = async () => {
  const response = await fetch(`${env.VITE_API_URL}/token`);
  const data = await response.json();

  return data as TokenData;
};

export const useTokenData = () =>
  useQuery({
    queryKey: ["tokenData"],
    queryFn: getTokenData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
