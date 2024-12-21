import { Skeleton } from "@nextui-org/react";

export default function ProductDetailsSkeleton() {
    return (
        <div className="mx-4 md:mx-0">
          <section className="md:flex gap-6">
            {/* Left Skeleton */}
            <div className="md:flex flex md:flex-row flex-col-reverse gap-3">
              <div className="px-4 md:w-[160px] md:h-[600px]">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-24 mb-4 rounded-md" />
                ))}
              </div>
              <div className="overflow-hidden md:min-w-[600px] md:h-[600px]">
                <Skeleton className="w-full h-full rounded-md" />
              </div>
            </div>
            {/* Right Skeleton */}
            <div className="h-[600px] w-full overflow-hidden">
              <div className="space-y-5 mt-5 md:mt-0">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-full mt-6 rounded-md" />
              </div>
            </div>
          </section>
          <section className="container my-10 mx-auto">
            <Skeleton className="h-24 w-full rounded-md" />
          </section>
        </div>
      );
}