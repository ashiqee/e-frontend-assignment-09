import React from 'react';

import { getAllProducts } from '@/services/ProductsServices';
import P_CategoriesManagementTable from '../../components/Tables/P_CategoriesManagementTable';

const CategoriesManage = async () => {

    const products =  await getAllProducts();

    console.log(">>>",products);
    
    return (
        <div>
            Product Categories Managment

            <P_CategoriesManagementTable/>
        </div>
    );
};

export default CategoriesManage;