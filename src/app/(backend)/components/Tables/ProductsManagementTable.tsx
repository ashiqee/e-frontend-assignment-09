'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ArrowDownWideNarrowIcon } from 'lucide-react';


import VendorShopDropDownAction from '../Dropdown/VednorShopDropDownAction';

import useDebounce from '@/hooks/useDebounce';
import { useGetAllVendorMyShops } from '@/hooks/shops.hook';
import CreateProductModal from '../Modals/ShopsModal/CreateProductModal';
import { useGetAllCategories, useGetAllCategoriesForPublic } from '@/hooks/categories.hook';
import ProductDropDownAction from '../Dropdown/ProductDropDownAction';
import { useGetAllProductsMyShops } from '@/hooks/products.hook';


interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const ProductsManagementTable = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
    searchTerm: '',
 });

  const { data: vendorResults, isLoading: vendorLoading } = useGetAllVendorMyShops(query);
  const { data: productsResults, isLoading } = useGetAllProductsMyShops(query);

  const { data: catResults, isLoading:catLoading } = useGetAllCategoriesForPublic();
  const [page, setPage] = useState(1); 
  const [limit] = useState(5); 
  const [total, setTotal] = useState(0); 
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [isAddOpen,setIsAddOpen]=useState(false)


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



  const products = productsResults?.data?.data || [];
  const shops = vendorResults?.data?.shops || [];
  const categories = catResults?.data || [];
  const totalProducts = productsResults?.data?.paginateData?.total || 0;


  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalProducts / limit));
  }, [totalProducts, limit]);

  return (
    <>
     {
            isAddOpen && <CreateProductModal 
            setIsOpen={setIsAddOpen} 
            shops={shops}
            categories={categories}
            />
        }
      <form className='flex justify-between '>
      <div className='flex gap-2 items-center'>
       <Input
          className="max-w-60 py-3"
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button className="  px-6"  onClick={()=>setIsAddOpen(true)}>Add New Product</Button>
       </div>
        <div>
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 flex gap-2 border-1 rounded-md text-white ">
            <ArrowDownWideNarrowIcon/> Sort By: {sortBy} ({sortOrder}) 
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sort Options"
            onAction={(key) => {
              if (key === 'createdAt' || key === 'status') {
                setSortBy(key);
              } else if (key === 'asc' || key === 'desc') {
                setSortOrder(key as 'asc' | 'desc');
              }
            }}
          >
            <DropdownItem key="createdAt">Sort by Created At</DropdownItem>
            <DropdownItem key="shop">Sort by Shop</DropdownItem>
            <DropdownItem key="asc">Ascending</DropdownItem>
            <DropdownItem key="desc">Descending</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </form>
   {isLoading && <p>Loading...</p>}

{products.length > 0 &&  <>

   
  <Table aria-label="Products Management Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Product Name</TableColumn> 
          <TableColumn>Product Category</TableColumn> 
          <TableColumn>Product Price</TableColumn> 
          <TableColumn>Stock Qty</TableColumn>
          <TableColumn>Discount</TableColumn> 
          <TableColumn>FlashSale Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody >
          {products?.map((product: any, i: number) => (
            <TableRow key={product.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>{(page - 1) * limit + i + 1}</TableCell>
              <TableCell>
                <Image className="w-12 h-12 hover:scale-150" src={product.images[0]} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
             
              <TableCell>{product?.category?.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                {product.inventoryCount}
             
              </TableCell>
              <TableCell>{product.discount}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                    {/* action modal  */}
              <ProductDropDownAction 
              data={product}
              id={product.id}
              shops={shops}
              categories={categories}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2  flex justify-between items-center">
        <p>
          Total Products : {totalProducts}
        </p>
        <Pagination 
       
          color="primary" 
          page={page} 
          total={total} 
          onChange={(pageNumber) => setPage(pageNumber)} 
        />
      </div>
</>


}
    </>
  );
};

export default ProductsManagementTable;
