// src/components/layout/MainLayout.jsx
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
