'use client'
import Loading from "@/components/shared/Loading";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useGetAllShopProduct, useGetAllVendorShopsOrders } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function AllVendorShopCards({id}:{id:string}) {
    const {data,isLoading}= useGetAllShopProduct(id)

    if(isLoading){
        return <Loading/>
    }
    const shops=data?.data;
    const products= shops?.products;
 

  

    
    
    return (
       <div className=" w-full ">

     <div className="flex flex-col p-2 shadow-lg justify-center items-center">
     <Image src={shops?.logo} alt={shops.name} className="w-full  h-72 "/>
     <h2 className="text-2xl xl:text-3xl font-bold">{shops.name}</h2>
     </div>
         <div className="container mx-auto">
<div className="grid my-10 grid-cols-2 2xl:grid-cols-8 md:grid-cols-6 gap-4 items-center">
    {
         isLoading
         ? Array.from({ length: 10 }).map((_, index) => (
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