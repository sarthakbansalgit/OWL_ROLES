import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, Download, Upload, Badge, CheckCircle2, PlayCircle } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { ReportDownloadButton } from './DownloadReport';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [scoreAnimated, setScoreAnimated] = useState(false);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        setScoreAnimated(true);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />
            
            <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6 border-b border-blue-200 pb-8 mb-8">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-center">
                            {/* Profile Info */}
                            <div className="flex items-center gap-6">
                                {/* Avatar with Badge */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 ring-2 ring-blue-600 ring-offset-4 ring-offset-white flex-shrink-0 shadow-lg shadow-blue-600/20">
                                        <AvatarImage 
                                            src={user?.profile?.profilePhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-d8fJZhKvx9Gp5xEe6KxYpnGqCrvt4P69HiyaQQshDIULSxcdcf8TJxFz5EeOj40QEhblQOa1I8AYl6IQIQN9jfW54oFSCm00-_JISQl1bi7MDBO4nh7R6wXUfiQIB3rtfE1uGgRlvfxFC_wsPQ4bTP6dE6mx8IIdBx9ClJrQ5o8UPlRE17L-iYGUNZuB4ZXL4BdjtL4MUbw0jERVyee3BIdkRqAqC5O-qoqDnNcWJCPUE7lygW9S5DVyRRUOcMzXbTka9YjIoQlo"} 
                                            className="object-cover"
                                        />
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white">
                                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>

                                {/* Name & Title */}
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.fullname}</h1>
                                    <p className="text-gray-600 text-base">{user?.profile?.bio || "Professional Profile"}</p>
                                    <p className="text-gray-600 text-base">{user?.email}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button 
                                    variant="outline"
                                    className="flex-1 md:flex-auto border-blue-600 text-blue-600 hover:bg-blue-50 gap-2 h-10"
                                >
                                    <Download className="h-4 w-4" />
                                    Download CV
                                </Button>
                                <Button 
                                    className="flex-1 md:flex-auto bg-blue-600 hover:bg-blue-700 text-white gap-2 h-10 shadow-lg shadow-blue-200/30"
                                >
                                    <Mail className="h-4 w-4" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - 2 cols */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Qualifications */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Qualifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {user?.profile?.qualifications?.length ? (
                                        user.profile.qualifications.map((qual, index) => (
                                            <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center text-center hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 border border-blue-300 mb-3">
                                                    <span className="text-2xl">📚</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">{qual.degree || 'Ph.D'}</h3>
                                                <p className="text-gray-600 text-sm">{qual.year || '2015'}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center text-center hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 border border-blue-300 mb-3">
                                                    <span className="text-2xl">🎓</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">Ph.D (CS)</h3>
                                                <p className="text-gray-600 text-sm">IIT Bombay, 2016</p>
                                            </div>
                                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center text-center hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 border border-blue-300 mb-3">
                                                    <span className="text-2xl">⭐</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">UGC-NET</h3>
                                                <p className="text-gray-600 text-sm">Qualified in 2012</p>
                                            </div>
                                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center text-center hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 border border-blue-300 mb-3">
                                                    <span className="text-2xl">🏆</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">SET</h3>
                                                <p className="text-gray-600 text-sm">Maharashtra, 2011</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Research Areas */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Areas</h2>
                                <div className="flex flex-wrap gap-3">
                                    {user?.profile?.skills?.length ? (
                                        user.profile.skills.map((skill, index) => (
                                            <span key={index} className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300 hover:bg-blue-200 transition-colors">
                                                {typeof skill === 'string' ? skill : typeof skill === 'object' && skill?.name ? skill.name : String(skill)}
                                            </span>
                                        ))
                                    ) : (
                                        <>
                                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">AI in Education</span>
                                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">Natural Language Processing</span>
                                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">Digital Pedagogy</span>
                                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">E-learning Platforms</span>
                                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">Machine Learning</span>
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Publications */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Publications</h2>
                                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-300">
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full max-w-sm flex-shrink-0 snap-center hover:bg-blue-100 transition-colors">
                                        <p className="text-gray-600 text-sm mb-2">IEEE Transactions, 2023</p>
                                        <h4 className="font-bold text-gray-900 mb-2">AI-driven Personalised Learning Paths</h4>
                                        <p className="text-gray-600 text-sm">Sharma, A., et al.</p>
                                        <Button variant="link" className="p-0 text-blue-600 h-auto mt-4 hover:text-blue-700">Read Paper →</Button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full max-w-sm flex-shrink-0 snap-center hover:bg-blue-100 transition-colors">
                                        <p className="text-gray-600 text-sm mb-2">Journal of Tech & Society, 2021</p>
                                        <h4 className="font-bold text-gray-900 mb-2">Challenges of NLP in Vernacular Languages</h4>
                                        <p className="text-gray-600 text-sm">Sharma, A., Patel, R.</p>
                                        <Button variant="link" className="p-0 text-blue-600 h-auto mt-4 hover:text-blue-700">Read Paper →</Button>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full max-w-sm flex-shrink-0 snap-center hover:bg-blue-100 transition-colors">
                                        <p className="text-gray-600 text-sm mb-2">UGC CARE Journal, 2019</p>
                                        <h4 className="font-bold text-gray-900 mb-2">Digital Pedagogy in Indian Universities</h4>
                                        <p className="text-gray-600 text-sm">Sharma, A.</p>
                                        <Button variant="link" className="p-0 text-blue-600 h-auto mt-4 hover:text-blue-700">Read Paper →</Button>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column - 1 col */}
                        <div className="space-y-8">
                            {/* AI Strength Score */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center">
                                <h3 className="text-gray-900 text-base font-medium mb-4">AI Strength Score</h3>
                                <div className="relative w-36 h-36 mb-4">
                                    <svg className={`w-full h-full transform -rotate-90 ${scoreAnimated ? '' : ''}`} viewBox="0 0 100 100">
                                        <circle className="text-gray-300" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                                        <circle 
                                            className="text-blue-600 transition-all duration-1500 ease-out" 
                                            cx="50" cy="50" 
                                            fill="transparent" 
                                            r="40" 
                                            stroke="currentColor" 
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            style={{
                                                strokeDasharray: `${scoreAnimated ? 251.2 * 0.92 : 0} 251.2`,
                                            }}
                                        ></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-gray-900">92%</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 text-center">Based on profile completeness and fit.</p>
                            </div>

                            {/* Demo Lecture Button */}
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base gap-2 shadow-lg shadow-blue-200/40 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300">
                                <PlayCircle className="h-5 w-5" />
                                View Demo Lecture
                            </Button>

                            {/* Experience */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                                <div className="relative pl-4">
                                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-blue-300"></div>
                                    <div className="space-y-6">
                                        <div className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white -translate-x-1/2"></div>
                                            <p className="font-bold text-gray-900">Assistant Professor</p>
                                            <p className="text-sm text-gray-700">IIT Delhi</p>
                                            <p className="text-xs text-gray-500">2019 - Present</p>
                                        </div>
                                        <div className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-gray-300 ring-4 ring-white -translate-x-1/2"></div>
                                            <p className="font-bold text-gray-900">Lecturer</p>
                                            <p className="text-sm text-gray-700">University of Mumbai</p>
                                            <p className="text-xs text-gray-500">2016 - 2019</p>
                                        </div>
                                        <div className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-gray-300 ring-4 ring-white -translate-x-1/2"></div>
                                            <p className="font-bold text-gray-900">Research Fellow</p>
                                            <p className="text-sm text-gray-700">TIFR, Mumbai</p>
                                            <p className="text-xs text-gray-500">2014 - 2016</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Courses Taught */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Courses Taught</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded border border-teal-300">Data Structures</span>
                                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded border border-purple-300">Machine Learning</span>
                                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded border border-orange-300">Database Mgmt</span>
                                    <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded border border-pink-300">OS</span>
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded border border-blue-300">Artificial AI</span>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Application History */}
                    <div className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Application History</h2>
                        <AppliedJobTable />
                    </div>
                </div>
            </main>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;