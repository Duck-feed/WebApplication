import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <Card className="flex flex-col border-2 rounded-xl w-full max-w-[640px] pt-4 pb-4 bg-white">
      <div className="flex flex-row items-start pl-4">
        <Skeleton className="mr-3 h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-3 pr-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
      <CardFooter className="mt-4 flex flex-row gap-4 pl-12">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </CardFooter>
    </Card>
  );
}