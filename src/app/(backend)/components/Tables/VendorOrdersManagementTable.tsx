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
import ImagePopupModal from '../Modals/ProductsModal/ImagePopupModal';
import { useGetVendorOrderHistory } from '@/hooks/orders.hook';


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
  const  {data: orderResults, isLoading:orderLoading} =useGetVendorOrderHistory(query);

  const shops = vendorResults?.data?.shops || [];
  const [page, setPage] = useState(1); 
  const [limit] = useState(10); 
  const [total, setTotal] = useState(0); 
  const [shopId, setShopId] = useState(shops[0]?.id); 
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [isPopupModalOpen,setIsPopupModalOpen]=useState(false)
  const [isPopupImage,setIsPopupImage]=useState('')



  useEffect(() => {
    // Update the query when page, limit, sortBy, or sortOrder changes
    setQuery((prev) => ({
      ...prev,
      page,
      limit,
      sortBy,
      sortOrder,
      shopId
    }));
  }, [page, limit, sortBy, sortOrder,shopId]);


  useEffect(() => {
    // Update the query with the debounced searchTerm
    setQuery((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);


  console.log(orderResults?.data?.paginateData?.total);
  

  const orders = orderResults?.data?.data || [];

  const totalOrders = orderResults?.data?.paginateData?.total || 0;


  

 
  useEffect(() => {
    // Update total pages when results change
    setTotal(Math.ceil(totalOrders / limit));
  }, [totalOrders, limit]);

  
  const handlePopupModalOpen = (imgUrl:string) => {
    setIsPopupModalOpen(true);
    setIsPopupImage(imgUrl)

    
  }
  

  return (
    <>
     
      <form className='md:flex justify-between items-center'>
      <div className=' flex gap-2 items-center'>
    

      <div className='flex g items-center border bg-black/5 rounded-md p-1'>
        <ShopSelectOption shops={shops}  setSearchTerm={setShopId}/>
      <h2>Current Shop: {shops.find((shop: any) => shop.id === shopId)?.name}</h2>
      </div>
       </div>
        <div className='flex gap-2 items-center'>

       <div>
       <Input
          className="max-w-60 py-3 "
          name="searchTerm"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       </div>
       <div className=' '>
       <Dropdown>
          <DropdownTrigger>
            <button className="md:px-2 py-2 flex gap-2 border-1 rounded-md ">
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
        </div>
      </form>

      
   {orderLoading || vendorLoading && <p>Loading...</p>}

{orders.length > 0 &&  <>


   
  <Table removeWrapper className='my-5' aria-label="Products Management Table">
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
            <TableRow key={order.id} className='dark:bg-slate-800/15 border border-gray-200 dark:border-white/15 rounded-md hover:bg-gray-500/25 dark:hover:bg-slate-700/75 hover:rounded-md'>
              <TableCell>o_id-{order.id}</TableCell>
              <TableCell  >
            
              <button onClick={() => handlePopupModalOpen(order.product.images[0])} >
              <Image
                 className="w-12 h-12 hover:cursor-pointer rounded hover:border-2 border-red-500" src={order.product.images[0]}
                alt='image'
                />
              </button>
               
              
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
          Total Orders : {totalOrders}
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
{isPopupModalOpen && <ImagePopupModal previewImage={isPopupImage} setIsOpen={setIsPopupModalOpen} />}
    </>
  );
};

export default VendorOrdersManagementTable;
