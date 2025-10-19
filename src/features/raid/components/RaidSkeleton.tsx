import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonProps {
  width: number;
}

const SkeletonBullet: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <div className="flex gap-2 mt-4">
      <span className="flex h-[10px] items-center">•</span>
      <Skeleton
        className="h-[10px] rounded-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const SkeletonH2: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="my-6 h-[16px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const SkeletonH1: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="mt-4 h-[20px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const SkeletonP: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="mt-4 h-[10px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const RaidSkeleton = () => {
  return (
    <>
      <SkeletonH1 width={85} />
      <SkeletonH2 width={30} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
      <Separator className="my-6 h-[2px] bg-[hsl(var(--primary))]" />
      <SkeletonH2 width={25} />
      <SkeletonBullet width={32} />
      <SkeletonBullet width={23} />
      <SkeletonBullet width={42} />
      <SkeletonBullet width={15} />
      <Separator className="my-6 h-[2px] bg-[hsl(var(--primary))]" />
      <SkeletonH2 width={42} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
    </>
  );
};

export default RaidSkeleton;
