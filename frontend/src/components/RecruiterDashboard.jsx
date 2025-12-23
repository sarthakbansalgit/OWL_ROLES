import React, { useState } from 'react';
import { Button } from './ui/button';
import { LayoutDashboard, Users, Briefcase, BarChart3, Settings, Plus, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
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
        <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden">
            {/* Animated background elements */}
            <div className='auth-aurora fixed inset-0 opacity-40' />
            <div className='auth-aurora auth-aurora--two fixed inset-0 opacity-30' />
            <div className='auth-orb auth-orb--one fixed opacity-20' />
            <div className='auth-orb auth-orb--two fixed opacity-15' />
            
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white/98 border-r-2 border-slate-200/50 sticky z-30 backdrop-blur-xl flex flex-col shadow-xl slide-in-left">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8 p-4 slide-in-down">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg card-3d hover:scale-110 transition-transform">
                        O
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 text-base font-bold">OWL ROLES</h1>
                        <p className="text-sky-600 text-xs font-semibold">HR Dashboard</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 px-3 flex-1">
                    <a 
                        onClick={() => navigate('/recruiter-dashboard')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-100 to-blue-100 cursor-pointer card-3d transition-all hover:shadow-lg stagger-item-1"
                    >
                        <LayoutDashboard className="h-5 w-5 text-sky-600" />
                        <p className="text-sky-700 text-sm font-bold">Dashboard</p>
                    </a>
                    <a 
                        onClick={() => navigate('/browse')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all card-3d stagger-item-2 hover:shadow-md"
                    >
                        <Users className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Candidates</p>
                    </a>
                    <a 
                        onClick={() => navigate('/admin/jobs')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all card-3d stagger-item-3 hover:shadow-md"
                    >
                        <Briefcase className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Jobs</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all card-3d stagger-item-4 hover:shadow-md"
                    >
                        <BarChart3 className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Analytics</p>
                    </a>
                    <a 
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all card-3d stagger-item-5 hover:shadow-md"
                    >
                        <Settings className="h-5 w-5 text-slate-600" />
                        <p className="text-slate-700 text-sm font-medium">Settings</p>
                    </a>
                </nav>

                {/* Footer */}
                <div className="border-t border-slate-200 p-4 mt-auto">
                    <p className="text-slate-600 text-xs text-center">© 2025 OWL ROLES</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 relative z-20 min-h-screen">
                <div className="p-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 slide-in-down">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
                                Institutional Dashboard
                            </h1>
                            <p className="text-slate-600 text-lg font-medium">Monitor your hiring pipeline and talent acquisition in real-time.</p>
                        </div>
                        <Button className="flex items-center justify-center gap-2 h-12 px-8 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white text-base font-bold hover:shadow-[0_30px_140px_rgba(56,189,248,0.6)] transition-all shadow-[0_20px_100px_rgba(56,189,248,0.4)] card-3d hover:scale-105 active:scale-95">
                            <Plus className="h-6 w-6" />
                            <span className="truncate">Add New Job</span>
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scale-in">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`group flex flex-col gap-3 rounded-2xl p-7 bg-white/95 border-2 border-slate-200/70 shadow-lg hover:shadow-2xl transition-all card-3d stagger-item-${(idx % 4) + 1} hover:border-sky-400 hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50`}>
                                <div className="flex items-center justify-between">
                                    <p className="text-slate-600 text-base font-semibold">{stat.label}</p>
                                    {idx === 0 && <TrendingUp className="h-5 w-5 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    {idx === 1 && <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    {idx === 2 && <Clock className="h-5 w-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    {idx === 3 && <AlertCircle className="h-5 w-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </div>
                                <p className="text-slate-900 text-4xl font-bold leading-tight">{stat.value}</p>
                                <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${stat.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <p className={`text-sm font-bold ${
                                        stat.color === 'green' ? 'text-emerald-600' : 'text-amber-600'
                                    }`}>
                                        {stat.change}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Department Tabs */}
                    <div className="bg-white/80 rounded-2xl p-6 shadow-md border border-slate-200/70 slide-in-left">
                        <p className="text-slate-600 text-sm font-semibold mb-4 uppercase tracking-wide">Select Department</p>
                        <div className="flex border-b-2 border-slate-200 gap-6 overflow-x-auto pb-0">
                            {departments.map((dept, idx) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveTab(dept)}
                                    className={`flex flex-col items-center justify-center border-b-[4px] pb-4 pt-2 transition-all whitespace-nowrap font-semibold stagger-item-${(idx % 5) + 1} relative group ${
                                        activeTab === dept
                                            ? 'border-b-sky-500 text-sky-600'
                                            : 'border-b-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <p className="text-sm">{dept}</p>
                                    {activeTab === dept && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Candidate Kanban Board */}
                    <div className="w-full scale-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {Object.entries(candidates).map(([stage, items], stageIdx) => (
                                <div key={stage} className={`flex flex-col gap-4 slide-in-up stagger-item-${(stageIdx % 5) + 1}`}>
                                    <div className="flex items-center gap-2 px-2">
                                        <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wide text-sky-600">{stage}</h3>
                                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-sky-100 text-sky-600 text-xs font-bold">{items.length}</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {items.map((candidate, idx) => (
                                            <div 
                                                key={idx}
                                                className="group rounded-xl border-2 border-slate-200/70 bg-white/95 p-5 text-slate-800 text-sm font-medium shadow-md hover:shadow-xl hover:border-sky-400 transition-all cursor-pointer card-3d hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 hover:scale-[1.02] relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative">
                                                    <p className="line-clamp-3">{candidate}</p>
                                                    <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold hover:shadow-[0_10px_40px_rgba(56,189,248,0.4)] shadow-md transition-all card-3d hover:scale-105 active:scale-95">View</button>
                                                        <button className="text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] shadow-md transition-all card-3d hover:scale-105 active:scale-95">✓ Move</button>
                                                    </div>
                                                </div>
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
