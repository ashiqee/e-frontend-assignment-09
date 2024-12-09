import React, { ReactNode } from 'react';
import Sidebar from './components/Sidebar';


const BackendLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex">
           
            <Sidebar />

           
            <div className="ml-[250px] w-full p-6 overflow-y-auto h-screen dark:bg-slate-900/85 bg-gray-100">
                {children}
            </div>
        </div>
    );
};

export default BackendLayout;