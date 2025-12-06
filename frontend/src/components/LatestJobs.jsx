import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-12 md:py-16'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='mb-8 md:mb-12'>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900' data-aos='fade-in'>
                        <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Latest & Top</span> Job Openings
                    </h1>
                    <p className='text-gray-600 mt-2 text-sm md:text-base lg:text-lg'>Discover exciting opportunities from leading companies</p>
                </div>
                {allJobs.length <= 0 ? (
                    <div className='text-center py-16 md:py-20'>
                        <p className='text-lg md:text-xl text-gray-500'>No jobs available right now</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' data-aos='fade-in'>
                        {allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LatestJobs