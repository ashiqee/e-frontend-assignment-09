"use client"
import React, { useEffect, useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination} from "@nextui-org/react";
import { ActivityIcon } from 'lucide-react';
import { useGetAllUsers } from '@/hooks/users.hook';

const UserManangementTable = () => {
  const users = useGetAllUsers()

  const [page, setPage] = useState(1); 
  const [limit] = useState(10); 
  const [total, setTotal] = useState(0); 
  // const [users, setUsers] = useState([]); 

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const result = await getAllUsers(page, limit);
  //         console.log(result);
          
  //         setUsers(result.users);
  //         setTotal(result.total); // Assuming result contains the total number of users
  //     };

  //     fetchData();
  // }, [page, limit]);
  

  
    return (
       <>
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
      <div className='py-2  flex justify-center'>
             <Pagination  color={"primary"} initialPage={page} total={total} />
          </div>
       </>
    );
};

export default UserManangementTable;

