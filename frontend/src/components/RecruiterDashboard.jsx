import React, { useState } from 'react';
import { Button } from './ui/button';
import { LayoutDashboard, Users, Briefcase, BarChart3, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Computer Science & Engineering');

    const departments = [
        'Computer Science & Engineering',
        'Management Studies',
        'Physics',
        'Law',
        'Arts & Humanities'
    ];

    const candidates = {
        Applied: [
            'Dr. Priya Sharma, PhD in Data Science, Top 5% Verified',
            'Dr. Rohan Singh, M.Tech in AI',
            'Dr. Ananya Reddy, PhD in Cybersecurity'
        ],
        Shortlisted: [
            'Dr. Vikram Patel, PhD in Machine Learning',
            'Dr. Ishika Verma, MBA in Finance (IIM-A)',
            'Dr. Sameer Khan, MBA in Marketing'
        ],
        'Demo Lecture': [
            'Dr. Sneha Gupta, LLM in Corporate Law',
            'Dr. Arjun Desai, PhD in Experimental Physics (IIT-B)',
            'Dr. Meera Joshi, M.Sc in Particle Physics'
        ],
        Interview: [
            'Dr. Aditya Rao, PhD in Astrophysics',
            'Dr. Ritu Kumar, LLM, International Law',
            'Dr. Fatima Ansari, LLM, Human Rights Law'
        ],
        Selected: [
            'Dr. Kavita Nair, PhD in Indian History',
            'Dr. Aryan Sharma, PhD in Post-Colonial Literature',
            'Dr. Dev Anand, MA in Sanskrit Studies'
        ]
    };

    const stats = [
        { label: 'Total Applications', value: '1,204', change: '+5%', color: 'green' },
        { label: 'Shortlisted', value: '86', change: '+2%', color: 'green' },
        { label: 'Pending Demos', value: '12', change: '-1%', color: 'orange' },
        { label: 'Verified Educators', value: '25', change: '+8%', color: 'green' }
    ];

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col bg-white p-4 border-r border-gray-200 sticky top-0">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        O
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-gray-900 text-base font-medium">OWL ROLES</h1>
                        <p className="text-gray-600 text-sm">Job Portal</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <a 
                        onClick={() => navigate('/recruiter-dashboard')}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/10 cursor-pointer"
                    >
                        <LayoutDashboard className="h-5 w-5 text-blue-600" />
                        <p className="text-blue-600 text-sm font-medium">Dashboard</p>
                    </a>
                    <a 
                        onClick={() => navigate('/browse')}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <Users className="h-5 w-5 text-gray-600" />
                        <p className="text-gray-700 text-sm font-medium">Candidates</p>
                    </a>
                    <a 
                        onClick={() => navigate('/admin/jobs')}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <Briefcase className="h-5 w-5 text-gray-600" />
                        <p className="text-gray-700 text-sm font-medium">Jobs</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <BarChart3 className="h-5 w-5 text-gray-600" />
                        <p className="text-gray-700 text-sm font-medium">Analytics</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <p className="text-gray-700 text-sm font-medium">Settings</p>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-tight">
                                Institutional Dashboard
                            </h1>
                            <p className="text-gray-600 text-base">Monitor your hiring pipeline at a glance.</p>
                        </div>
                        <Button className="flex items-center justify-center gap-2 h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                            <Plus className="h-4 w-4" />
                            <span className="truncate">Add New Job</span>
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-gray-600 text-base font-medium">{stat.label}</p>
                                <p className="text-gray-900 text-2xl font-bold leading-tight">{stat.value}</p>
                                <p className={`text-sm font-medium ${
                                    stat.color === 'green' ? 'text-green-500' : 'text-orange-500'
                                }`}>
                                    {stat.change}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Department Tabs */}
                    <div className="mb-6">
                        <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveTab(dept)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] pb-4 pt-4 transition-colors whitespace-nowrap ${
                                        activeTab === dept
                                            ? 'border-b-blue-600 text-blue-600'
                                            : 'border-b-transparent text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    <p className="text-sm font-bold tracking-wide">{dept}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Candidate Kanban Board */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {Object.entries(candidates).map(([stage, items]) => (
                                <div key={stage} className="flex flex-col gap-4">
                                    <h3 className="px-1 text-gray-900 font-medium text-sm">{stage}</h3>
                                    <div className="flex flex-col gap-4">
                                        {items.map((candidate, idx) => (
                                            <div 
                                                key={idx}
                                                className="rounded-lg border border-gray-200 bg-white p-4 text-gray-800 text-sm font-normal shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400"
                                            >
                                                {candidate}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecruiterDashboard;
