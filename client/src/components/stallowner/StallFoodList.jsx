import React, { useEffect, useState } from 'react';
import api from '../../utlis/api.js';
import StallFoodForm from './StallFoodForm';

const StallFoodList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchFoodItems = async () => {
        try {
            const res = await api.get('/fooditems');
            setFoodItems(res.data);
        } catch (err) {
            console.error('Error fetching food items:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this food item?')) return;
        try {
            await api.delete(`/fooditems/${id}`);
            fetchFoodItems();
        } catch (err) {
            console.error('Error deleting food item:', err);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    return (
        <div className="p-6 space-y-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold">Your Food Items</h2>

            <StallFoodForm
                editingItem={editingItem}
                onSuccess={() => {
                    fetchFoodItems();
                    setEditingItem(null);
                }}
            />

            <div className="grid md:grid-cols-2 gap-4">
                {foodItems.map((item) => (
                    <div key={item._id} className="border p-4 rounded shadow bg-white">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-700">{item.description}</p>
                        <p className="text-sm">Rs. {item.price} | {item.category}</p>
                        <p className={item.available ? 'text-green-600' : 'text-red-600'}>
                            {item.available ? 'Available' : 'Not Available'}
                        </p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => setEditingItem(item)}
                                className="bg-yellow-500 px-3 py-1 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-600 px-3 py-1 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StallFoodList;
