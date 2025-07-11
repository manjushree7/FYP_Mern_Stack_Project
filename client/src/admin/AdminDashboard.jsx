import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';
import {
    Users,
    CalendarDays,
    ClipboardList,
    LogOut
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useStore();

    const handleLogout = () => {
        logout();
        navigate('/admin'); // back to admin login
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </header>

            {/* Welcome */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Welcome, {user?.name || 'Admin'} 👋</h2>
                <p className="text-gray-600 mt-2">
                    Manage users, events, and monitor orders across the platform.
                </p>
            </section>

            {/* Actions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Manage Users"
                    description="View and manage all registered users."
                    icon={<Users className="w-6 h-6 text-indigo-600" />}
                    onClick={() => navigate('/admin/users')}
                />

                <DashboardCard
                    title="Manage Events"
                    description="Create, update or remove events."
                    icon={<CalendarDays className="w-6 h-6 text-green-600" />}
                    onClick={() => navigate('/admin/events')}
                />

                <DashboardCard
                    title="View Orders"
                    description="Track and review customer orders."
                    icon={<ClipboardList className="w-6 h-6 text-orange-500" />}
                    onClick={() => navigate('/admin/orders')}
                />
            </section>
        </div>
    );
};

const DashboardCard = ({ title, description, icon, onClick }) => (
    <div
        onClick={onClick}
        className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-start gap-4"
    >
        <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);

export default AdminDashboard;
