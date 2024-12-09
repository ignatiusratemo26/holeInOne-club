import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";

const FacilitiesPage = ({ products, addToCart }) => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const genres = ['All', 'Activities', 'Facilities'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page-container">
      <h1 className="text-4xl text-black font-bold text-center mb-8 mt-16">Shop Our Collection</h1>
      <div className="mb-8 flex justify-center">
        <div className="filter-container bg-purple-200 text-gray p-2 rounded-lg shadow-md flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input p-2 border rounded mr-4"
          />
          <label className="mr-2 font-medium">Filter by:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select p-2 border rounded"
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ProductGrid products={filteredProducts} addToCart={addToCart} />
    </div>
  );
};

export default FacilitiesPage;