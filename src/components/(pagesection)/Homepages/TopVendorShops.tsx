'use client'
import Loading from "@/components/shared/Loading";
import { useGetAllShopsForPublic } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function TopShops() {
    const {data:results,isLoading}= useGetAllShopsForPublic();

    if(isLoading){
        return <Loading/>
    }

    const shops = results?.data.data;
    
    return (
        <div className="my-5 container mx-auto">
<h2 className="text-2xl text-center py-10">Top Shops</h2>

<div className="grid gap-4 grid-cols-2 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 justify-center items-center ">
    
    
{
    shops?.slice(0,10).map((shop:any)=>(
        <div className="text-center flex flex-col justify-center items-center" key={shop.id.toString()}>
            <Link href={`/shop/${shop.id}`}>
            <Image className=" mx-auto border border-blue-700/15 shadow-lg object-cover size-28" src={shop?.logo} alt={shop.name}/>
            <h2 className="text-sm">{shop.name}</h2>
            </Link>
        </div>
    ))
}
  
    </div>      </div>
    );
}