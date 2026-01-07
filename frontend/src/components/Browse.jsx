import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, Filter, X, DollarSign, Bookmark, TrendingUp, Award, FileText, Briefcase, Lightbulb, Target, Users } from 'lucide-react';

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
                {/* Premium Hero Section */}
                <div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 md:py-24'>
                    {/* Animated background elements */}
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float' />
                        <div className='absolute -bottom-20 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow' />
                    </div>
                    
                    <div className='relative max-w-7xl mx-auto px-4 z-20'>
                        <div className='text-center mb-8 animate-fade-in'>
                            <span className='inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm font-semibold text-blue-200 mb-6 backdrop-blur-sm'>✨ Career Opportunities Await</span>
                            <h1 className='text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight'>
                                Your Dream Role<br />
                                <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent'>is Waiting</span>
                            </h1>
                            <p className='text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8'>Explore curated opportunities, connect with innovative companies, and take the next step in your career journey.</p>
                            
                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                                <button className='px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-[0_20px_60px_rgba(59,130,246,0.3)] hover:shadow-[0_30px_90px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-all duration-300'>
                                    Explore Jobs
                                </button>
                                <button className='px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-bold text-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300'>
                                    Career Tips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className='max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-12'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/50 animate-scale-in'>
                            <div className='text-3xl font-bold text-blue-600 mb-2'>{filteredJobs.length}+</div>
                            <div className='text-sm text-slate-600'>Active Jobs</div>
                        </div>
                        <div className='bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/50 animate-scale-in' style={{animationDelay: '0.1s'}}>
                            <div className='text-3xl font-bold text-cyan-600 mb-2'>500+</div>
                            <div className='text-sm text-slate-600'>Companies</div>
                        </div>
                        <div className='bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/50 animate-scale-in' style={{animationDelay: '0.2s'}}>
                            <div className='text-3xl font-bold text-indigo-600 mb-2'>10K+</div>
                            <div className='text-sm text-slate-600'>Placements</div>
                        </div>
                        <div className='bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/50 animate-scale-in' style={{animationDelay: '0.3s'}}>
                            <div className='text-3xl font-bold text-blue-600 mb-2'>24/7</div>
                            <div className='text-sm text-slate-600'>Support</div>
                        </div>
                    </div>
                </div>

            <div className='max-w-7xl mx-auto px-4 py-16'>
                {/* Enhanced Search Section */}
                <div className='mb-12'>
                    <div className='mb-6'>
                        <h2 className='text-3xl font-bold text-slate-900 mb-2'>Find Your Perfect Role</h2>
                        <p className='text-slate-600'>Filter and search through hundreds of opportunities</p>
                    </div>
                    
                    {/* Glassmorphism Search Bar */}
                    <div className='relative group'>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300' />
                        <div className='relative'>
                            <Search className='absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5' />
                            <input
                                type='text'
                                placeholder='Search by job title or company...'
                                value={searchInput}
                                onChange={handleSearch}
                                className='w-full pl-14 pr-5 py-4 bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all text-base text-slate-900 placeholder:text-slate-400 shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.15)]'
                            />
                        </div>
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
                <div className='mb-12 flex justify-between items-center animate-fade-in'>
                    <div>
                        <h2 className='text-3xl font-bold text-slate-900'>Available Opportunities</h2>
                        <p className='text-slate-600 mt-2'>
                            Showing <span className='font-bold text-blue-600 text-lg'>{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
                        </p>
                    </div>
                </div>

                {/* Personalized Dashboard Section */}
                {filteredJobs.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                        {/* Recommended Jobs Card */}
                        <div className='bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform'>
                                    <Briefcase className='h-6 w-6 text-blue-600' />
                                </div>
                                <h3 className='text-lg font-bold text-slate-900'>Recommended</h3>
                            </div>
                            <p className='text-sm text-slate-700 mb-4'>Perfect matches based on your profile and skills</p>
                            <div className='text-2xl font-bold text-blue-600'>{Math.ceil(filteredJobs.length * 0.3)}</div>
                            <p className='text-xs text-slate-600 mt-2'>Personalized for you</p>
                        </div>

                        {/* Trending Skills Card */}
                        <div className='bg-gradient-to-br from-cyan-50 to-cyan-100/50 backdrop-blur-lg rounded-2xl p-6 border border-cyan-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-3 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform'>
                                    <TrendingUp className='h-6 w-6 text-cyan-600' />
                                </div>
                                <h3 className='text-lg font-bold text-slate-900'>Trending</h3>
                            </div>
                            <p className='text-sm text-slate-700 mb-4'>In-demand skills in the job market</p>
                            <div className='text-2xl font-bold text-cyan-600'>{jobTypes.length}</div>
                            <p className='text-xs text-slate-600 mt-2'>Job categories</p>
                        </div>

                        {/* Saved Jobs Card */}
                        <div className='bg-gradient-to-br from-indigo-50 to-indigo-100/50 backdrop-blur-lg rounded-2xl p-6 border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform'>
                                    <Bookmark className='h-6 w-6 text-indigo-600' />
                                </div>
                                <h3 className='text-lg font-bold text-slate-900'>Saved Jobs</h3>
                            </div>
                            <p className='text-sm text-slate-700 mb-4'>Your personal collection of dream roles</p>
                            <div className='text-2xl font-bold text-indigo-600'>5</div>
                            <p className='text-xs text-slate-600 mt-2'>Bookmarked</p>
                        </div>
                    </div>
                )}

                {/* Jobs Grid */}
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-20 md:py-32 animate-fade-in'>
                        <div className='inline-block'>
                            <div className='text-8xl mb-6 animate-bounce-slow'>🎯</div>
                            <h3 className='text-3xl md:text-4xl text-slate-900 font-bold mb-3'>No opportunities found</h3>
                            <p className='text-lg text-slate-600 mb-8 max-w-md'>Try adjusting your search terms or filters to discover amazing roles</p>
                            <button
                                onClick={clearFilters}
                                className='px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-[0_15px_60px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_100px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all'
                            >
                                Clear Filters & Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Premium Jobs Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
                            {filteredJobs.map((job, idx) => (
                                <div 
                                    key={job._id} 
                                    className={`group animate-fade-in hover:-translate-y-3 transition-all duration-300`}
                                    style={{animationDelay: `${idx * 0.05}s`}}
                                >
                                    <Job job={job} />
                                </div>
                            ))}
                        </div>

                        {/* Load More CTA */}
                        <div className='text-center py-12'>
                            <p className='text-slate-600 text-lg mb-6'>Showing {filteredJobs.length} of {filteredJobs.length} opportunities</p>
                            <button className='px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold shadow-[0_15px_60px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_100px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300'>
                                Keep Exploring →
                            </button>
                        </div>
                    </>
                )}

                {/* Career Tips & Tricks Section */}
                {filteredJobs.length > 0 && (
                    <div className='mt-20 pt-16 border-t border-slate-200'>
                        <div className='mb-12 text-center'>
                            <h2 className='text-4xl font-bold text-slate-900 mb-4'>Career Tips & Growth</h2>
                            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>Level up your career with these insider tips and strategies</p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
                            {/* Resume Tips */}
                            <div className='bg-gradient-to-br from-amber-50 to-orange-50/50 backdrop-blur-lg rounded-2xl p-8 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer'>
                                <div className='mb-6'>
                                    <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform'>
                                        <FileText className='h-7 w-7' />
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-slate-900 mb-3'>Perfect Resume</h3>
                                <ul className='space-y-3 text-sm text-slate-700 mb-6'>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-amber-600 font-bold mt-0.5'>✓</span>
                                        <span>Keep it to one page with metrics</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-amber-600 font-bold mt-0.5'>✓</span>
                                        <span>Use action verbs and achievements</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-amber-600 font-bold mt-0.5'>✓</span>
                                        <span>Tailor for each job application</span>
                                    </li>
                                </ul>
                                <button className='w-full py-2 text-sm font-semibold text-amber-600 hover:bg-amber-100 rounded-lg transition-colors'>Learn More →</button>
                            </div>

                            {/* Interview Tips */}
                            <div className='bg-gradient-to-br from-emerald-50 to-teal-50/50 backdrop-blur-lg rounded-2xl p-8 border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer'>
                                <div className='mb-6'>
                                    <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform'>
                                        <Users className='h-7 w-7' />
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-slate-900 mb-3'>Interview Success</h3>
                                <ul className='space-y-3 text-sm text-slate-700 mb-6'>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-emerald-600 font-bold mt-0.5'>✓</span>
                                        <span>Research the company thoroughly</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-emerald-600 font-bold mt-0.5'>✓</span>
                                        <span>Practice the STAR method</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-emerald-600 font-bold mt-0.5'>✓</span>
                                        <span>Ask meaningful questions</span>
                                    </li>
                                </ul>
                                <button className='w-full py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors'>Learn More →</button>
                            </div>

                            {/* Skill Development */}
                            <div className='bg-gradient-to-br from-violet-50 to-purple-50/50 backdrop-blur-lg rounded-2xl p-8 border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer'>
                                <div className='mb-6'>
                                    <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 text-white rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform'>
                                        <Lightbulb className='h-7 w-7' />
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-slate-900 mb-3'>Skill Growth</h3>
                                <ul className='space-y-3 text-sm text-slate-700 mb-6'>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-violet-600 font-bold mt-0.5'>✓</span>
                                        <span>Learn trending technologies</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-violet-600 font-bold mt-0.5'>✓</span>
                                        <span>Build impressive projects</span>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-violet-600 font-bold mt-0.5'>✓</span>
                                        <span>Get certifications & credentials</span>
                                    </li>
                                </ul>
                                <button className='w-full py-2 text-sm font-semibold text-violet-600 hover:bg-violet-100 rounded-lg transition-colors'>Learn More →</button>
                            </div>
                        </div>

                        {/* Final CTA Section */}
                        <div className='bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center text-white overflow-hidden relative'>
                            <div className='absolute inset-0 overflow-hidden'>
                                <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float' />
                                <div className='absolute -bottom-20 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow' />
                            </div>
                            <div className='relative z-10'>
                                <h3 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Launch Your Career?</h3>
                                <p className='text-lg text-blue-100 mb-8 max-w-2xl mx-auto'>Apply to roles that match your skills, track your applications, and land your dream job today.</p>
                                <button className='px-10 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 rounded-xl font-bold text-lg shadow-[0_20px_60px_rgba(59,130,246,0.4)] hover:shadow-[0_30px_100px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 transition-all duration-300'>
                                    Start Applying Now →
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Browse;
