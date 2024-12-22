'use client'
import Loading from "@/components/shared/Loading";
import { useGetAllShopsForPublic } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function AllShops() {
    const {data:results,isLoading}= useGetAllShopsForPublic();


    const shops = results?.data.data;
  
    
    return (
        <div className="my-5 container mx-auto">
<h2 className="text-2xl text-center py-10">Shops</h2>

<div className="grid gap-4 grid-cols-2 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8  justify-center items-center ">
    
    
{
   !isLoading &&  shops?.map((shop:any)=>(
    <div className="text-center gap-3 flex flex-col bg-gray-700/45 hover:bg-slate-400/45 p-10 h-72 rounded-md justify-center items-center" key={shop.id.toString()}>
        <Link href={`/shop/${shop.id}`}>
        <Image className=" mx-auto border border-blue-700/15 shadow-lg object-cover w-24 h-24" src={shop?.logo} alt={shop.name}/>
        <h2 className="text-md">{shop.name}</h2>
        <p className="text-[11px]">{shop.description}</p>
        </Link>

        <p className="p-2 bg-slate-400/5 rounded-md">
           Total Items: {shop?.totalProducts}
        </p>
    </div>
))
}
  
    </div>      </div>
    );
}