import React, { useState, useEffect, useContext } from 'react';

import { fetchPopularProducts } from '../Api';
import { CartContext } from "./CartContext";
import { UserContext } from "../UserContext";



  
const PopularShoes = ({product}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [popularShoes, setPopularShoes] = useState([]);

    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const handleAddToCart = () => {
      if (user) {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);
      } else {
        alert("Please log in to add items to the cart.");
      }
    };

    useEffect(() => {
      const loadProducts = async () => {
        try {
          const data = await fetchPopularProducts();
          setPopularShoes(data);
        } catch (error) {
          console.error('Failed to loading products:', error);
        }
      };
      loadProducts();
    }, []);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularShoes.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + popularShoes.length) % popularShoes.length);
    };
  
    return (
<>
      

        <div className="relative overflow-hidden w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="popular-shoes-title ml-2 font-bold text-xl text-center">Popular Shoes</h2>
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          { popularShoes.map((shoe) => (
            <div key={shoe.id} className="w-full flex-shrink-0 p-4">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={shoe.image} alt={shoe.name} />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{shoe.name}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    
                    <span className="bg-red-100 text-black text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-black ms-3">{shoe.description}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Ksh {shoe.price.toFixed(2)}</span>
                    <button onClick={handleAddToCart} className={`text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Add to cart ${isAdded ? 'added' : ''}` }>Add to Cart</button>
                </div>
            </div>
          </div>
            ))};
            </div>
            <button onClick={prevSlide} className="slider-arrow bg-red-600 rounded text-white hover:bg-red-900 left p-2 ml-2">Prev</button>
            <button onClick={nextSlide} className="slider-arrow bg-red-600 rounded text-white hover:bg-red-900 right p-2 ml-20 mb-5">Next</button>
            <style jsx>{`
              .slider-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
              }
              .left {
                left: 10px;
              }
              .right {
                right: 10px;
              }
            `}</style>
        </div>
</>
    );
  };

  export default PopularShoes;