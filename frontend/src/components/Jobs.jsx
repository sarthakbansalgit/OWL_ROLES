import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Star, Filter, TrendingUp, Users, Briefcase, Award } from 'lucide-react';
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
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden">
            {/* Animated background elements */}
            <div className='auth-aurora fixed inset-0 opacity-30' />
            <div className='auth-aurora auth-aurora--two fixed inset-0 opacity-20' />
            <div className='auth-orb auth-orb--one fixed opacity-15' />
            
            <Navbar />
            
            <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto">
                    {/* Left Panel: Job Description */}
                    <aside className="w-full lg:w-1/3 lg:max-w-md flex-shrink-0">
                        <div className="sticky top-28 p-8 rounded-2xl border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-xl hover:shadow-2xl transition-all card-3d backdrop-blur-xl">
                            <h3 className="text-3xl font-bold text-slate-900 mb-2 drop-shadow-lg">
                                {selectedJob?.title || 'Job Title'}
                            </h3>
                            <p className="text-slate-600 text-sm mb-8 font-medium">
                                {selectedJob?.description?.substring(0, 100) || 'Department'}
                            </p>
                            <div className="space-y-8">
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Briefcase className="h-5 w-5 text-sky-600" />
                                        <h4 className="font-bold text-slate-900 text-base">Key Responsibilities</h4>
                                    </div>
                                    <ul className="space-y-2 text-slate-700 text-sm list-disc list-inside ml-1">
                                        <li>Teach courses in {selectedJob?.title || 'subject'}</li>
                                        <li>Conduct high-impact research.</li>
                                        <li>Mentor students and supervise work.</li>
                                        <li>Contribute to departmental service.</li>
                                    </ul>
                                </div>
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="h-5 w-5 text-sky-600" />
                                        <h4 className="font-bold text-slate-900 text-base">Required Qualifications</h4>
                                    </div>
                                    <ul className="space-y-2 text-slate-700 text-sm list-disc list-inside ml-1">
                                        <li>Relevant degree or certification.</li>
                                        <li>Minimum 5 years of experience.</li>
                                        <li>Strong professional record.</li>
                                    </ul>
                                </div>
                                <div className="group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <TrendingUp className="h-5 w-5 text-sky-600" />
                                        <h4 className="font-bold text-slate-900 text-base">Desired Expertise</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-sky-100 text-sky-700 text-xs font-bold px-4 py-2 rounded-full border border-sky-300/60 hover:border-sky-400 transition-all card-3d">Deep Learning</span>
                                        <span className="bg-sky-100 text-sky-700 text-xs font-bold px-4 py-2 rounded-full border border-sky-300/60 hover:border-sky-400 transition-all card-3d">NLP</span>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-300/60 hover:border-blue-400 transition-all card-3d">Research</span>
                                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full border border-indigo-300/60 hover:border-indigo-400 transition-all card-3d">Teaching</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Panel: Candidate Matches */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 slide-in-down">
                            <div className="flex min-w-72 flex-col">
                                <div className="flex flex-wrap gap-2 text-sm mb-4">
                                    <a className="text-sky-600 font-semibold hover:text-sky-700 transition-colors" href="#">Jobs</a>
                                    <span className="text-slate-400">/</span>
                                    <a className="text-sky-600 font-semibold hover:text-sky-700 transition-colors" href="#">
                                        {selectedJob?.title?.substring(0, 30) || 'Position'}
                                    </a>
                                    <span className="text-slate-400">/</span>
                                    <span className="text-slate-900 font-bold">AI Matches</span>
                                </div>
                                <h1 className="text-slate-900 text-5xl font-black leading-tight tracking-tight mb-3 drop-shadow-lg">
                                    Top Candidate Matches
                                </h1>
                                <p className="text-slate-600 text-lg">
                                    Best candidates based on AI analysis of their qualifications and experience.
                                </p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 py-4 overflow-x-auto mb-8 pb-2 slide-in-left">
                            {['Experience', 'Subject', 'Degree', 'Publications', 'Teaching Quality'].map((filter, idx) => (
                                <button
                                    key={idx}
                                    className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gradient-to-r from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 transition-all pl-5 pr-3 whitespace-nowrap border border-sky-300/60 font-semibold text-sm text-slate-700 card-3d hover:shadow-lg stagger-item-1"
                                >
                                    <p>{filter}</p>
                                    <span className="text-base">⌄</span>
                                </button>
                            ))}
                        </div>

                        {/* Candidate Cards */}
                        <div className="space-y-6 scale-in">
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
                                            className={`group flex flex-col md:flex-row items-stretch justify-between gap-8 rounded-2xl bg-gradient-to-br from-sky-50/80 via-white to-blue-50/80 border border-sky-300/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer card-3d stagger-item-${(idx % 3) + 1} hover:border-sky-400`}
                                        >
                                            {/* Left Content */}
                                            <div className="flex items-center gap-8">
                                                {/* Match Circle */}
                                                <div className="relative h-32 w-32 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <svg
                                                        className="absolute inset-0 h-full w-full -rotate-90"
                                                        viewBox="0 0 120 120"
                                                    >
                                                        <circle
                                                            className="text-slate-300"
                                                            cx="60"
                                                            cy="60"
                                                            fill="transparent"
                                                            r="52"
                                                            stroke="currentColor"
                                                            strokeWidth="8"
                                                        ></circle>
                                                        <circle
                                                            className="text-sky-500 transition-all duration-1000"
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
                                                        <span className="text-slate-900 text-4xl font-black">{matchScore}%</span>
                                                        <span className="text-slate-600 text-xs font-bold">Match</span>
                                                    </div>
                                                </div>

                                                {/* Candidate Info */}
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-slate-900 text-2xl font-bold leading-tight">
                                                        {job.title}
                                                    </p>
                                                    <p className="text-slate-600 text-base font-semibold">
                                                        📍 {job.location}
                                                    </p>
                                                    <div className="mt-6 space-y-4">
                                                        {/* Subject Expertise */}
                                                        <div>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <p className="text-slate-700 text-sm font-bold">Subject Expertise</p>
                                                                <p className="text-slate-900 text-sm font-bold">{expertise}%</p>
                                                            </div>
                                                            <div className="w-48 bg-slate-300/50 rounded-full h-2 overflow-hidden">
                                                                <div
                                                                    className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500 shadow-lg"
                                                                    style={{ width: `${expertise}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {/* Research & Teaching */}
                                                        <div className="flex items-center gap-8">
                                                            <div>
                                                                <p className="text-slate-700 text-sm font-bold">Research Alignment</p>
                                                                <p className="text-slate-900 font-black text-lg">{alignment}%</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-slate-700 text-sm font-bold">Teaching Rating</p>
                                                                {renderStars(Math.floor(rating))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Actions */}
                                            <div className="flex flex-col justify-center items-center md:items-end gap-3 flex-shrink-0 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-sky-300/40 md:pl-8">
                                                <Button className="w-full md:w-auto min-w-[140px] h-12 px-6 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700 text-white text-base font-bold transition-all shadow-lg hover:shadow-xl card-3d hover:scale-105">
                                                    View Profile
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full md:w-auto min-w-[140px] h-12 px-6 border-2 border-sky-400 bg-white hover:bg-sky-50 text-slate-900 text-base font-bold transition-all shadow-md hover:shadow-lg card-3d"
                                                >
                                                    ✓ Shortlist
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-center justify-center h-96">
                                    <p className="text-slate-600 text-lg font-semibold">No candidates found for this position.</p>
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
