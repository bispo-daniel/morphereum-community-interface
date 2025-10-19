import Marquee from "react-fast-marquee";

import IconMap from "@/components/IconMap";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logoMap } from "@/utils/logoMap";

const TrendingMetricsMarquee = ({
  links,
  raids,
  producers,
}: {
  links?: { count: number; label: string; icon: string }[];
  raids?: { count: number; date: string; platform: string }[];
  producers?: {
    creator: string;
    xProfile: string;
    count: number;
    approvedCount: number;
  }[];
}) => {
  return (
    <div className="h-[80px] w-full overflow-hidden">
      <Marquee
        pauseOnHover
        autoFill
        className="h-[80px] select-none overflow-hidden"
        direction="right"
      >
        {raids &&
          raids.map((raid, index) => (
            <TooltipProvider key={`raid-${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group flex h-[80px] w-[120px] flex-col items-center justify-between gap-2 p-2 hover:cursor-pointer">
                    <div>{logoMap[raid.platform] || logoMap["Solana"]}</div>
                    <span className="text-xs group-hover:underline">
                      {raid.count} acessos
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{raid.platform}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

        {links &&
          links.map((link, index) => (
            <TooltipProvider key={`link-${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group flex h-[80px] w-[120px] flex-col items-center justify-between gap-2 p-2 hover:cursor-pointer">
                    <div>
                      <IconMap icon={link.icon} size={32} />
                    </div>
                    <span className="text-xs group-hover:underline">
                      {link.count} acessos
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

        {producers &&
          producers.map((producer, index) => (
            <div
              key={`producer-${index}`}
              className="flex h-[60px] w-[120px] flex-col items-center justify-between gap-1 p-2"
            >
              <p
                className="max-w-[120px] truncate hover:cursor-pointer hover:underline"
                onClick={() => window.open(producer.xProfile, "_blank")}
              >
                {producer.creator}
              </p>
              <span className="text-xs">
                {producer.count} {producer.count === 1 ? "post" : "posts"}
              </span>
            </div>
          ))}
      </Marquee>
    </div>
  );
};

export default TrendingMetricsMarquee;
