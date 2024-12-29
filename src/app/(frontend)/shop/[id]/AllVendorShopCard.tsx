'use client'
import Loading from "@/components/shared/Loading";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useGetAllShopProduct, useGetAllVendorShopsOrders } from "@/hooks/shops.hook";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { Stars } from "lucide-react";
import { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";


export default function AllVendorShopCards({id}:{id:string}) {
    const {data,isLoading}= useGetAllShopProduct(id)
    const [isFollowing, setIsFollowing] = useState(false);


    const shops=data?.data;
    const products= shops?.products;
 

  console.log(shops);
  

    const handleFollowToggle = () => {
      setIsFollowing((prev) => !prev);
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
   <div className="flex gap-3 items-center">
   <p className=" flex items-center gap-2 md:hidden text-sm p-1 my-2 md:p-4 rounded-md"><Stars size={14}/> 1000</p>
   <Button size="sm" className="bg-slate-300/15   mx-auto" onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow Now'}
      </Button>
   </div>
   </div>
   </div>

   <div className="space-y-3 max-w-44 flex-end hidden md:flex w-full  flex-col justify-end md:justify-center">
      <p className="bg-slate-300/15  text-sm p-2 md:p-4 rounded-md">Total Followers: 1000</p>
      {/* Conditional rendering based on isFollowing */}
      <Button size="sm" className="bg-slate-300/15   mx-auto" onClick={handleFollowToggle}>
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