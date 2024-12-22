'use client'
import Loading from "@/components/shared/Loading";
import CategoryCardSkeleton from "@/components/skeletons/CategoriesSkeleton";
import ShopMiniCardSkeleton from "@/components/skeletons/ShopMiniCardSkelton";
import { useGetAllShopsForPublic } from "@/hooks/shops.hook";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export default function TopShops() {
    const {data:results,isLoading}= useGetAllShopsForPublic();

  

    const shops = results?.data.data;
    
    return (
        <div className="my-5 flex flex-col justify-center items-center container mx-auto">
<h2 className="text-2xl text-center py-10">Top Shops</h2>

<div className="grid p-2 md:p-0 gap-4 grid-cols-3 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 justify-center items-center ">
    
    
{
     isLoading
     ? Array.from({ length: 10 }).map((_, index) => (
         <ShopMiniCardSkeleton key={index} />
       ) ):

    shops?.slice(0,10).map((shop:any)=>(
        <div className="text-center flex flex-col justify-center items-center" key={shop.id.toString()}>
            <Link href={`/shop/${shop.id}`}>
            <Image className=" mx-auto border border-blue-700/15 shadow-lg object-cover 2xl:size-40 size-24" src={shop?.logo} alt={shop.name}/>
            <h2 className="text-sm">{shop.name}</h2>
            </Link>
        </div>
    ))
}
  
    </div>   
    <Link href={"/shop"}><Button className="my-5" variant="bordered">See all shop</Button></Link>
       </div>
    );
}