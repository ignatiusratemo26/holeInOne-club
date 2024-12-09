import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500">Return to Home</Link>
        </div>
    );
    };
    export default NotFound;