'use client'
import Loading from "@/components/shared/Loading";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useGetAllShopProduct, useGetAllVendorShopsOrders } from "@/hooks/shops.hook";
import { Button, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";

export default function AllVendorShopCards({id}:{id:string}) {
    const {data,isLoading}= useGetAllShopProduct(id)

    const shops=data?.data;
    const products= shops?.products;
 

  

    
    
    return (
       <div className=" w-full  ">

     <div className="flex container mx-auto p-6 shadow bg-slate-500/5 rounded-md shadow-blue-400/5 justify-between items-center">
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
   <h2 className="text-2xl xl:text-3xl font-bold">{shops?.name}</h2>
   </div>

   <div className="space-y-3 flex flex-col justify-center">
    <p className="bg-slate-300/15 p-4 rounded-md">Total Followers: 1000</p>
    {false ? <Button>Unfollow</Button>  : <Button>Follow Now</Button> }
   </div>
        </>
    }
     </div>
         <div className="container mx-auto">
<div className="grid my-10 grid-cols-2  md:grid-cols-6 gap-4 items-center">
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