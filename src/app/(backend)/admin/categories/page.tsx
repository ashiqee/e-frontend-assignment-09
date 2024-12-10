import { getAllProducts } from '@/services/ProductsServices';
import React from 'react';

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