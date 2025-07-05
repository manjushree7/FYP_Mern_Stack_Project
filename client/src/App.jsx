import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/login.jsx';
import Signup from './page/signup.jsx';
import Home from './page/home.jsx'
import MainLayout from './components/layout/mainlayout.jsx';

import ProtectedRoute from './components/common/protectedroutes.jsx';

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />


                    {/* <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                /> */}
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
