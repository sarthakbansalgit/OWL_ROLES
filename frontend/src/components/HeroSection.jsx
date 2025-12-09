import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

import animeEmoji from "/public/anime-emoji.gif"

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [popupClass, setPopupClass] = useState("hidden");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup after a delay
        const showTimer = setTimeout(() => {
            setPopupClass("visible");
        }, 1000);

        // Hide popup after 4.5 seconds
        const hideTimer = setTimeout(() => {
            setPopupClass("hidden");
        }, 4500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 text-center min-h-screen w-full overflow-x-hidden flex items-center py-8 md:py-0 relative'>
            <style>{`
                @keyframes slideInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
                .hero-title { animation: slideInDown 0.8s ease-out; }
                .hero-subtitle { animation: slideInDown 0.9s ease-out; }
                .hero-search { animation: slideInUp 0.9s ease-out; }
                .hero-badge { animation: slideInUp 1s ease-out; }
                .hero-card { animation: slideInLeft 1s ease-out; }
                .float-animation { animation: float 3s ease-in-out infinite; }
                .search-input:focus { transition: all 0.3s ease; box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1); }
            `}</style>
            
            <div className={`popup ${popupClass}`}>
                <p className="m-0">Hello, Welcome to Owl Roles!</p>
                <div className='w-10 h-10 flex items-center'>
                    <img className='rounded-full' src='/anime-emoji.gif' alt="Welcome" />
                </div>
            </div>
            
            {/* Main content section */}
            <main className='flex flex-col md:flex-row mx-auto max-w-6xl w-full px-4 md:px-8 gap-8 md:gap-12 z-0'>
                <div className='flex flex-col gap-6 justify-center flex-1 z-0'>
                    <h1 className='hero-title text-3xl md:text-5xl lg:text-6xl text-left font-bold text-gray-900 leading-tight'>
                        Discover, Apply & <br /> Get The Career Of Your <span className='bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent'>Dreams</span>
                    </h1>
                    <p className='hero-subtitle text-base md:text-lg lg:text-xl text-gray-600 my-2'>
                        Unlock endless opportunities and land your dream job with just a click!
                    </p>                    
                    <div className='flex flex-col gap-4 hero-search'>
                        <div className='flex w-full shadow-lg border-2 border-white pl-3 md:pl-4 rounded-full items-center gap-2 bg-white hover:shadow-xl transition-all duration-300 cursor-text'>
                            <Search className='h-5 w-5 text-gray-400 flex-shrink-0 transition-colors duration-300' />
                            <input  
                                type="text"
                                placeholder='Find your dream jobs'
                                onChange={(e) => setQuery(e.target.value)}
                                className='search-input bg-inherit outline-none border-none w-full py-3 text-sm md:text-base transition-all duration-300'
                            />  
                            <Button onClick={searchJobHandler} className="rounded-r-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 px-3 md:px-6 transition-all duration-300 active:scale-95">
                                <Search className='h-5 w-5 transition-transform duration-300' />
                            </Button>
                        </div>
                        <span className='hero-badge px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 font-semibold text-xs md:text-sm text-center hover:shadow-md transition-shadow duration-300'>⭐ Best Job Hunt Website</span>
                    </div>
                </div>

                {/* Right section - decorative cards - hidden on mobile */}
                <div className='hidden lg:flex flex-col gap-8 flex-1 justify-center items-end'>
                    <div className='hero-card bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:scale-105 float-animation cursor-pointer group'>
                        <div className='text-center'>
                            <p className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>Hired!</p>
                            <p className='text-gray-500 text-sm mt-1'>Join thousands</p>
                        </div>
                    </div>

                    <div className='hero-card bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:scale-105 cursor-pointer group' style={{animationDelay: '0.2s'}}>
                        <h3 className='text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-300'>Quick Search</h3>
                        <div className='flex gap-2'>
                            <input  
                                type="text"
                                placeholder='Search...'
                                onChange={(e) => setQuery(e.target.value)}
                                className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                            />   
                            <Button onClick={searchJobHandler} className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 rounded-lg transition-all duration-300 active:scale-95">
                                <Search className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HeroSection