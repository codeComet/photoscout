import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="">
      <Skeleton className="h-[300px] w-[300px] rounded-xl" />
    </div>
  );
}
