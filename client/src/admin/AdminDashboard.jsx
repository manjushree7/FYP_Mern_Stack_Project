import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useStore();

    const handleLogout = () => {
        logout();
        navigate('/admin'); // back to admin login
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </header>

            <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'Admin'}!</h2>

                <p className="mb-6 text-gray-700">
                    This is your admin dashboard where you can manage the application.
                </p>

                {/* Example dashboard links/buttons */}
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Manage Users
                    </button>
                    <button
                        onClick={() => navigate('/admin/events')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Manage Events
                    </button>
                    <button
                        onClick={() => navigate('/admin/orders')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        View Orders
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
