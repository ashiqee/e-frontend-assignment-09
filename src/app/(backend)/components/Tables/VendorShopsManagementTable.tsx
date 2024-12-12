'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ArrowDownWideNarrowIcon } from 'lucide-react';

import ShopDropDownAction from '../Dropdown/ShopDropDownAction';

import useDebounce from '@/hooks/useDebounce';
import { useGetAllVendorMyShops } from '@/hooks/shops.hook';
import VendorShopDropDownAction from '../Dropdown/VednorShopDropDownAction';

interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const VendorShopsManagementTable = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
    searchTerm: '',
 });

  const { data: results, isLoading } = useGetAllVendorMyShops(query);
  const [page, setPage] = useState(1); 
  const [limit] = useState(2); 
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



  const shops = results?.data?.data || [];
  const totalShops = results?.data?.paginateData?.total || 0;

  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalShops / limit));
  }, [totalShops, limit]);

  return (
    <>
      <form className='flex justify-between '>
        <Input
          className="max-w-60 py-3"
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            <DropdownItem key="role">Sort by Status</DropdownItem>
            <DropdownItem key="asc">Ascending</DropdownItem>
            <DropdownItem key="desc">Descending</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </form>
   {isLoading && <p>Loading...</p>}

{shops.length > 0 &&  <>


  <Table aria-label="Vendor Shops Management Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Shop Name</TableColumn> 
          <TableColumn>Total Products</TableColumn> 
          <TableColumn>Total Orders</TableColumn>
          <TableColumn>Total Followers</TableColumn> 
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody >
          {shops?.map((shop: any, i: number) => (
            <TableRow key={shop.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>{(page - 1) * limit + i + 1}</TableCell>
              <TableCell>
                <Image className="w-12 h-12 hover:scale-150" src={shop.logo} />
              </TableCell>
              <TableCell>{shop.name}</TableCell>
             
              <TableCell>{shop.totalProducts}</TableCell>
              <TableCell>{shop.totalOrders}</TableCell>
              <TableCell>
                {shop.totalFollorwers}
             
              </TableCell>
              <TableCell>{shop.status}</TableCell>
              <TableCell>
                    {/* action modal  */}
              <VendorShopDropDownAction 
              id={shop.id}
              isDeleted={shop.isDeleted}
              data={shop}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2  flex justify-between items-center">
        <p>
          Total Shops : {totalShops}
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

export default VendorShopsManagementTable;
