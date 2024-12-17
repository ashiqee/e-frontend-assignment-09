'use client'
import Loading from "@/components/shared/Loading";
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
        <div>
<h2 className="text-2xl">{shops.name}</h2>
<div className="grid my-10 grid-cols-2 2xl:grid-cols-10 md:grid-cols-6 gap-4 items-center">
    {
        products?.map((product:any)=>(
            <div key={product.id.toString()}>
                <ProductCard item={product} index={product.id.toString()}/>
            
            
            </div>
        ))
    }
</div>

        </div>
    );
}