'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ArrowDownWideNarrowIcon } from 'lucide-react';



import CategoriesDropDownAction from '../Dropdown/CategoriesDropDownAction';
import CreateCategoriesModal from '../Modals/CategoriesModal/CreateCategoriesModal';

import useDebounce from '@/hooks/useDebounce';
import { useGetAllCategories } from '@/hooks/categories.hook';

interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const P_CategoriesManagementTable = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
    searchTerm: '',
 });

  const { data: results, isLoading } = useGetAllCategories(query);
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



  const categories = results?.data?.data || [];

  // const categories = (results as {data: {categories: {data: any[]}}} )?.data?.data || [];

 
  const totalCategories = results?.data?.paginateData?.total || 0;

  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalCategories / limit));
  }, [totalCategories, limit]);

  return (
    <>
      {
            isAddOpen && <CreateCategoriesModal setIsOpen={setIsAddOpen} />
        }
      <form className='md:flex justify-between justify-center'>
       <div className='flex gap-2 items-center'>
       <Input
          className="max-w-60 py-3"
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button className="  px-6"  onClick={()=>setIsAddOpen(true)}>Add New Category</Button>
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
            <DropdownItem key="role">Sort by Status</DropdownItem>
            <DropdownItem key="asc">Ascending</DropdownItem>
            <DropdownItem key="desc">Descending</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </form>
   {isLoading && <p>Loading...</p>}

{categories.length > 0 &&  <>


  <Table aria-label="User Management Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Icon</TableColumn>
          <TableColumn>Category Name</TableColumn> 
          <TableColumn>Category Description</TableColumn> 
          <TableColumn>Total Products</TableColumn> 
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody >
          {categories?.map((item: any, i: number) => (
            <TableRow key={item.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Image className="w-12 h-12 hover:scale-150" src={item.logo} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.description}
               
              </TableCell>
              <TableCell>{item.totalProducts}</TableCell>
              
              <TableCell>
                    {/* action modal  */}
              <CategoriesDropDownAction 
              data={item}
              id={item.id}
              isDeleted={item.isDeleted}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2  flex justify-between items-center">
        <p>
          Total Categories : {totalCategories}
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

export default P_CategoriesManagementTable;
