import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utlis/api.js';

const AdminCreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        capacity: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, location, startDate, endDate, capacity } = formData;

        if (!name || !location || !startDate || !endDate || !capacity) {
            setError('Please fill in all required fields');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setError('Start date cannot be after end date');
            return;
        }

        const parsedCapacity = parseInt(capacity, 10);
        if (isNaN(parsedCapacity) || parsedCapacity <= 0) {
            setError('Capacity must be a positive number');
            return;
        }

        setLoading(true);
        try {
            await api.post('/events', {
                ...formData,
                capacity: parsedCapacity,
            });
            navigate('/admin/events');
        } catch (err) {
            console.error('Create Event error:', err);
            setError(err.response?.data?.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Event</h2>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
                        Event Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter event name"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Event description (optional)"
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block mb-1 font-semibold text-gray-700">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Event location"
                    />
                </div>

                {/* New Capacity Field */}
                <div>
                    <label htmlFor="capacity" className="block mb-1 font-semibold text-gray-700">
                        Stall Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Maximum number of stalls"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block mb-1 font-semibold text-gray-700">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block mb-1 font-semibold text-gray-700">
                            End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default AdminCreateEvent;
