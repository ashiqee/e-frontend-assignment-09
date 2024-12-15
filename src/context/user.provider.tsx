
"use client"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

import { IUser } from '@/types';
import { getCurrentUser } from '@/services/AuthService';


interface IUserProviderValues{
    user:IUser |null;
    isLoading:boolean;
    setUser:(user:IUser)=>void;
    setIsLoading:Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues| undefined>(undefined)

const UserProvider = ({children}:{children:ReactNode}) => {
const [user,setUser]= useState<any|null>(null);
const [isLoading,setIsLoading]=useState(true);

const handleUser = async()=>{
    const  user = await getCurrentUser();

    console.log("Heck user",user)

    setUser(user)
    setIsLoading(false)
};

useEffect(()=>{
    handleUser();
},[isLoading]);

    return (
        <UserContext.Provider value={{user,setUser,isLoading,setIsLoading}}>
            {children}
        </UserContext.Provider>
        
    );
};



export const useUser = ()=>{
    const context = useContext(UserContext);

    if(context=== undefined){
        throw new Error("useUser Must be used within the UserProvider Context");
    }

    return context;
};


export default UserProvider;