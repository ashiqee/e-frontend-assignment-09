import React from 'react';
import {Card, Skeleton} from "@nextui-org/react";


const ShopMiniCardSkeleton = () => {
    return (
        <Card className="w-full min-w-28 h-[200px] space-y-5 p-4" radius="lg">
            <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-96 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          
          <Skeleton className="w-2/5 rounded-lg">  
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
};

export default ShopMiniCardSkeleton;