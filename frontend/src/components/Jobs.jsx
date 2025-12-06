import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    const handleSearch = (e) => {
        dispatch(setSearchedQuery(e.target.value));
    };

    return (
        <div className='bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-4 md:mt-5 px-4'>
                {/* Mobile: Full width, Desktop: Sidebar layout */}
                <div className='flex flex-col lg:flex-row gap-4 md:gap-8'>
                    {/* Filter Sidebar - hidden on mobile, shown on lg */}
                    <div className='hidden lg:block lg:w-1/4'>
                        <FilterCard />
                    </div>
                    {/* Jobs Grid - full width on mobile */}
                    <div className='w-full lg:flex-1'>
                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex items-center justify-center h-64 md:h-96'>
                                    <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center px-4'>No jobs found. Try adjusting your filters.</p>
                                </div>
                            ) : (
                                <div className='max-h-screen lg:h-[88vh] overflow-y-auto pb-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
