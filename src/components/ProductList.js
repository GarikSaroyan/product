import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => (
    <div className="product-list">
        {products.length ? products.map(product => (
            <ProductCard key={product.id} product={product} />
        )) : <p>No products found.</p>}
    </div>
);

export default ProductList;