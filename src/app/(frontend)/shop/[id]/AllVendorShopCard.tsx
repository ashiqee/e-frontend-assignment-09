'use client'
import Loading from "@/components/shared/Loading";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useUser } from "@/context/user.provider";
import { useGetAllShopProduct, useGetAllVendorShopsOrders } from "@/hooks/shops.hook";
import { addFollowUnfollow } from "@/services/VendorShopService";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { Star, Stars } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function AllVendorShopCards({id}:{id:string}) {
    const {data,isLoading,refetch}= useGetAllShopProduct(id)
    const [isFollowing, setIsFollowing] = useState(false);
    const {user,isLoading:userLoading}=useUser()


    const shops=data?.data;
    const products= shops?.products;

 

    useEffect(() => {
      if (!userLoading && user && shops?.followers) {
          const userId = user.id as string;
          const alreadyFollowing = shops.followers.some((follower: { id: string; }) => follower.id === userId);
          setIsFollowing(alreadyFollowing);
      }
  }, [userLoading, user, shops]);
  

    const handleFollowToggle = async () => {
      const shopId ={ shopId:shops?.id};
      const res =  await addFollowUnfollow(shopId)
     
      
      if(res?.success){
        toast.success(res?.message)}
      setIsFollowing((prev) => !prev);
      refetch();
    };
    
    return (
       <div className=" w-full  ">

     <div className="flex flex-col  md:flex-row container mx-auto p-6 shadow bg-slate-500/5 rounded-md shadow-blue-400/5 md:justify-between md:items-center">
    {
        isLoading ?  <> 
        
        <div className=" w-full p-6 flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-28 h-28" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
        
         </>  : <>
   <div className="flex gap-3">
   <Image src={shops?.logo} alt={shops?.name} className="object-cover rounded-full w-28 h-28 "/>
   <div>
   <h2 className="text-2xl xl:text-3xl font-bold">{shops?.name}</h2>
   <p className="text-sm pt-2">{shops?.description}</p>
   <div className="flex gap-3 md:hidden items-center">
   <p className=" flex items-center gap-2  text-sm p-1 my-2 md:p-4 rounded-md"><Stars size={14}/> 1000</p>
   <Button size="sm" className={`${isFollowing ? 'bg-slate-300/15' : 'bg-pink-600/45 text-white'}   mx-auto`} 
   onClick={handleFollowToggle}>
        {isFollowing ? 'Follow Now' : 'Unfollow'}
      </Button>
   </div>
   </div>
   </div>

   <div className="space-y-3 max-w-44 flex-end hidden md:flex w-full md:items-center  flex-col justify-end md:justify-center">
      <p className="bg-slate-300/15 flex items-center gap-2  text-sm p-2 md:p-4 rounded-md"><Stars size={20}/>{shops?.followers?.length||0}</p>
      {/* Conditional rendering based on isFollowing */}
      <Button size="sm" className="dark:bg-slate-300/15 bg-sky-800 text-white  mx-auto" onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow Now'}
      </Button>
    </div>
        </>
    }
     </div>
         <div className="container mx-auto">
<div className="grid px-4 my-10 grid-cols-2  md:grid-cols-6 gap-4 items-center">
    {
         isLoading
         ? Array.from({ length: 6 }).map((_, index) => (
             <ProductCardSkeleton key={index} />
           ) ):
        products?.map((product:any)=>(
            <div key={product.id.toString()}>
                <ProductCard item={product} index={product.id.toString()}/>
            
            
            </div>
        ))
    }
</div>

        </div>
       </div>
    );
}