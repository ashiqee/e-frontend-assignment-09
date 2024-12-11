'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ActivityIcon, ArrowDownWideNarrowIcon } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { useGetAllShops } from '@/hooks/shops.hook';

interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const ShopsManagementTable = () => {
  const { data: results, mutate: fetchData, isPending,isSuccess } = useGetAllShops();

  const [page, setPage] = useState(1); 
  const [limit] = useState(2); 
  const [total, setTotal] = useState(0); 
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [query, setQuery] = useState<QueryState>({
     sortBy: 'createdAt',
     sortOrder: 'asc',
     page: 1,
     limit: 10,
     searchTerm: '',
  });

  

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

  useEffect(() => {
    // Fetch data whenever query changes
    fetchData(query);
  }, [query, fetchData]);

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
          type="text"
          name="searchTerm"
          className="max-w-60 py-3"
          placeholder="Search here..."
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
   {isPending && <p>Loading...</p>}

{shops.length > 0 &&  <>


  <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Shop Name</TableColumn> 
          <TableColumn>Owner Info</TableColumn> 
          <TableColumn>Total Products</TableColumn> 
          <TableColumn>Total Orders</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody >
          {shops?.map((shop: any, i: number) => (
            <TableRow className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md' key={shop.id}>
              <TableCell>{(page - 1) * limit + i + 1}</TableCell>
              <TableCell>
                <Image src={shop.logo} className="w-12 h-12 hover:scale-150" />
              </TableCell>
              <TableCell>{shop.name}</TableCell>
              <TableCell>
                {shop.ownerName}
                <br />
                {shop.contactNumber}
              </TableCell>
              <TableCell>{shop.totalProducts}</TableCell>
              <TableCell>{shop.totalOrders}</TableCell>
              <TableCell>{shop.status}</TableCell>
              <TableCell>
                <ActivityIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2 flex justify-center">
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

export default ShopsManagementTable;
