import React, { useState, useEffect } from 'react';
import api from '../../utlis/api.js';

const EditEventModal = ({ event, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name || '',
                location: event.location || '',
                startDate: event.startDate ? event.startDate.split('T')[0] : '',
                endDate: event.endDate ? event.endDate.split('T')[0] : '',
            });
        }
    }, [event]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSave = async () => {
        if (!formData.name || !formData.startDate || !formData.endDate) {
            setError('Name, Start Date and End Date are required');
            return;
        }
        setSaving(true);
        try {
            const res = await api.put(`/events/${event._id}`, formData);
            onSave(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update event');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                <h2 className="text-2xl mb-4 font-semibold">Edit Event</h2>

                {error && <p className="text-red-600 mb-3">{error}</p>}

                <label className="block mb-1 font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                />

                <label className="block mb-1 font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                />

                <label className="block mb-1 font-medium">Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-3"
                />

                <label className="block mb-1 font-medium">End Date</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;
