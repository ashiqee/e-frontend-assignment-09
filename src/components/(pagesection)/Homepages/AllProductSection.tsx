"use client"
import React, { useState } from 'react';


import ProductCard from '@/components/ui/cards/ProductCard';
import { useGetAllProductsForPublic } from '@/hooks/products.hook';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';


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

const products= flashSaleProduct?.data.products || []



  
    return (
        <div className='my-20  gap-4 container mx-auto'>
           
 <div>
 <div className="gap-3 md:gap-4 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 mx-4 md:mx-0">
    {products.map((item:any, index:number) => (
     
      <ProductCard key={index} index={index} item={item} />

    ))}
    </div>
    <Link href={`/shop?flashSale=true`}> <Button  variant='bordered' color='warning' className='flex mt-4 mx-auto justify-center' >View More</Button>
    </Link>
    </div>    </div>
    );
};

export default AllProductSection;