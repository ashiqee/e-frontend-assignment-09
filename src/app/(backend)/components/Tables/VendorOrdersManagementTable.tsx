'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ArrowDownWideNarrowIcon } from 'lucide-react';


import CreateProductModal from '../Modals/ShopsModal/CreateProductModal';
import ProductDropDownAction from '../Dropdown/ProductDropDownAction';

import useDebounce from '@/hooks/useDebounce';
import { useGetAllVendorMyShops } from '@/hooks/shops.hook';
import { useGetAllCategoriesForPublic } from '@/hooks/categories.hook';
import { useGetAllProductsMyShops } from '@/hooks/products.hook';
import OrderStatusChangeDropdown from '../Dropdown/OrderStatusChangeDropDown';
import ShopSelectOption from '../Selects/ShopSelectOption';


interface QueryState {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const VendorOrdersManagementTable = () => {
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



  const products = productsResults?.data?.vendorAllProducts || [];
  const orders = vendorResults?.data?.orders || [];
  const shops = vendorResults?.data?.shops || [];
  const categories = catResults?.data || [];
  const totalOrders = orders?.length || 0;


 
  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalOrders / limit));
  }, [totalOrders, limit]);

  return (
    <>
     
      <form className='md:flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
       <Input
          className="max-w-60 py-3"
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* <Button className="  px-6"  onClick={()=>setIsAddOpen(true)}>Add New Product</Button> */}
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

      <div>
        <ShopSelectOption shops={shops} setSearchTerm={setSearchTerm}/>
      </div>
   {isLoading && <p>Loading...</p>}

{orders.length > 0 &&  <>

   
  <Table aria-label="Products Management Table">
        <TableHeader>
          <TableColumn>Order ID</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Product Name</TableColumn> 
          <TableColumn>Customer Info</TableColumn> 
          <TableColumn>Product Price</TableColumn> 
          <TableColumn>Item Qty</TableColumn>
          <TableColumn>Total Amount</TableColumn> 
          <TableColumn>Payment Status</TableColumn>
          <TableColumn>Order Status</TableColumn>
        </TableHeader>
        <TableBody >
          {orders?.map((order: any, i: number) => (
            <TableRow key={order.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>o_id-{order.id}</TableCell>
              <TableCell>
                <Image className="w-12 h-12 hover:scale-150" src={order.product.images[0]} />
              </TableCell>
              <TableCell>{order.product.name}</TableCell>
             
              
              <TableCell>
                {order.order.fullName}
                <br />
                {order.order.mobile}
                <br />
                {order.order.address}
             
              </TableCell>
              <TableCell>{order.order.paymentMethod}
                <br />
                {order.order.transactionId}
               </TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.price * order.quantity}</TableCell>
              <TableCell>{order.order.paymentStatus}</TableCell>
              <TableCell>
                    {/* action modal  */}
                    
            <OrderStatusChangeDropdown 
              status={order.orderStatus}
              orderItemId={order.order.id}
            />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2  flex justify-between items-center">
        <p>
          Total Products : {totalOrders}
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

export default VendorOrdersManagementTable;
