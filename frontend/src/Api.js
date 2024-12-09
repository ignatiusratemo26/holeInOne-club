import axios from "axios";

// const API_URL = process.env.BACKEND_API;
const API_URL="http://localhost:4000/api";
// axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

// Get all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchSubscriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/subscriptions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
    }
}


export const fetchPopularProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/popular`);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular products:", error);
        throw error;
    }
}