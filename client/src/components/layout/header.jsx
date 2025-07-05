// src/components/layout/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store.jsx';

const Header = () => {
    const user = useStore(state => state.user);
    const logout = useStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div>
                <Link to="/" className="font-bold text-xl">ShopLocally</Link>
            </div>
            <nav className="space-x-4">
                {!user && (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                        <Link to="/home" className="hover:underline">Home</Link>
                    </>
                )}

                {user && user.role === 'Customer' && (
                    <>
                        <Link to="/home" className="hover:underline">Home</Link>
                        <Link to="/events" className="hover:underline">Events</Link>
                        <Link to="/profile" className="hover:underline">Profile</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                )}

                {user && user.role === 'StallOwner' && (
                    <>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <Link to="/fooditems" className="hover:underline">Food Items</Link>
                        <Link to="/events" className="hover:underline">Events</Link>
                        <Link to="/profile" className="hover:underline">Profile</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                )}

                {user && user.role === 'Admin' && (
                    <>
                        <Link to="/admin/dashboard" className="hover:underline">Admin Dashboard</Link>
                        <Link to="/admin/events" className="hover:underline">Manage Events</Link>
                        <Link to="/admin/users" className="hover:underline">Manage Users</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
