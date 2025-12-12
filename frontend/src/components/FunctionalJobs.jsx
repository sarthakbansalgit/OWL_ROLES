import React, { useEffect, useState, useRef } from 'react';
import Navbar from './shared/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Star, Filter, Briefcase, MapPin, Clock, AlertCircle, X, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';

const FunctionalJobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedJob, setSelectedJob] = useState(allJobs?.[0] || null);
    const [loading, setLoading] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [experienceFilter, setExperienceFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [salaryMinFilter, setSalaryMinFilter] = useState('');
    const [salaryMaxFilter, setSalaryMaxFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [searchInput, setSearchInput] = useState(searchedQuery);
    const [showFilters, setShowFilters] = useState(false);
    const [matchScores, setMatchScores] = useState({});

    useEffect(() => {
        let filtered = allJobs;

        // Search filter
        if (searchInput) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.location.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.company?.name?.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        // Experience filter
        if (experienceFilter) {
            filtered = filtered.filter(job => {
                const minExp = parseInt(job.minExperience || 0);
                const userExp = parseInt(user?.profile?.experience?.length || 0);
                return userExp >= minExp;
            });
        }

        // Location filter
        if (locationFilter) {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        // Job Type filter
        if (typeFilter) {
            filtered = filtered.filter(job =>
                (job.jobType || 'Full-time').toLowerCase() === typeFilter.toLowerCase()
            );
        }

        // Salary filter
        if (salaryMinFilter) {
            const minSalary = parseInt(salaryMinFilter);
            filtered = filtered.filter(job => {
                const salary = parseInt(job.salary || 0);
                return salary >= minSalary;
            });
        }

        if (salaryMaxFilter) {
            const maxSalary = parseInt(salaryMaxFilter);
            filtered = filtered.filter(job => {
                const salary = parseInt(job.salary || 0);
                return salary <= maxSalary;
            });
        }

        // Level filter
        if (levelFilter) {
            filtered = filtered.filter(job =>
                job.level?.toLowerCase() === levelFilter.toLowerCase()
            );
        }

        // Company filter
        if (companyFilter) {
            filtered = filtered.filter(job =>
                job.company?.name?.toLowerCase().includes(companyFilter.toLowerCase())
            );
        }

        setFilterJobs(filtered);
        if (filtered.length > 0 && !selectedJob) {
            setSelectedJob(filtered[0]);
        }
    }, [experienceFilter, locationFilter, typeFilter, salaryMinFilter, salaryMaxFilter, levelFilter, companyFilter, searchInput, allJobs, user, selectedJob]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        dispatch(setSearchedQuery(e.target.value));
    };

    const clearAllFilters = () => {
        setSearchInput('');
        setExperienceFilter('');
        setLocationFilter('');
        setTypeFilter('');
        setSalaryMinFilter('');
        setSalaryMaxFilter('');
        setLevelFilter('');
        setCompanyFilter('');
        dispatch(setSearchedQuery(''));
    };

    const handleApplyJob = async (jobId) => {
        if (!user) {
            alert('Please log in to apply for jobs');
            return;
        }

        if (appliedJobs.has(jobId)) {
            alert('You have already applied for this job');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/application/apply`;

            const response = await axios.post(apiUrl, { jobId }, config);

            if (response.data.success) {
                setAppliedJobs(new Set(appliedJobs).add(jobId));
                alert('Application submitted successfully!');
            }
        } catch (error) {
            console.error('Error applying for job:', error);
            alert(error.response?.data?.message || 'Failed to apply for job');
        } finally {
            setLoading(false);
        }
    };

    const calculateMatchScore = (job) => {
        if (matchScores[job._id]) {
            return matchScores[job._id];
        }

        // Simple matching algorithm
        let score = 0;
        const userBio = (user?.profile?.bio || '').toLowerCase();
        const jobDesc = (job.description || '').toLowerCase();

        // Check for matching keywords
        const keywords = ['python', 'javascript', 'react', 'node', 'machine learning', 'ai', 'data'];
        keywords.forEach(keyword => {
            if (userBio.includes(keyword) && jobDesc.includes(keyword)) {
                score += 10;
            }
        });

        // Experience match
        const userExp = user?.profile?.experience?.length || 0;
        const minExp = parseInt(job.minExperience || 0);
        if (userExp >= minExp) {
            score += 15;
        }

        // Base score
        score = Math.min(100, 50 + score);

        setMatchScores(prev => ({
            ...prev,
            [job._id]: score
        }));

        return score;
    };

    const renderStars = (count) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />

            <main className="page-transition px-4 sm:px-10 lg:px-20 py-8 pt-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">
                            Job Opportunities
                        </h1>
                        <p className="text-gray-600">
                            Find perfect matches based on AI analysis
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search jobs by title, description, company, or location..."
                            value={searchInput}
                            onChange={handleSearch}
                            className="w-full px-4 py-3 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Filters Toggle Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-blue-600 bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
                        >
                            <Filter className="h-5 w-5" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Detailed Filters Panel */}
                    {showFilters && (
                        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* Job Type Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Search location..."
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>

                                {/* Company Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        placeholder="Search company..."
                                        value={companyFilter}
                                        onChange={(e) => setCompanyFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>

                                {/* Experience Level Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                                    <select
                                        value={levelFilter}
                                        onChange={(e) => setLevelFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
                                    >
                                        <option value="">All Levels</option>
                                        <option value="Entry">Entry Level</option>
                                        <option value="Mid">Mid-Level</option>
                                        <option value="Senior">Senior</option>
                                        <option value="Executive">Executive</option>
                                    </select>
                                </div>

                                {/* Salary Range - Min */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Min Salary (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="Min amount"
                                        value={salaryMinFilter}
                                        onChange={(e) => setSalaryMinFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>

                                {/* Salary Range - Max */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Salary (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="Max amount"
                                        value={salaryMaxFilter}
                                        onChange={(e) => setSalaryMaxFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>

                                {/* Clear Filters Button */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearAllFilters}
                                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                                    >
                                        <X className="w-4 h-4 inline mr-2" />
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(typeFilter || locationFilter || companyFilter || levelFilter || salaryMinFilter || salaryMaxFilter) && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-blue-300">
                                    {typeFilter && (
                                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                            Type: {typeFilter}
                                        </span>
                                    )}
                                    {locationFilter && (
                                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                            Location: {locationFilter}
                                        </span>
                                    )}
                                    {companyFilter && (
                                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                            Company: {companyFilter}
                                        </span>
                                    )}
                                    {levelFilter && (
                                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-medium">
                                            Level: {levelFilter}
                                        </span>
                                    )}
                                    {salaryMinFilter && (
                                        <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-medium">
                                            Min: ₹{salaryMinFilter}
                                        </span>
                                    )}
                                    {salaryMaxFilter && (
                                        <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-medium">
                                            Max: ₹{salaryMaxFilter}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen">
                        {/* Left Panel - Job Details */}
                        {selectedJob && (
                            <aside className="sticky top-24 h-fit lg:col-span-1">
                                <div className="rounded-lg bg-blue-50 border border-blue-200 p-6 shadow-lg shadow-blue-200/20">
                                    <div className="mb-4">
                                        <h3 className="text-gray-900 text-xl font-bold mb-1">
                                            {selectedJob.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{selectedJob.company}</p>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                                            <MapPin className="h-4 w-4" />
                                            {selectedJob.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Clock className="h-4 w-4" />
                                            {selectedJob.jobType || 'Full-time'}
                                        </div>
                                    </div>

                                    <div className="border-t border-b border-blue-200 py-4 mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">About the Role</h4>
                                        <p className="text-sm text-gray-600 line-clamp-4">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• {selectedJob.minExperience || 3}+ years experience</li>
                                            <li>• Bachelor's degree or equivalent</li>
                                            <li>• Strong problem-solving skills</li>
                                        </ul>
                                    </div>

                                    <Button
                                        onClick={() => handleApplyJob(selectedJob._id)}
                                        disabled={loading || appliedJobs.has(selectedJob._id)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                    >
                                        {appliedJobs.has(selectedJob._id) ? '✓ Applied' : 'Apply Now'}
                                    </Button>
                                </div>
                            </aside>
                        )}

                        {/* Right Panel - Job List */}
                        <div className="lg:col-span-2">
                            {filterJobs.length > 0 ? (
                                <div className="space-y-4">
                                    {filterJobs.map((job) => {
                                        const matchScore = calculateMatchScore(job);
                                        return (
                                            <div
                                                key={job._id}
                                                onClick={() => setSelectedJob(job)}
                                                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                                                    selectedJob?._id === job._id
                                                        ? 'bg-blue-100 border-blue-600'
                                                        : 'bg-white border-blue-200 hover:border-blue-400'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900">{job.title}</h3>
                                                        <p className="text-gray-600 text-sm">{typeof job.company === 'string' ? job.company : typeof job.company === 'object' && job.company?.name ? job.company.name : 'Company'}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-blue-600">{matchScore}%</div>
                                                        <div className="text-xs text-gray-500">Match</div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" /> {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="h-4 w-4" /> {job.jobType || 'Full-time'}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {job.description}
                                                </p>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-2">
                                                        {job.required_skills?.slice(0, 2).map((skill, idx) => (
                                                            <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                                {typeof skill === 'string' ? skill : typeof skill === 'object' && skill?.name ? skill.name : String(skill)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {appliedJobs.has(job._id) && (
                                                        <span className="text-xs text-green-600 font-medium">✓ Applied</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 text-center">
                                    <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                                    <p className="text-gray-600 text-lg">No jobs found matching your criteria</p>
                                    <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FunctionalJobs;
