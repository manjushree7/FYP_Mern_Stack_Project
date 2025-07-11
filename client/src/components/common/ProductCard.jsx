import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        setLoading(true);
        try {
            await onAddToCart(product._id, 1); // Pass ID and quantity
        } catch (error) {
            alert("Failed to add to cart");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm flex flex-col items-center">
            <img
                src={product.imageUrl || product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            {product.stallName && (
                <p className="text-gray-600 text-sm">{product.stallName}</p>
            )}
            {product.description && (
                <p className="text-gray-700 text-sm mt-1">{product.description}</p>
            )}
            <p className="text-green-700 font-bold text-xl mt-3">
                Rs{product.price.toFixed(2)}
            </p>
            <button
                onClick={handleAdd}
                disabled={loading || product.available === false}
                className={`mt-4 px-5 py-2 rounded text-white font-medium transition ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : product.available === false
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {loading
                    ? "Adding..."
                    : product.available === false
                        ? "Unavailable"
                        : "Add to Cart"}
            </button>
        </div>
    );
};

export default ProductCard;
