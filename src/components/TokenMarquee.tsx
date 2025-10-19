import classNames from "classnames";
import Marquee from "react-fast-marquee";

import { useTokenData } from "@/api/getTokenData";

type ItemProps = {
  name: string;
  content: string | number;
  positive?: boolean;
  negative?: boolean;
};

const Item = ({ name, content, positive, negative }: ItemProps) => {
  return (
    <span className="mx-12 marquee-font">
      <span>{name}:</span>{" "}
      <span
        className={classNames({
          "text-red-500": negative,
          "text-green-500": positive,
        })}
      >
        {content}
      </span>
    </span>
  );
};

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
          <Item name={"Valor"} content={tokenData?.tokenPriceInUSD || "$0"} />
          <Item
            name={"Diferencial de Valor (24h)"}
            content={tokenData?.changeIn24H || "0%"}
            positive={tokenData?.changeIn24H?.includes("+")}
            negative={tokenData?.changeIn24H?.includes("-")}
          />
          <Item
            name={"Diferencial de Valor (1h)"}
            content={tokenData?.changeIn1H || "0%"}
            positive={tokenData?.changeIn1H?.includes("+")}
            negative={tokenData?.changeIn1H?.includes("-")}
          />
          <Item
            name={"Volume (24h)"}
            content={tokenData?.volumeIn24H || "$0"}
          />
          <Item
            name={"Valor de Mercado"}
            content={tokenData?.marketCap || "$0"}
          />
          <Item
            name={"Ordens (24h)"}
            content={tokenData?.transactions24H || 0}
          />

          <Item
            name={"Vendas (24h)"}
            content={tokenData?.sell24H || 0}
            negative
          />
          <Item
            name={"Compras (24h)"}
            content={tokenData?.buy24H || 0}
            positive
          />
          <Item name={"Oferta Total"} content={tokenData?.totalSupply || "0"} />
          <Item name={"Detentores"} content={tokenData?.holders || "7K"} />

          <Item name={"Idade"} content={`${ageInDays}d`} />
        </div>
      </Marquee>
    </div>
  );
};

export default TokenMarquee;
