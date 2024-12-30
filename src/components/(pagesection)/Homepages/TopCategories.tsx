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

<div className="grid p-2 md:p-0 gap-2 md:gap-4 grid-cols-4 md:grid-cols-7  justify-center items-center ">

        
{
   isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ) ):

    categories?.slice(0,14).map((cat:any)=>(
        <div className="text-center bg-gray-300/45 dark:bg-slate-600/25 flex flex-col h-24 w-20 md:h-32 md:w-full p-2  md:p-6 shadow hover:shadow-2xl rounded-lg justify-center items-center" key={cat.id.toString()}>
            <Link className="flex flex-col justify-center items-center" href={`/shop?searchTerm=${cat.name}`}><Image className="md:w-14 md:h-14 h-10 w-10  mx-auto   shadow-lg object-cover " src={cat?.image} alt={cat.name}/>
            <h2 className="text-[12px] text-center">{cat.name}</h2></Link>
        </div>
    ))
}

  
    </div>      </div>
    );
}