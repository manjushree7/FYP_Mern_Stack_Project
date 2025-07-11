import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../utlis/api.js';
import useStore from '../zustand/store.jsx';

const Profile = () => {
    const { user } = useStore();
    const role = user?.role?.toLowerCase();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const initialForm = role === 'stallowner'
        ? { stallName: '', location: '', contactNumber: '', profileImage: '' }
        : { name: '', location: '', profileImage: '' };

    const [formData, setFormData] = useState(initialForm);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!role) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await api.get('/profile');
                setProfile(res.data);

                if (role === 'stallowner') {
                    setFormData({
                        stallName: res.data.stallName || '',
                        location: res.data.location || '',
                        contactNumber: res.data.contactNumber || '',
                        profileImage: res.data.profileImage || '',
                    });
                } else {
                    setFormData({
                        name: res.data.name || '',
                        location: res.data.location || '',
                        profileImage: res.data.profileImage || '',
                    });
                }
                setEditMode(false);
            } catch {
                setEditMode(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [role]);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        setUploading(true);

        const file = acceptedFiles[0];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'shoplocally');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dczmqzat7/image/upload', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            setFormData(prev => ({ ...prev, profileImage: result.secure_url }));
        } catch (err) {
            console.error('Image upload failed:', err);
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/profile', formData);
            setProfile(res.data);
            setEditMode(false);
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Your Profile</h2>

            {/* --- View Mode --- */}
            {!editMode && profile && (
                <div className="flex flex-col items-center text-center space-y-4">
                    {profile.profileImage ? (
                        <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold border-4 border-green-500">
                            {role === 'stallowner' ? 'Logo' : 'No Image'}
                        </div>
                    )}

                    <div className="space-y-2 text-sm text-gray-700">
                        {role === 'stallowner' ? (
                            <>
                                <p><span className="font-semibold">Stall Name:</span> {profile.stallName}</p>
                                <p><span className="font-semibold">Location:</span> {profile.location}</p>
                                <p><span className="font-semibold">Contact:</span> {profile.contactNumber}</p>
                            </>
                        ) : (
                            <>
                                <p><span className="font-semibold">Name:</span> {profile.name}</p>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p><span className="font-semibold">Location:</span> {profile.location}</p>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setEditMode(true)}
                        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition"
                    >
                        Edit Profile
                    </button>
                </div>
            )}

            {/* --- Edit Mode --- */}
            {(editMode || !profile) && (
                <form onSubmit={handleUpdate} className="space-y-6 mt-6">
                    <div
                        {...getRootProps()}
                        className={`border-4 rounded-xl cursor-pointer p-6 flex flex-col items-center justify-center transition
                            ${isDragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                    >
                        <input {...getInputProps()} />
                        {uploading ? (
                            <p className="text-green-600 font-medium">Uploading...</p>
                        ) : formData.profileImage ? (
                            <img
                                src={formData.profileImage}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover mb-2 shadow"
                            />
                        ) : (
                            <>
                                <p className="text-gray-600">Drag & drop a profile image</p>
                                <p className="text-sm text-gray-400">or click to select</p>
                            </>
                        )}
                    </div>

                    {role === 'stallowner' ? (
                        <>
                            <InputField label="Stall Name" value={formData.stallName} onChange={e => setFormData({ ...formData, stallName: e.target.value })} />
                            <InputField label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            <InputField label="Contact Number" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} />
                        </>
                    ) : (
                        <>
                            <InputField label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <InputField label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        </>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium"
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

// Reusable input component
const InputField = ({ label, value, onChange }) => (
    <div>
        <label className="block mb-1 font-semibold text-gray-700">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
    </div>
);

export default Profile;
