import React, { useEffect, useState, useRef } from 'react';
import Navbar from './shared/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Star, Filter, Briefcase, MapPin, Clock, AlertCircle } from 'lucide-react';
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
    const [matchScores, setMatchScores] = useState({});

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

    // Apply filters
    useEffect(() => {
        let filtered = filterJobs;

        if (experienceFilter) {
            filtered = filtered.filter(job => {
                const minExp = parseInt(job.minExperience || 0);
                const userExp = parseInt(user?.profile?.experience?.length || 0);
                return userExp >= minExp;
            });
        }

        if (locationFilter) {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(job =>
                (job.jobType || 'Full-time').toLowerCase() === typeFilter.toLowerCase()
            );
        }

        setFilterJobs(filtered);
        if (filtered.length > 0 && !selectedJob) {
            setSelectedJob(filtered[0]);
        }
    }, [experienceFilter, locationFilter, typeFilter]);

    const handleSearch = (e) => {
        dispatch(setSearchedQuery(e.target.value));
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

            <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
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
                    <div className="mb-6 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search jobs by title, description, or location..."
                            value={searchedQuery}
                            onChange={handleSearch}
                            className="flex-1 px-4 py-3 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex gap-3 flex-wrap">
                        <select
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                            className="px-4 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        >
                            <option value="">All Experience Levels</option>
                            <option value="0">Entry Level (0-2 years)</option>
                            <option value="3">Mid-Level (3-5 years)</option>
                            <option value="6">Senior (6+ years)</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        >
                            <option value="">All Job Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Filter by location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-4 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        />
                    </div>

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
