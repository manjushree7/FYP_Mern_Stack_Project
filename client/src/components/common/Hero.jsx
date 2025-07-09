import React from 'react';
import headerImg from '../../assets/header_img.png';

const HeroSection = () => {
    return (
        <section
            className="relative w-full h-[100vh] bg-cover bg-center bg-no-repeat text-white flex flex-col md:flex-row items-center justify-between gap-16"
            style={{ backgroundImage: `url(${headerImg})` }}
        >
            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Text content */}
            <div className="z-10 text-center md:text-left px-4 md:px-10">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
                    Welcome to <span className="text-yellow-300">ShopLocally</span>
                </h1>
                <p className="text-xl mt-6 font-light max-w-lg text-white/90">
                    Discover fresh organic food from your favorite local stalls. Browse, order, and support local businesses right from your home.
                </p>
                <button className="mt-10 bg-white text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-200 transition duration-300 shadow-lg">
                    Explore Now
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
