import {Skeleton} from "@nextui-org/react";

export default function ProfileSkeleton() {
  return (
    <div className="h-72 w-full justify-center px-4 flex items-center gap-3">
      <div>
        <Skeleton className="md:w-12 md:h-12 w-24 shadow hover:shadow-lg shadow-primary-300 rounded-full"/>
      </div>  
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
      </div>
    </div>
  );
}