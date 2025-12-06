import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-purple-300 transition-all duration-300 p-4 md:p-6 flex flex-col h-full group hover:scale-105 hover:-translate-y-2 cursor-pointer'>
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .job-card-content { animation: fadeInUp 0.5s ease-out forwards; }
                .bookmark-btn:hover svg { animation: rotateScale 0.4s ease-out; }
                @keyframes rotateScale { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(-10deg); } 100% { transform: scale(1) rotate(0deg); } }
            `}</style>
            
            <div className='job-card-content flex items-center justify-between mb-3 md:mb-4'>
                <p className='text-xs md:text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="ghost" className="bookmark-btn rounded-full hover:bg-purple-50 transition-all duration-300 active:scale-95" size="icon"><Bookmark className='text-gray-400 group-hover:text-purple-600 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300' /></Button>
            </div>

            <div className='job-card-content flex items-center gap-2 md:gap-3 mb-3 md:mb-4 group-hover:opacity-100 transition-all duration-300'>
                <div className='h-10 md:h-12 w-10 md:w-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border border-purple-200 flex-shrink-0 group-hover:shadow-md transition-all duration-300'>
                    <Avatar className='h-8 md:h-10 w-8 md:w-10'>
                        <AvatarImage src={job?.company?.logo || "/src/assets/blog_default.webp"} />
                    </Avatar>
                </div>
                <div>
                    <h2 className='font-bold text-sm md:text-base text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300'>{job?.company?.name}</h2>
                    <p className='text-xs md:text-sm text-gray-500'>India</p>
                </div>
            </div>

            <h1 className='job-card-content font-bold text-base md:text-lg lg:text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300'>{job?.title}</h1>
            <p className='job-card-content text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 group-hover:text-gray-700 transition-colors duration-300'>{job?.description}</p>
            
            <div className='job-card-content flex items-center gap-2 mt-auto mb-3 md:mb-4 flex-wrap'>
                <Badge className='bg-purple-100 text-purple-700 border border-purple-200 text-xs md:text-sm group-hover:bg-purple-200 group-hover:shadow-md transition-all duration-300'>{job?.position} Positions</Badge>
                <Badge className='bg-blue-100 text-blue-700 border border-blue-200 text-xs md:text-sm group-hover:bg-blue-200 group-hover:shadow-md transition-all duration-300'>{job?.jobType}</Badge>
                <Badge className='bg-pink-100 text-pink-700 border border-pink-200 text-xs md:text-sm group-hover:bg-pink-200 group-hover:shadow-md transition-all duration-300'>₹{job?.salary}</Badge>
            </div>
            
            <Button onClick={()=> navigate(`/description/${job?._id}`)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm md:text-base py-2 md:py-3 transition-all duration-300 active:scale-95 group-hover:shadow-lg">
                View Details
            </Button>
        </div>
    )
}

export default Job