import Marquee from "react-fast-marquee";

import { useTokenData } from "@/api/getTokenData";
import { TokenMarqueeItem } from "@/components";

const TokenMarquee = () => {
  const { data: tokenData } = useTokenData();

  const tokenBirth = new Date("2024-10-31");
  const now = new Date();
  const ageInMilliseconds = now.getTime() - tokenBirth.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-[30px] w-full select-none items-center overflow-hidden border-b bg-transparent backdrop-blur-md backdrop-filter">
      <Marquee pauseOnHover={true} className="h-[30px] overflow-hidden">
        <div className="flex items-center w-full mr-3 h-fit justify-evenly">
          <span className="mx-12 coin-ticker-font">$Morphereum</span>
          <TokenMarqueeItem
            name={"Valor"}
            content={tokenData?.tokenPriceInUSD || "$0"}
          />
          <TokenMarqueeItem
            name={"Diferencial de Valor (24h)"}
            content={tokenData?.changeIn24H || "0%"}
            positive={tokenData?.changeIn24H?.includes("+")}
            negative={tokenData?.changeIn24H?.includes("-")}
          />
          <TokenMarqueeItem
            name={"Diferencial de Valor (1h)"}
            content={tokenData?.changeIn1H || "0%"}
            positive={tokenData?.changeIn1H?.includes("+")}
            negative={tokenData?.changeIn1H?.includes("-")}
          />
          <TokenMarqueeItem
            name={"Volume (24h)"}
            content={tokenData?.volumeIn24H || "$0"}
          />
          <TokenMarqueeItem
            name={"Valor de Mercado"}
            content={tokenData?.marketCap || "$0"}
          />
          <TokenMarqueeItem
            name={"Ordens (24h)"}
            content={tokenData?.transactions24H || 0}
          />

          <TokenMarqueeItem
            name={"Vendas (24h)"}
            content={tokenData?.sell24H || 0}
            negative
          />
          <TokenMarqueeItem
            name={"Compras (24h)"}
            content={tokenData?.buy24H || 0}
            positive
          />
          <TokenMarqueeItem
            name={"Oferta Total"}
            content={tokenData?.totalSupply || "0"}
          />
          <TokenMarqueeItem
            name={"Detentores"}
            content={tokenData?.holders || "7K"}
          />

          <TokenMarqueeItem name={"Idade"} content={`${ageInDays}d`} />
        </div>
      </Marquee>
    </div>
  );
};

export default TokenMarquee;
