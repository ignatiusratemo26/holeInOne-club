import { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCartItems(response.data || []);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await axios.post('/api/cart', { product, quantity: 1 });
            setCartItems([...cartItems, response.data]);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete('/api/cart', { data: { id: productId } });
            setCartItems(cartItems.filter(item => item.product.id !== productId));
            fetchCart();
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };
    const purchaseCart = async () => {
        try {
            await axios.post('/api/purchase');
            setCartItems([]);
            fetchCart();
        } catch (error) {
            console.error('Failed to purchase cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, fetchCart, addToCart, removeFromCart, purchaseCart }}>
            {children}
        </CartContext.Provider>
    );
}