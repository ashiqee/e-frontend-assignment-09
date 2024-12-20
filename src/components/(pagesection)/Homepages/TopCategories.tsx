'use client'
import Loading from "@/components/shared/Loading";
import CategoryCardSkeleton from "@/components/skeletons/CategoriesSkeleton";
import ProductCardSkeleton from "@/components/skeletons/ProductssSkeleton";
import { useGetAllCategoriesForPublic } from "@/hooks/categories.hook";
import { useGetAllShopsForPublic } from "@/hooks/shops.hook";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Suspense } from "react";

export default function TopProductsCategories() {
    const {data:results,isLoading}= useGetAllCategoriesForPublic();
    

    const categories = results?.data || [];
    
    
    return (
        <div className="my-5 container mx-auto">
<h2 className="text-2xl text-center py-10">Shop with Categories</h2>

<div className="grid p-2 md:p-0 gap-4 grid-cols-5 md:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-14 justify-center items-center ">

        
{
   isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ) ):

    categories?.slice(0,10).map((cat:any)=>(
        <div className="text-center flex flex-col h-28 justify-center items-center" key={cat.id.toString()}>
            <Link href={`/shop?searchTerm=${cat.name}`}><Image className=" mx-auto border border-blue-700/15  shadow-lg object-cover size-16" src={cat?.image} alt={cat.name}/>
            <h2 className="text-[10px] text-center">{cat.name}</h2></Link>
        </div>
    ))
}

  
    </div>      </div>
    );
}