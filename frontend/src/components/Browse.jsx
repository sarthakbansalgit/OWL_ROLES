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
        <div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 page-transition'>
            <Navbar />
            
            <div className='auth-aurora' />
            <div className='auth-aurora auth-aurora--two' />
            <div className='auth-orb auth-orb--one' />
            <div className='auth-orb auth-orb--two' />
            
            <div className='relative z-10'>
                {/* Hero Section */}
            <div className='bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 py-12 md:py-16 relative overflow-hidden'>
                <div className='absolute inset-0 opacity-20'>
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse' />
                </div>
                <div className='relative max-w-7xl mx-auto px-4 z-20'>
                    <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 slide-in-down'>Browse Opportunities</h1>
                    <p className='text-blue-50 text-lg md:text-xl max-w-2xl slide-in-up'>Discover and apply to amazing job opportunities curated for your expertise</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-12'>
                {/* Search Bar */}
                <div className='mb-8 scale-in'>
                    <div className='relative'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400 h-5 w-5' />
                        <input
                            type='text'
                            placeholder='Search by job title or company...'
                            value={searchInput}
                            onChange={handleSearch}
                            className='w-full pl-12 pr-4 py-4 md:py-5 border-2 border-slate-200 bg-white/90 rounded-xl focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition-all text-base text-slate-900 placeholder:text-slate-500 shadow-lg hover:shadow-xl'
                        />
                    </div>
                </div>

                {/* Filters Section */}
                <div className='mb-8'>
                    <div className='flex gap-4 flex-wrap'>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className='flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all font-medium text-slate-700 hover:text-sky-600 card-3d'
                        >
                            <Filter className='h-4 w-4' />
                            Filters
                        </button>
                        
                        {typeFilter && (
                            <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-100 border border-sky-300 animate-pulse'>
                                <span className='text-sm font-medium text-sky-700'>{typeFilter}</span>
                                <button onClick={() => setTypeFilter('')} className='ml-2'>
                                    <X className='h-4 w-4 text-sky-600 hover:text-sky-800 transition' />
                                </button>
                            </div>
                        )}
                        
                        {locationFilter && (
                            <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-100 border border-sky-300 animate-pulse'>
                                <span className='text-sm font-medium text-sky-700'>{locationFilter}</span>
                                <button onClick={() => setLocationFilter('')} className='ml-2'>
                                    <X className='h-4 w-4 text-sky-600 hover:text-sky-800 transition' />
                                </button>
                            </div>
                        )}

                        {(typeFilter || locationFilter || searchInput) && (
                            <button
                                onClick={clearFilters}
                                className='px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all'
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Filter Dropdowns */}
                    {filterOpen && (
                        <div className='mt-4 p-6 bg-white/90 rounded-2xl border-2 border-slate-200 shadow-2xl slide-in-down backdrop-blur'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                {/* Job Type Filter */}
                                <div className='stagger-item-1'>
                                    <label className='block text-sm font-semibold text-slate-700 mb-4'>Job Type</label>
                                    <div className='space-y-2'>
                                        {jobTypes.map((type, idx) => (
                                            <label key={type} className={`flex items-center gap-3 cursor-pointer hover:bg-sky-50 p-3 rounded-lg transition-all card-3d stagger-item-${idx + 1}`}>
                                                <input
                                                    type='radio'
                                                    name='jobType'
                                                    value={type}
                                                    checked={typeFilter === type}
                                                    onChange={(e) => setTypeFilter(e.target.value)}
                                                    className='w-4 h-4 text-sky-600 cursor-pointer'
                                                />
                                                <span className='text-sm text-slate-700'>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div className='stagger-item-2'>
                                    <label className='block text-sm font-semibold text-slate-700 mb-4'>Location</label>
                                    <div className='space-y-2'>
                                        {locations.map((location, idx) => (
                                            <label key={location} className={`flex items-center gap-3 cursor-pointer hover:bg-sky-50 p-3 rounded-lg transition-all card-3d stagger-item-${idx + 1}`}>
                                                <input
                                                    type='radio'
                                                    name='location'
                                                    value={location}
                                                    checked={locationFilter === location}
                                                    onChange={(e) => setLocationFilter(e.target.value)}
                                                    className='w-4 h-4 text-sky-600 cursor-pointer'
                                                />
                                                <span className='text-sm text-slate-700'>{location}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Salary Range Filter */}
                                <div className='col-span-1 md:col-span-2 stagger-item-3'>
                                    <label className='block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2'>
                                        <DollarSign className='h-4 w-4 text-sky-600' />
                                        Salary Range (₹)
                                    </label>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <input
                                                type='number'
                                                placeholder='Min Salary'
                                                value={salaryMinFilter}
                                                onChange={(e) => setSalaryMinFilter(e.target.value)}
                                                className='w-full px-4 py-3 border-2 border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all'
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type='number'
                                                placeholder='Max Salary'
                                                value={salaryMaxFilter}
                                                onChange={(e) => setSalaryMaxFilter(e.target.value)}
                                                className='w-full px-4 py-3 border-2 border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Header */}
                <div className='mb-8 md:mb-10 flex justify-between items-center scale-in'>
                    <div>
                        <h2 className='font-bold text-2xl md:text-3xl text-slate-900'>Results</h2>
                        <p className='text-base text-slate-600 mt-2'>
                            Found <span className='font-bold text-sky-600 text-lg'>{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
                        </p>
                    </div>
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-20 md:py-32 scale-in'>
                        <div className='inline-block'>
                            <div className='text-7xl mb-6 animate-bounce'>🔍</div>
                            <h3 className='text-2xl md:text-3xl text-slate-900 font-bold mb-3'>No opportunities found</h3>
                            <p className='text-base text-slate-600 mb-8 max-w-md'>Try adjusting your search terms or filters to discover amazing roles</p>
                            <button
                                onClick={clearFilters}
                                className='px-8 py-3 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 hover:shadow-lg text-white rounded-xl font-medium transition-all hover:scale-[1.02]'
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredJobs.map((job, idx) => (
                            <div key={job._id} className={`hover:-translate-y-2 transition-all duration-300 card-3d slide-in-up stagger-item-${(idx % 6) + 1}`}>
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
