'use client'
import Loading from "@/components/shared/Loading";
import { useGetAllCategoriesForPublic } from "@/hooks/categories.hook";
import { useGetAllShopsForPublic } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";

export default function TopProductsCategories() {
    const {data:results,isLoading}= useGetAllCategoriesForPublic();
    console.log(results);
    

    if(isLoading){
        return <Loading/>
    }

    const categories = results?.data || [];
    
    
    return (
        <div className="my-5 container mx-auto">
<h2 className="text-2xl text-center py-10">Shop with Categories</h2>

<div className="grid gap-4 grid-cols-4 md:grid-cols-12 xl:grid-cols-14 2xl:grid-cols-16 justify-center items-center ">
    
    
{
    categories?.slice(0,10).map((cat:any)=>(
        <div className="text-center flex flex-col justify-center items-center" key={cat.id.toString()}>
            <Link href={`/shop?searchTerm=${cat.name}`}><Image className=" mx-auto border border-blue-700/15 shadow-lg object-cover size-16" src={cat?.image} alt={cat.name}/>
            <h2 className="text-sm">{cat.name}</h2></Link>
        </div>
    ))
}
  
    </div>      </div>
    );
}