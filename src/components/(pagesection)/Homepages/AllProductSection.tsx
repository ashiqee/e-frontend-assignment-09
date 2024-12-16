"use client"
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

import ProductCard from '@/components/ui/cards/ProductCard';
import { useGetAllProductsForPublic } from '@/hooks/products.hook';
import { useRouter } from 'next/navigation';


interface QueryState {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    searchTerm?: string;
  }

const AllProductSection =  () => {
    const [query, setQuery] = useState<QueryState>({
        sortBy: 'createdAt',
        sortOrder: 'asc',
        page: 1,
        limit: 20,
        searchTerm: '',
     });
    const {data:flashSaleProduct ,isLoading}= useGetAllProductsForPublic(query);
    const router = useRouter()

const products= flashSaleProduct?.data.products || []



  
    return (
        <div className='my-10  gap-4 container mx-auto'>
          <h2 className="text-2xl text-center py-10">All Products</h2>
           
 <div>
 <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 mx-4 md:mx-0">
    {products.map((item:any, index:number) => (
     
      <ProductCard key={index} index={index} item={item} />

    ))}
    </div>
    {
      products?.length > 20 && <Button onClick={()=>router.push("/shop")}  className='flex mt-4 mx-auto justify-center' color='warning' variant='bordered' >View More</Button>

    }
    </div>    </div>
    );
};

export default AllProductSection;