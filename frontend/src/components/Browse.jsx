import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs(); // Ensure this hook fetches and sets the allJobs data
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery("")); // Reset search query on unmount
        };
    }, [dispatch]);

    


    // Filter jobs based on the searchedQuery
    const filteredJobs = allJobs.filter(job => {
        const title = job.title?.toLowerCase() || ""; // Safely handle missing title
        const companyName = job.company?.name?.toLowerCase() || ""; // Safely handle missing company name
        return (
            title.includes(searchedQuery.toLowerCase()) ||
            companyName.includes(searchedQuery.toLowerCase())
        );
    });
    
    

    return (
        <div className='bg-white min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-8 md:my-10 px-4'>
                <div className='mb-6 md:mb-8'>
                    <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 my-3 md:my-4'>Search Results</h1>
                    <p className='text-sm md:text-base text-gray-600'>Found <span className='font-semibold text-blue-600'>{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}</p>
                </div>
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-16 md:py-20'>
                        <div className='inline-block'>
                            <div className='text-6xl mb-4'>🔍</div>
                            <p className='text-lg md:text-xl text-gray-600 font-semibold'>No jobs found matching your criteria</p>
                            <p className='text-sm text-gray-500 mt-2'>Try adjusting your search terms</p>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
