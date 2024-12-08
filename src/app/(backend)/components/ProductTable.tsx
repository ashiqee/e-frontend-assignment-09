"use client"
import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image} from "@nextui-org/react";

const ProductTable = ({products}) => {
    return (
        <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>

            {
                products?.map((product)=>(
                    <TableRow key={product.id}>
                    <TableCell>p_id-{product.id}</TableCell>
                    <TableCell>
                        <Image src={product.images[0]} className='w-12 h-12 hover:scale-150 hover:absolate' />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.status}</TableCell>
                  </TableRow>
                ))
            }
         
        
        </TableBody>
      </Table>
    );
};

export default ProductTable;

