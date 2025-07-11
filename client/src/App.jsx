import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/login.jsx';
import Signup from './page/signup.jsx';
import Home from './page/home.jsx';
import Events from './page/event.jsx';
import MainLayout from './components/layout/mainlayout.jsx';
import StallFoodList from './components/stallowner/StallFoodList.jsx';
import ProtectedRoute from './components/common/protectedroutes.jsx';
import FoodMenu from './page/Foodmenu.jsx';
import Profile from './page/Profile.jsx';
import CartPage from './page/CartPage.jsx';
import PaymentPage from './components/payment/PaymentPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StallOwnerOrders from './page/StallOwnerOrders.jsx';
import CustomerOrders from './page/CustomerOrders.jsx';
import Admin from './page/admin.jsx';
import AdminCreateEvent from './admin/AdminCreateEvent.jsx';
import AdminEventsList from './admin/AdminEventsList.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import PaymentSuccessPage from './components/payment/PaymentSuccessPage.jsx';
import AdminUsersPage from './admin/AdminUsersPage.jsx';


import apiService from './services/apiService';
import StallOwnerDashboard from './components/Dashboard/StallOwnerDashboard.jsx';

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/stall/foods" element={<StallFoodList />} />
                    <Route path="/menu" element={<FoodMenu />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/payment/:orderId" element={<PaymentPage />} />
                    <Route path="/payment-success" element={<PaymentSuccessPage />} />
                    <Route path="/dashboard" element={<StallOwnerDashboard />} />
                    <Route path="/orders" element={<CustomerOrders />} />
                    <Route path="/received-orders" element={<StallOwnerOrders />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/events" element={<AdminEventsList />} />
                    <Route path="/admin/events/create" element={<AdminCreateEvent />} />
                    <Route path="/admin/users" element={<AdminUsersPage />} />

                </Routes>
            </MainLayout>
            {/* ✅ ToastContainer must be inside the returned JSX */}
            <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
    );
}

export default App;
