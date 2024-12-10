"use client"
import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image} from "@nextui-org/react";
import { ActivityIcon } from 'lucide-react';

const UserManangementTable = ({users}) => {
    return (
        <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Profile Photo</TableColumn>
          <TableColumn>Full Name</TableColumn> 
          <TableColumn>Contact Info</TableColumn> 
          <TableColumn>Role</TableColumn> 
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>

            {
                users?.map((user,i)=>(
                    <TableRow key={user.id}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>
                        <Image src={user.profilePhoto} className='w-12 h-12 hover:scale-150 hover:absolate' />
                    </TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}
                      <br />
                      {user.contactNumber}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell><ActivityIcon/></TableCell>
                  </TableRow>
                ))
            }
         
        
        </TableBody>
      </Table>
    );
};

export default UserManangementTable;

