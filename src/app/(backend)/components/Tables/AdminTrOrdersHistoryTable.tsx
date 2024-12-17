'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ArrowDownWideNarrowIcon } from 'lucide-react';


import CreateVendorShopModal from '../Modals/ShopsModal/CreateVendorShopModal';

import useDebounce from '@/hooks/useDebounce';
import { useGetAllUserOrderHistoryForAdmin, useGetUserOrderHistory } from '@/hooks/orders.hook';
import OrderListModal from '../Modals/OrdersListModal/OrderListModal';
import { format } from "date-fns";

interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const AdminTrOrdersHistory = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
    searchTerm: '',
 });

  const { data: results, isLoading } = useGetAllUserOrderHistoryForAdmin(query);
  const [page, setPage] = useState(1); 
  const [limit] = useState(10); 
  const [total, setTotal] = useState(0); 
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [isAddOpen,setIsAddOpen]=useState(false)
  const [orderItems,setOrderItems]=useState()
 

  

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


  const orders = results?.data.data || [];
  const totalOrders = results?.data?.paginateData.total || 0;

  console.log(results);
  


  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalOrders / limit));
  }, [totalOrders, limit]);

  return (
    <>
     {
            orderItems && <OrderListModal  exitsData={orderItems} setIsOpen={setOrderItems}/>
        }
      <form className='md:flex justify-between'>
      <div className='flex gap-2 items-center'>
       <Input
          className="max-w-60 py-3"
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

{orders.length > 0 &&  <>


  <Table aria-label="Vendor Shops Management Table">
        <TableHeader>
          <TableColumn>Date & Time</TableColumn>
          <TableColumn>Order ID</TableColumn>
        
          <TableColumn>Items List</TableColumn> 
          <TableColumn>Total Items</TableColumn> 
         
          <TableColumn>Total Price</TableColumn> 
          <TableColumn>Order Status</TableColumn>
          <TableColumn>Payment Status</TableColumn>
        </TableHeader>
        <TableBody >
          {orders?.map((order: any, i: number) => (
            <TableRow key={order.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>{format(new Date(order.createdAt), "dd/MM/yyyy hh:mm a")}</TableCell>
              <TableCell>ORDER-ID-{order.id}</TableCell>
             
              <TableCell>

                <Button variant='shadow' onClick={()=>setOrderItems(order.orderItems)}>SEE Order Items</Button>
              </TableCell>
             
              <TableCell> {order?.orderItems?.reduce((total:any, item:any) => total + item.quantity, 0)}</TableCell>
           
              <TableCell>
                {order.totalPrice}
             
              </TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                   
                    {order.paymentStatus === "PAID" ?
                   <Button className='p-2 bg-green-400/15'>PAID</Button> 
                  : <Button>PENDING</Button>
                  }
             
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2  flex justify-between items-center">
        <p>
          Total orders : {totalOrders}
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

export default AdminTrOrdersHistory;
