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

<div className="grid p-2 md:p-0 gap-4 grid-cols-5 md:grid-cols-7  justify-center items-center ">

        
{
   isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ) ):

    categories?.slice(0,10).map((cat:any)=>(
        <div className="text-center flex flex-col h-28 p-6 shadow hover:shadow-2xl rounded-lg justify-center items-center" key={cat.id.toString()}>
            <Link href={`/shop?searchTerm=${cat.name}`}><Image className="w-20 h-20 mx-auto   shadow-lg object-cover " src={cat?.image} alt={cat.name}/>
            <h2 className="text-[12px] text-center">{cat.name}</h2></Link>
        </div>
    ))
}

  
    </div>      </div>
    );
}