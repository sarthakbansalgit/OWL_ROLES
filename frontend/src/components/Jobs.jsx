import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Star, Filter } from 'lucide-react';
import { Button } from './ui/button';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedJob, setSelectedJob] = useState(allJobs[0]);

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

    // Calculate match percentage based on job data
    const calculateMatchPercentage = (job) => {
        return Math.floor(Math.random() * 20) + 75; // 75-95% for demo
    };

    // Generate star rating
    const renderStars = (rating = 4) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                            i < rating ? 'fill-blue-600 text-blue-600' : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />
            
            <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto">
                    {/* Left Panel: Job Description */}
                    <aside className="w-full lg:w-1/3 lg:max-w-md flex-shrink-0">
                        <div className="sticky top-28 p-6 rounded-xl border border-blue-200 bg-blue-50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {selectedJob?.title || 'Job Title'}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                {selectedJob?.description?.substring(0, 100) || 'Department'}
                            </p>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                                    <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
                                        <li>Teach courses in {selectedJob?.title || 'subject'}</li>
                                        <li>Conduct high-impact research.</li>
                                        <li>Mentor students and supervise work.</li>
                                        <li>Contribute to departmental service.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Required Qualifications</h4>
                                    <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
                                        <li>Relevant degree or certification.</li>
                                        <li>Minimum 5 years of experience.</li>
                                        <li>Strong professional record.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Desired Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-300">Deep Learning</span>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-300">NLP</span>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-300">Research</span>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-300">Teaching</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Panel: Candidate Matches */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex min-w-72 flex-col">
                                <div className="flex flex-wrap gap-2 text-sm mb-2">
                                    <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Jobs</a>
                                    <span className="text-gray-400">/</span>
                                    <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">
                                        {selectedJob?.title?.substring(0, 30) || 'Position'}
                                    </a>
                                    <span className="text-gray-400">/</span>
                                    <span className="text-gray-900 font-medium">AI Matches</span>
                                </div>
                                <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-tight mb-2">
                                    Top Candidate Matches
                                </h1>
                                <p className="text-gray-600 text-base">
                                    Best candidates based on AI analysis of their qualifications and experience.
                                </p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 py-3 overflow-x-auto mb-6 pb-2">
                            {['Experience', 'Subject', 'Degree', 'Publications', 'Teaching Quality'].map((filter, idx) => (
                                <button
                                    key={idx}
                                    className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors pl-4 pr-2 whitespace-nowrap border border-blue-300"
                                >
                                    <p className="text-gray-900 text-sm font-medium">{filter}</p>
                                    <span className="text-base">⌄</span>
                                </button>
                            ))}
                        </div>

                        {/* Candidate Cards */}
                        <div className="space-y-6">
                            {filterJobs.length > 0 ? (
                                filterJobs.map((job, idx) => {
                                    const matchScore = 92 - (idx * 5); // Demo: 92%, 87%, 81%
                                    const expertise = 95 - (idx * 10);
                                    const alignment = 88 - (idx * 5);
                                    const rating = 4.5 - (idx * 0.5);

                                    return (
                                        <div
                                            key={job._id}
                                            onClick={() => setSelectedJob(job)}
                                            className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-blue-50 border border-blue-200 p-6 shadow-lg shadow-blue-200/20 hover:bg-blue-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        >
                                            {/* Left Content */}
                                            <div className="flex items-center gap-6">
                                                {/* Match Circle */}
                                                <div className="relative h-28 w-28 flex-shrink-0">
                                                    <svg
                                                        className="absolute inset-0 h-full w-full -rotate-90"
                                                        viewBox="0 0 120 120"
                                                    >
                                                        <circle
                                                            className="text-gray-300"
                                                            cx="60"
                                                            cy="60"
                                                            fill="transparent"
                                                            r="52"
                                                            stroke="currentColor"
                                                            strokeWidth="8"
                                                        ></circle>
                                                        <circle
                                                            className="text-blue-600 transition-all duration-1000"
                                                            cx="60"
                                                            cy="60"
                                                            fill="transparent"
                                                            r="52"
                                                            stroke="currentColor"
                                                            strokeDasharray="326.7"
                                                            strokeDashoffset={326.7 * (1 - matchScore / 100)}
                                                            strokeLinecap="round"
                                                            strokeWidth="8"
                                                        ></circle>
                                                    </svg>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <span className="text-gray-900 text-3xl font-bold">{matchScore}%</span>
                                                        <span className="text-gray-600 text-xs">Match</span>
                                                    </div>
                                                </div>

                                                {/* Candidate Info */}
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-gray-900 text-xl font-bold leading-tight">
                                                        {job.title}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">
                                                        {job.location}
                                                    </p>
                                                    <div className="mt-4 space-y-3">
                                                        {/* Subject Expertise */}
                                                        <div>
                                                            <div className="flex justify-between items-center mb-1">
                                                                <p className="text-gray-700 text-xs font-medium">Subject Expertise</p>
                                                                <p className="text-gray-900 text-xs font-bold">{expertise}%</p>
                                                            </div>
                                                            <div className="w-full bg-gray-300 rounded-full h-1.5">
                                                                <div
                                                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                                                                    style={{ width: `${expertise}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {/* Research & Teaching */}
                                                        <div className="flex items-center gap-6">
                                                            <div>
                                                                <p className="text-gray-700 text-xs font-medium">Research Alignment</p>
                                                                <p className="text-gray-900 font-bold">{alignment}%</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-700 text-xs font-medium">Teaching Rating</p>
                                                                {renderStars(Math.floor(rating))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Actions */}
                                            <div className="flex flex-col justify-center items-center md:items-end gap-3 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-blue-200 md:pl-6">
                                                <Button className="w-full md:w-auto min-w-[120px] h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-opacity shadow-lg shadow-blue-200/30">
                                                    View Profile
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full md:w-auto min-w-[120px] h-10 px-4 border-blue-300 bg-white hover:bg-blue-50 text-gray-900 text-sm font-medium transition-colors"
                                                >
                                                    Shortlist
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center h-96">
                                    <p className="text-gray-600 text-lg">No candidates found for this position.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Jobs;
