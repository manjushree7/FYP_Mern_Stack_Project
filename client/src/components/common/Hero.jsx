import React from 'react';
import headerImg from '../../assets/header_img.png'; // ✅ Your image path

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-green-500 via-green-600 to-green-800 text-white py-32 px-6 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-16 relative overflow-hidden">
            {/* Background dot pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>

            {/* Text content */}
            <div className="text-center md:text-left max-w-2xl space-y-8 z-10">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-green-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                    Welcome to ShopLocally
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-green-50 leading-relaxed font-light max-w-lg tracking-wide">
                    Discover fresh organic food from your favorite local stalls. Browse, order, and support local businesses right from your home.
                </p>
                <button className="bg-gradient-to-r from-white to-green-50 text-green-700 px-12 py-5 rounded-2xl font-bold text-xl hover:from-yellow-100 hover:to-orange-100 hover:text-green-800 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-xl border-2 border-white/20 backdrop-blur-sm">
                    Explore Now
                </button>
            </div>

            {/* Hero Image */}
            <div className="relative z-10 group animate-fade-in-right">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                    src={headerImg}
                    alt="Fresh organic food"
                    className="w-full max-w-lg rounded-3xl shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 hover:shadow-green-900/50 border-4 border-white/20 backdrop-blur-sm"
                />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -top-6 -right-6 w-8 h-8 bg-orange-400 rounded-full opacity-60 animate-pulse delay-500"></div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..." opacity=".25" fill="currentColor"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86..." opacity=".5" fill="currentColor"></path>
                    <path d="M0,0V5.63C149.93,59,314.09..." fill="currentColor"></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
