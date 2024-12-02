import React from 'react';

import ProductDetails from './ProductDetails';

import { getAllProductIds,  getAProduct, } from '@/services/getProductsApiFetch'; // Assume this function returns a list of product IDs

// Generate metadata dynamically based on the product
export const generateMetadata = async ({ params }: { params: any }) => {
    const productDetails = await getAProduct(params.productId);

    return {
        title: `${productDetails.title}`,
        description: `${productDetails.description}`,
        keywords: ['test keyword', 'another'],
    };
};

// Static Generation: This function needs to return the list of `productId` values
export const generateStaticParams = async () => {
    const productIds = await getAllProductIds(); // Fetch all available product IDs

    return productIds.map((id: any) => ({
        productId: String(id),  // Ensure that productId is always a string
    }));
};

const ProductDetailsPage = async ({ params }: { params: any }) => {
    const productDetails = await getAProduct(params.productId); // Fetch product details for a given `productId`

    return (
        <div className="my-10 mx-6">
            <ProductDetails product={productDetails} />
        </div>
    );
};

export default ProductDetailsPage;
