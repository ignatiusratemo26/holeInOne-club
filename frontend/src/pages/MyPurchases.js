// FILE: MyPurchases.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const MyPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('/api/purchases');
                setPurchases(response.data || []);
            } catch (error) {
                console.error('Failed to fetch purchases:', error);
            }
        };

        if (user) {
            fetchPurchases();
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to view your purchases.</div>;
    }

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">My Purchases</h3>
            {purchases.length === 0 ? (
                <p className="text-gray-500 text-center">You have not made any purchases yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((purchase) => (
                        <div
                            key={purchase.id}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                        >
                            <h4 className="font-semibold text-lg mb-2">Purchase ID: {purchase.id}</h4>
                            <p className="text-gray-700 mb-1 font-bold">
                                <span className="font-medium ">Total:</span> Ksh {purchase.total.toFixed(2)}
                            </p>
                            <p className="text-gray-700 mb-3">
                                <span className="font-medium">Date:</span> {new Date(purchase.created_at).toLocaleString()}
                            </p>
                            <ul className="space-y-2">
                                {purchase.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center text-gray-800 bg-red-50 rounded-md px-4 py-2"
                                    >
                                        <span>{item.product.name}</span>
                                        <span>Qty: {item.quantity}</span>
                                        <span>Ksh {item.product.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default MyPurchases;