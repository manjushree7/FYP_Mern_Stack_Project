import React, { useEffect, useState } from 'react';
import api from '../../utlis/api.js';

const cloudName = 'dczmqzat7';
const uploadPreset = 'shoplocally';

const StallFoodForm = ({ editingItem, onSuccess }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        available: true,
        category: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editingItem) setForm(editingItem);
    }, [editingItem]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = async () => {
        if (!imageFile) return form.imageUrl;

        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', uploadPreset);

        try {
            setUploading(true);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data,
            });
            const json = await res.json();
            return json.secure_url;
        } catch (err) {
            console.error('Cloudinary upload failed:', err);
            return '';
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await handleImageUpload();
            const payload = { ...form, imageUrl };

            if (editingItem) {
                await api.put(`/fooditems/${editingItem._id}`, payload);
            } else {
                await api.post('/fooditems', payload);
            }

            onSuccess();
            setForm({ name: '', description: '', price: '', imageUrl: '', available: true, category: '' });
            setImageFile(null);
        } catch (err) {
            console.error('Error saving food item:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Food Name" required className="w-full border px-3 py-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2" />
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required className="w-full border px-3 py-2" />
            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2" />

            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border px-3 py-2" />
            {uploading && <p className="text-sm text-blue-500">Uploading image...</p>}

            <label className="flex items-center gap-2">
                <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
                Available
            </label>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingItem ? 'Update' : 'Add'} Food Item
            </button>
        </form>
    );
};

export default StallFoodForm;
