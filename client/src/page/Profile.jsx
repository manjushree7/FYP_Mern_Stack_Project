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
                const res = await api.get('/profile'); // unified endpoint
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
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 transition-all duration-300">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Your Profile</h2>

            {/* View Mode */}
            {!editMode && profile && (
                <div className="text-center space-y-6">
                    {profile.profileImage ? (
                        <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-600"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-semibold border-4 border-green-600">
                            {role === 'stallowner' ? 'Logo' : 'No Image'}
                        </div>
                    )}

                    {role === 'stallowner' ? (
                        <div className="text-left mx-auto max-w-md space-y-2">
                            <p><span className="font-semibold">Stall Name:</span> {profile.stallName}</p>
                            <p><span className="font-semibold">Location:</span> {profile.location}</p>
                            <p><span className="font-semibold">Contact:</span> {profile.contactNumber || 'Not provided'}</p>
                        </div>
                    ) : (
                        <div className="text-left mx-auto max-w-md space-y-2">
                            <p><span className="font-semibold">Name:</span> {profile.name}</p>
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">Location:</span> {profile.location || 'Not set'}</p>
                        </div>
                    )}

                    <button
                        onClick={() => setEditMode(true)}
                        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold shadow-md transition"
                    >
                        Edit Profile
                    </button>
                </div>
            )}

            {/* Edit Mode */}
            {(editMode || !profile) && (
                <form onSubmit={handleUpdate} className="space-y-6 max-w-md mx-auto">

                    <div
                        {...getRootProps()}
                        className={`border-4 rounded-xl cursor-pointer transition-colors duration-300
              ${isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-gray-50'}
              flex flex-col items-center justify-center p-8`}
                    >
                        <input {...getInputProps()} />
                        {uploading ? (
                            <p className="text-green-600 font-semibold">Uploading...</p>
                        ) : formData.profileImage ? (
                            <img
                                src={formData.profileImage}
                                alt="Preview"
                                className="w-28 h-28 rounded-full object-cover mb-3 shadow-lg"
                            />
                        ) : (
                            <>
                                <p className="text-gray-600 font-semibold mb-2">Drag & drop your image here</p>
                                <p className="text-gray-400 text-sm">or click to select file</p>
                            </>
                        )}
                    </div>

                    {role === 'stallowner' ? (
                        <>
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Stall Name</label>
                                <input
                                    type="text"
                                    value={formData.stallName}
                                    onChange={e => setFormData({ ...formData, stallName: e.target.value })}
                                    required
                                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    required
                                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Contact Number</label>
                                <input
                                    type="text"
                                    value={formData.contactNumber}
                                    onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 font-semibold"
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
