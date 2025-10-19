import Marquee from "react-fast-marquee";

import { Skeleton } from "@/components/ui/skeleton";

const Item = () => {
  return (
    <div className="flex h-[80px] w-[120px] flex-col items-center justify-between gap-3 p-2">
      <Skeleton className="h-[50px] w-[50px] rounded-full" />
      <Skeleton className="h-4 w-[80px]" />
    </div>
  );
};

const MarqueeSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <Marquee
        pauseOnHover
        autoFill
        className="z-0 overflow-hidden select-none"
        direction="right"
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Marquee>
    </div>
  );
};

export default MarqueeSkeleton;
