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
        <div className="relative flex h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-100">
            <div className='auth-aurora fixed inset-0 opacity-30' />
            <div className='auth-aurora auth-aurora--two fixed inset-0 opacity-20' />
            
            {/* Sidebar */}
            <aside className="flex w-64 flex-col bg-white/95 p-4 border-r-2 border-slate-200 sticky top-0 z-20 backdrop-blur">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8 slide-in-left">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        O
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 text-base font-bold">OWL ROLES</h1>
                        <p className="text-slate-600 text-xs font-medium">Job Portal</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <a 
                        onClick={() => navigate('/recruiter-dashboard')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sky-100 cursor-pointer card-3d transition-all"
                    >
                        <LayoutDashboard className="h-5 w-5 text-sky-600" />
                        <p className="text-sky-700 text-sm font-semibold">Dashboard</p>
                    </a>
                    <a 
                        onClick={() => navigate('/browse')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all card-3d"
                    >
                        <Users className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Candidates</p>
                    </a>
                    <a 
                        onClick={() => navigate('/admin/jobs')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all card-3d"
                    >
                        <Briefcase className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Jobs</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all card-3d"
                    >
                        <BarChart3 className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Analytics</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-all card-3d"
                    >
                        <Settings className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Settings</p>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto z-10">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 slide-in-down">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-4xl font-bold leading-tight tracking-tight">
                                Institutional Dashboard
                            </h1>
                            <p className="text-slate-600 text-base font-medium">Monitor your hiring pipeline at a glance.</p>
                        </div>
                        <Button className="flex items-center justify-center gap-2 h-11 px-6 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white text-sm font-bold hover:shadow-lg transition-all shadow-md card-3d">
                            <Plus className="h-5 w-5" />
                            <span className="truncate">Add New Job</span>
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 scale-in">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`flex flex-col gap-2 rounded-2xl p-6 bg-white/90 border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all card-3d stagger-item-${(idx % 4) + 1}`}>
                                <p className="text-slate-600 text-base font-medium">{stat.label}</p>
                                <p className="text-slate-900 text-3xl font-bold leading-tight">{stat.value}</p>
                                <p className={`text-sm font-bold ${
                                    stat.color === 'green' ? 'text-emerald-500' : 'text-amber-500'
                                }`}>
                                    {stat.change}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Department Tabs */}
                    <div className="mb-8">
                        <div className="flex border-b-2 border-slate-200 gap-8 overflow-x-auto slide-in-left">
                            {departments.map((dept, idx) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveTab(dept)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] pb-4 pt-2 transition-all whitespace-nowrap font-semibold stagger-item-${(idx % 5) + 1} ${
                                        activeTab === dept
                                            ? 'border-b-sky-500 text-sky-600'
                                            : 'border-b-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <p className="text-sm">{dept}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Candidate Kanban Board */}
                    <div className="w-full scale-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {Object.entries(candidates).map(([stage, items], stageIdx) => (
                                <div key={stage} className={`flex flex-col gap-4 slide-in-up stagger-item-${(stageIdx % 5) + 1}`}>
                                    <h3 className="px-1 text-slate-900 font-bold text-sm uppercase tracking-wide text-sky-600">{stage}</h3>
                                    <div className="flex flex-col gap-3">
                                        {items.map((candidate, idx) => (
                                            <div 
                                                key={idx}
                                                className="rounded-xl border-2 border-slate-200 bg-white/95 p-4 text-slate-800 text-sm font-medium shadow-md hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer card-3d hover:bg-sky-50/50"
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
