import React from 'react';

import ProductDetails from './ProductDetails';



const ProductDetailsPage = async ({ params }: { params: { productId: string } }) => {
  
    return (
        <div className="my-10 mx-6">
            <ProductDetails id={params?.productId} />
        </div>
    );
};

export default ProductDetailsPage;
