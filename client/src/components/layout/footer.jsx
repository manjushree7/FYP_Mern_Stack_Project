// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
            <p>© {new Date().getFullYear()} ShopLocally. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
