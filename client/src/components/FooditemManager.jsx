// FoodItemManager.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import foodItemService from './services/foodItemService';

const FoodItemManager = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        available: true,
        category: ''
    });

    // Load food items on component mount
    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        try {
            setIsLoading(true);
            const items = await foodItemService.getFoodItems();
            setFoodItems(items);
            setError(null);
        } catch (err) {
            setError('Failed to load food items. Please check your authentication.');
            console.error('Error loading food items:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Validate required fields
            if (!formData.name || !formData.price) {
                setError('Name and price are required fields');
                return;
            }

            const itemData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingItem) {
                await foodItemService.updateFoodItem(editingItem._id, itemData);
            } else {
                await foodItemService.createFoodItem(itemData);
            }

            await loadFoodItems();
            handleCloseModal();
        } catch (err) {
            setError(editingItem ? 'Failed to update food item' : 'Failed to create food item');
            console.error('Error saving food item:', err);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description || '',
            price: item.price.toString(),
            imageUrl: item.imageUrl || '',
            available: item.available,
            category: item.category || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            try {
                await foodItemService.deleteFoodItem(id);
                await loadFoodItems();
            } catch (err) {
                setError('Failed to delete food item');
                console.error('Error deleting food item:', err);
            }
        }
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            available: true,
            category: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            available: true,
            category: ''
        });
        setError(null);
    };

    const toggleAvailability = async (item) => {
        try {
            await foodItemService.updateFoodItem(item._id, {
                ...item,
                available: !item.available
            });
            await loadFoodItems();
        } catch (err) {
            setError('Failed to update item availability');
            console.error('Error updating availability:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Food Item Management</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add New Item
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="float-right text-red-500 hover:text-red-700"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleAvailability(item)}
                                        className={`p-1 rounded ${item.available
                                                ? 'text-green-600 hover:bg-green-50'
                                                : 'text-gray-400 hover:bg-gray-50'
                                            }`}
                                        title={item.available ? 'Available' : 'Unavailable'}
                                    >
                                        {item.available ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {item.description && (
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                            )}

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl font-bold text-green-600">${item.price}</span>
                                {item.category && (
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        {item.category}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs ${item.available
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                                <span>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {foodItems.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No food items found. Add your first item!</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter food item name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter description (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Main Course, Dessert, Beverage"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Available for sale
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Save size={16} />
                                        {editingItem ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItemManager;