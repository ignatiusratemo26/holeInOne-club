import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, addToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1 p-1 justify-items-center">
    {products.map((product) => (
      <div
        key={product.id}
        style={{
          width: '80%', // Span 80% of the parent container
        }}
      >
        <ProductCard product={product} addToCart={addToCart} />
      </div>
    ))}
  </div>
);

export default ProductGrid;
