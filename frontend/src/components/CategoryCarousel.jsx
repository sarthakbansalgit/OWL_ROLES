import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import InfoCardsHome from './InfoCardsHome';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-b from-blue-50 to-blue-50 py-8 md:py-12 relative overflow-hidden'>
            <style>{`
                @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
                .category-heading { animation: slideInRight 0.8s ease-out; }
                .category-btn { position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
                .category-btn:hover { transform: translateY(-8px) scale(1.05); box-shadow: 0 12px 24px rgba(168, 85, 247, 0.4); }
                .category-btn:active { transform: translateY(-4px) scale(0.98); }
                .category-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.5s ease; }
                .category-btn:hover::before { left: 100%; }
            `}</style>
            
            <InfoCardsHome className='my-8 md:my-12'/>
            <div className='max-w-6xl mx-auto px-4'>
                <h2 className='category-heading text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center'>
                    Explore by <span className='bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent'>Category</span>
                </h2>
                <Carousel className="w-full">
                    <CarouselContent className='flex gap-3 md:gap-4'>
                        {
                            category.map((cat, index) => (
                                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <Button 
                                        onClick={()=>searchJobHandler(cat)} 
                                        className='category-btn w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-4 md:py-6 text-sm md:text-base shadow-lg'
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        {cat}
                                    </Button>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-90' />
                    <CarouselNext className='hidden md:flex hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-90' />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel