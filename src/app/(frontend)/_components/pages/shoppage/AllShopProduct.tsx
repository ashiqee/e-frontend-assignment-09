"use client"

import ShopSidebar from '@/components/shared/bar/ShopSidebar';
import ProductCard from '@/components/ui/cards/ProductCard';
import { useGetAllProductsForPublic } from '@/hooks/products.hook';
import useDebounce from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react';


interface QueryState {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    searchTerm?: string;
  }

const AllShopProducts = () => {
    const [query, setQuery] = useState<QueryState>({
        sortBy: 'createdAt',
        sortOrder: 'asc',
        page: 1,
        limit: 20,
        searchTerm: '',
     });


    const {data: productResults, isLoading}  = useGetAllProductsForPublic(query)

    const [page, setPage] = useState(1); 
    const [limit] = useState(20); 
    const [total, setTotal] = useState(0); 
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const debouncedSearchTerm = useDebounce(searchTerm);
   
  
  
    useEffect(() => {
      // Update the query when page, limit, sortBy, or sortOrder changes
      setQuery((prev) => ({
        ...prev,
        page,
        limit,
        sortBy,
        sortOrder,
      }));
    }, [page, limit, sortBy, sortOrder]);
  
  
    useEffect(() => {
      // Update the query with the debounced searchTerm
      setQuery((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }, [debouncedSearchTerm]);
  
  
    const products = (productResults as { data: { products: any[] } })?.data?.products || [];

    return (
        <section className="mx-8 my-10 flex gap-6">

<ShopSidebar/>

<div className="w-full">

            
    {
        isLoading ? (
            <div>Loading...</div>
        ) : (
            <div className="gap-3 md:gap-4 grid grid-cols-2 sm:grid-cols-4 mx-4 md:mx-0">
            {products.map((item:any, index:number) => (
             
              <ProductCard key={index} index={index} item={item} />
        
            ))}
            </div>
        )
    }

</div>


        </section>
    );
};

export default AllShopProducts;