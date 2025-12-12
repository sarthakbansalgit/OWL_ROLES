import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, Filter, X, DollarSign } from 'lucide-react';

const Browse = () => {
    useGetAllJobs(); // Ensure this hook fetches and sets the allJobs data
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filterOpen, setFilterOpen] = useState(false);
    const [typeFilter, setTypeFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [salaryMinFilter, setSalaryMinFilter] = useState('');
    const [salaryMaxFilter, setSalaryMaxFilter] = useState('');
    const [searchInput, setSearchInput] = useState(searchedQuery);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery("")); // Reset search query on unmount
        };
    }, [dispatch]);

    // Get unique job types and locations for filters
    const jobTypes = [...new Set(allJobs.map(job => job.jobType).filter(Boolean))];
    const locations = [...new Set(allJobs.map(job => job.location).filter(Boolean))];

    // Filter jobs based on search and filters
    const filteredJobs = allJobs.filter(job => {
        const title = job.title?.toLowerCase() || "";
        const companyName = job.company?.name?.toLowerCase() || "";
        const searchLower = searchInput.toLowerCase();
        
        const matchesSearch = title.includes(searchLower) || companyName.includes(searchLower);
        const matchesType = !typeFilter || job.jobType === typeFilter;
        const matchesLocation = !locationFilter || job.location === locationFilter;
        
        // Add salary filtering
        let matchesSalary = true;
        if (salaryMinFilter) {
            const minSalary = parseInt(salaryMinFilter);
            const salary = parseInt(job.salary || 0);
            matchesSalary = salary >= minSalary;
        }
        if (salaryMaxFilter) {
            const maxSalary = parseInt(salaryMaxFilter);
            const salary = parseInt(job.salary || 0);
            matchesSalary = matchesSalary && salary <= maxSalary;
        }
        
        return matchesSearch && matchesType && matchesLocation && matchesSalary;
    });

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        dispatch(setSearchedQuery(value));
    };

    const clearFilters = () => {
        setSearchInput('');
        setTypeFilter('');
        setLocationFilter('');
        setSalaryMinFilter('');
        setSalaryMaxFilter('');
        dispatch(setSearchedQuery(''));
    };

    return (
        <div className='bg-gradient-to-b from-blue-50 to-white min-h-screen'>
            <Navbar />
            
            <div className='page-transition'>
                {/* Hero Section */}
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 py-8 md:py-12'>
                <div className='max-w-7xl mx-auto px-4'>
                    <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4'>Browse Opportunities</h1>
                    <p className='text-blue-100 text-base md:text-lg'>Discover and apply to amazing job opportunities</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Search Bar */}
                <div className='mb-8'>
                    <div className='relative'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <input
                            type='text'
                            placeholder='Search by job title or company...'
                            value={searchInput}
                            onChange={handleSearch}
                            className='w-full pl-12 pr-4 py-3 md:py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm md:text-base'
                        />
                    </div>
                </div>

                {/* Filters Section */}
                <div className='mb-8'>
                    <div className='flex gap-4 flex-wrap'>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className='flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all font-medium text-gray-700'
                        >
                            <Filter className='h-4 w-4' />
                            Filters
                        </button>
                        
                        {typeFilter && (
                            <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 border border-blue-300'>
                                <span className='text-sm font-medium text-blue-700'>{typeFilter}</span>
                                <button onClick={() => setTypeFilter('')} className='ml-2'>
                                    <X className='h-4 w-4 text-blue-600 hover:text-blue-800' />
                                </button>
                            </div>
                        )}
                        
                        {locationFilter && (
                            <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 border border-blue-300'>
                                <span className='text-sm font-medium text-blue-700'>{locationFilter}</span>
                                <button onClick={() => setLocationFilter('')} className='ml-2'>
                                    <X className='h-4 w-4 text-blue-600 hover:text-blue-800' />
                                </button>
                            </div>
                        )}

                        {(typeFilter || locationFilter || searchInput) && (
                            <button
                                onClick={clearFilters}
                                className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all'
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Filter Dropdowns */}
                    {filterOpen && (
                        <div className='mt-4 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-lg'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {/* Job Type Filter */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-3'>Job Type</label>
                                    <div className='space-y-2'>
                                        {jobTypes.map(type => (
                                            <label key={type} className='flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors'>
                                                <input
                                                    type='radio'
                                                    name='jobType'
                                                    value={type}
                                                    checked={typeFilter === type}
                                                    onChange={(e) => setTypeFilter(e.target.value)}
                                                    className='w-4 h-4 text-blue-600 cursor-pointer'
                                                />
                                                <span className='text-sm text-gray-700'>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-3'>Location</label>
                                    <div className='space-y-2'>
                                        {locations.map(location => (
                                            <label key={location} className='flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors'>
                                                <input
                                                    type='radio'
                                                    name='location'
                                                    value={location}
                                                    checked={locationFilter === location}
                                                    onChange={(e) => setLocationFilter(e.target.value)}
                                                    className='w-4 h-4 text-blue-600 cursor-pointer'
                                                />
                                                <span className='text-sm text-gray-700'>{location}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Salary Range Filter */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-3'>Salary Range (₹)</label>
                                    <div className='space-y-3'>
                                        <div>
                                            <input
                                                type='number'
                                                placeholder='Min Salary'
                                                value={salaryMinFilter}
                                                onChange={(e) => setSalaryMinFilter(e.target.value)}
                                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type='number'
                                                placeholder='Max Salary'
                                                value={salaryMaxFilter}
                                                onChange={(e) => setSalaryMaxFilter(e.target.value)}
                                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Header */}
                <div className='mb-6 md:mb-8 flex justify-between items-center'>
                    <div>
                        <h2 className='font-bold text-xl md:text-2xl text-gray-900'>Results</h2>
                        <p className='text-sm md:text-base text-gray-600 mt-1'>
                            Found <span className='font-semibold text-blue-600 text-lg'>{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
                        </p>
                    </div>
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-16 md:py-24'>
                        <div className='inline-block'>
                            <div className='text-7xl mb-6'>🔍</div>
                            <h3 className='text-xl md:text-2xl text-gray-900 font-bold mb-2'>No jobs found</h3>
                            <p className='text-base text-gray-600 mb-6'>Try adjusting your search terms or filters</p>
                            <button
                                onClick={clearFilters}
                                className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors'
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {filteredJobs.map((job) => (
                            <div key={job._id} className='hover:-translate-y-1 transition-transform duration-300'>
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Browse;
