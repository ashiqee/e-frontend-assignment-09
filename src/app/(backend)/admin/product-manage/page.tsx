import { getAllProducts } from '@/services/ProductsServices';
import React from 'react';

const ProductManagement = async () => {

    const products =  await getAllProducts();

    console.log(">>>",products);
    
    return (
        <div>
            Product Managment
        </div>
    );
};

export default ProductManagement;