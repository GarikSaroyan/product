import React from "react";

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.category} - {product.brand}</p>
        <p>${product.price}</p>
        <p>Rating: {product.rating}</p>
    </div>
);

export default ProductCard;