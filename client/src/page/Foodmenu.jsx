import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import search icon
import api from '../utlis/api.js';
import ProductCard from '../components/common/ProductCard';
import useCartStore from '../zustand/cartstore.jsx';
import { toast } from 'react-toastify';

const FoodMenu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const res = await api.get('/fooditems/public');
                setFoodItems(res.data);
                setFilteredItems(res.data);
            } catch (err) {
                console.error('Error fetching food items:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, []);

    useEffect(() => {
        const query = search.toLowerCase();
        const results = foodItems.filter(item =>
            item.name.toLowerCase().includes(query)
        );
        setFilteredItems(results);
    }, [search, foodItems]);

    const handleAddToCart = async (foodItemId, quantity = 1) => {
        try {
            await addToCart(foodItemId, quantity);
            toast.success('Item added to cart!');
        } catch (err) {
            console.error('Add to cart failed:', err);
            toast.error('Failed to add item to cart');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading menu...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Explore Fresh Food</h1>

            {/* Search Bar with Icon */}
            <div className="flex justify-center mb-10">
                <div className="relative w-full sm:w-96">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <FiSearch size={20} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search for food..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-green-500 shadow-md transition duration-200"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {filteredItems.length === 0 ? (
                <p className="text-center text-gray-500">No food items found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <ProductCard
                            key={item._id}
                            product={item}
                            onAddToCart={() => handleAddToCart(item._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodMenu;
