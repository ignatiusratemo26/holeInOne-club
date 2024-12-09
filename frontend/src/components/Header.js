import React, { useState, useContext } from 'react';
import { FaShoePrints, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { CartContext } from './CartContext';
import { LandPlot, Gift, MessageCircle, Coffee, ShoppingBag, Heart } from 'lucide-react'

const Header = ({ toggleCart, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const {user} = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
     <header className="bg-[#710193] text-white py-4">
     <div className="container mx-auto px-4 flex justify-between items-center">
       <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
         <LandPlot className="h-8 w-8" />
         <span  className="text-2xl font-bold">Hole In One</span>
        </Link>
       </div>
       <nav>
         <ul className="flex space-x-4">
          <Link to="/facilities" className="hover:text-[#ecf0f1]">
           <li className="hover:text-[#ecf0f1]">Facilities</li>
           </Link>
           <Link to="/packages" className="hover:text-[#ecf0f1]">
           <li className="hover:text-[#ecf0f1]">Packages</li>
            </Link>

           <Link to="/contact" className="hover:text-[#ecf0f1]">
           <li className="hover:text-[#ecf0f1]">Contact</li>
            </Link>
         </ul>
       </nav>



            {/* Cart and User Icons */}
            <div className="flex items-center space-x-4">

              <Link to="/cart" className="relative icon-button">
                <FaShoppingCart className="text-white text-lg" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>


              <Link to={user?'/profile':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-none py-2 px-4 ">
  
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
          </Link>
        </div>
     </div>
   </header>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { FaShoePrints, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

// const Header = ({ cartItems, toggleCart, setCurrentPage }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="bg-red-900 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="flex items-center">
//           <FaShoePrints className="text-2xl mr-2" />
//           <h1 className="font-bold text-lg md:text-2xl">Ndula_urban</h1>
//         </div>

//         {/* Hamburger Menu for Small Screens */}
//         <div className="sm:hidden">
//           <button onClick={toggleMenu} className="icon-button">
//             {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
//           </button>
//         </div>

//         {/* Cart and User Icons */}
//         <div className="flex items-center space-x-4 ">

//         {/* Navigation Links */}
//         <nav
//           className={`${
//             isMenuOpen ? 'block' : 'hidden'
//           } ml-10 absolute top-16 left-0 lg:bg-transparent   sm:static sm:flex sm:space-x-4 p-4 sm:p-0 shadow-md sm:shadow-none z-10 bg-red-700`}
//         >
//           <a
//             href="#"
//             className="nav-link hover:font-bold  block sm:inline text-gray-700 lg:bg-transparent sm:bg-white"
//             onClick={() => {
//               setCurrentPage('home');
//               setIsMenuOpen(false);
//             }}
//           >
//             Home
//           </a>
//           <a
//             href="#"
//             className="nav-link hover:font-bold block sm:inline text-gray-500 lg:bg-transparent"
//             onClick={() => {
//               setCurrentPage('shop');
//               setIsMenuOpen(false);
//             }}
//           >
//             Shop
//           </a>
//           <a
//             href="#"
//             className="nav-link hover:font-bold block sm:inline text-gray-500 lg:bg-transparent sm:bg-white"
//             onClick={() => {
//               setCurrentPage('about');
//               setIsMenuOpen(false);
//             }}
//           >
//             About
//           </a>
//           <a
//             href="#"
//             className="nav-link hover:font-bold block lg:bg-transparent sm:inline text-gray-500 sm:bg-white"
//             onClick={() => {
//               setCurrentPage('contact');
//               setIsMenuOpen(false);
//             }}
//           >
//             Contact
//           </a>
//         </nav>

        
//           <button onClick={toggleCart} className="relative icon-button">
//             <FaShoppingCart className="text-white text-lg" />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                 {cartItems.length}
//               </span>
//             )}
//           </button>
//           <button className="icon-button">
//             <FaUser className="text-white text-lg" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
