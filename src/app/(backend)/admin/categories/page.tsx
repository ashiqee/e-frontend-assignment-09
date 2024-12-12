import React from 'react';

import { getAllProducts } from '@/services/ProductsServices';

const CategoriesManage = async () => {

    const products =  await getAllProducts();

    console.log(">>>",products);
    
    return (
        <div>
            Product Managment
        </div>
    );
};

export default CategoriesManage;