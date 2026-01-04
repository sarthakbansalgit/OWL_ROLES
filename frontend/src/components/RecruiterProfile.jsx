import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, Plus, Building2, Globe, MapPin, Phone, Briefcase, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import UpdateRecruiterCompanyDialog from './UpdateRecruiterCompanyDialog';
import CreateCompanyDialog from './CreateCompanyDialog';
import RecruiterOnboarding from './recruiter/RecruiterOnboarding';

const RecruiterProfile = () => {
    useGetAllCompanies();
    const { user } = useSelector(store => store.auth);
    const { companies } = useSelector(store => store.company);
    const dispatch = useDispatch();
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(user?.isFirstLogin ?? false);
    
    // Get recruiter's company
    const recruiterCompany = companies && companies.length > 0 ? companies[0] : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
            <Navbar />
            
            {/* Onboarding Dialog */}
            <RecruiterOnboarding 
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                user={user}
            />
            
            <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-8 mb-12">
                        <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:items-start">
                            {/* Profile Info */}
                            <div className="flex items-center gap-6">
                                {/* Avatar with Badge */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 ring-4 ring-sky-600 ring-offset-4 ring-offset-white flex-shrink-0 shadow-xl shadow-sky-600/30">
                                        <AvatarImage 
                                            src={user?.profile?.profilePhoto} 
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white text-2xl font-bold">
                                            {user?.fullname?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                                        <Briefcase className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                {/* Name & Title */}
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-2">{user?.fullname}</h1>
                                    <p className="text-sky-600 text-lg font-semibold flex items-center gap-2">
                                        <Briefcase className="h-5 w-5" />
                                        HR Recruiter
                                    </p>
                                    <p className="text-slate-600 text-base flex items-center gap-2 mt-1">
                                        <Mail className="h-4 w-4" />
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full md:w-auto flex-wrap">
                                {!recruiterCompany ? (
                                    <Button 
                                        onClick={() => setOpenCreateDialog(true)}
                                        className="flex-1 md:flex-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white gap-2 h-11 shadow-lg shadow-sky-200/50 rounded-lg font-semibold"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Create Company
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={() => setOpenUpdateDialog(true)}
                                        className="flex-1 md:flex-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white gap-2 h-11 shadow-lg shadow-sky-200/50 rounded-lg font-semibold"
                                    >
                                        <Pen className="h-5 w-5" />
                                        Edit Company
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Company Card */}
                        <div className="lg:col-span-2">
                            {recruiterCompany ? (
                                <div className="bg-white rounded-3xl shadow-xl border border-sky-200/50 overflow-hidden card-3d">
                                    {/* Company Header Banner */}
                                    <div className="h-32 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 relative">
                                        <div className="absolute inset-0 opacity-30" style={{
                                            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                                        }}></div>
                                    </div>

                                    {/* Company Logo & Info */}
                                    <div className="px-8 pb-8">
                                        <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-6">
                                            {/* Logo */}
                                            <div className="flex-shrink-0">
                                                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                                                    <AvatarImage 
                                                        src={recruiterCompany.logo}
                                                        className="object-cover"
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-br from-sky-200 to-blue-300 text-sky-700 text-xl font-bold">
                                                        {recruiterCompany.name?.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            {/* Company Name */}
                                            <div className="flex-1">
                                                <h2 className="text-3xl font-bold text-slate-900">{recruiterCompany.name}</h2>
                                                <p className="text-slate-600 text-sm mt-1">Company Profile</p>
                                            </div>
                                        </div>

                                        {/* Company Details Grid */}
                                        <div className="space-y-4">
                                            {recruiterCompany.description && (
                                                <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200/50">
                                                    <p className="text-slate-700 text-sm leading-relaxed">{recruiterCompany.description}</p>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {recruiterCompany.website && (
                                                    <a 
                                                        href={recruiterCompany.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-4 bg-white border-2 border-sky-200/50 rounded-xl hover:border-sky-400 transition-all hover:shadow-md group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Globe className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform" />
                                                            <div>
                                                                <p className="text-xs text-slate-500 font-semibold">Website</p>
                                                                <p className="text-sky-600 font-semibold truncate group-hover:text-sky-700">{recruiterCompany.website}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                )}

                                                {recruiterCompany.location && (
                                                    <div className="p-4 bg-white border-2 border-sky-200/50 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <MapPin className="h-5 w-5 text-sky-600" />
                                                            <div>
                                                                <p className="text-xs text-slate-500 font-semibold">Location</p>
                                                                <p className="text-slate-700 font-semibold">{recruiterCompany.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl shadow-xl border border-sky-200/50 p-12 text-center card-3d">
                                    <Building2 className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No Company Yet</h3>
                                    <p className="text-slate-600 mb-6 max-w-sm mx-auto">Create your company profile to start posting jobs and managing candidates.</p>
                                    <Button 
                                        onClick={() => setOpenCreateDialog(true)}
                                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white gap-2 shadow-lg shadow-sky-200/50 rounded-lg font-semibold px-8 py-3 h-auto"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Create Company Now
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Stats & Info */}
                        <div className="space-y-6">
                            {/* Role Badge */}
                            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl shadow-lg border border-sky-200/50 p-6 card-3d">
                                <div className="flex items-center gap-3 mb-3">
                                    <User className="h-5 w-5 text-sky-600" />
                                    <h3 className="font-bold text-slate-900">Account Type</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">You are registered as an HR Recruiter</p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full font-semibold text-sm">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Active
                                </div>
                            </div>

                            {/* Company Status */}
                            {recruiterCompany && (
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg border border-green-200/50 p-6 card-3d">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Building2 className="h-5 w-5 text-green-600" />
                                        <h3 className="font-bold text-slate-900">Company Status</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">Your company profile is active</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Verified
                                    </div>
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="bg-white rounded-3xl shadow-lg border border-sky-200/50 p-6 card-3d">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-sky-600" />
                                    Quick Actions
                                </h3>
                                <div className="space-y-2">
                                    <a 
                                        href="/admin/jobs"
                                        className="block w-full px-4 py-3 bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 rounded-xl hover:from-sky-200 hover:to-blue-200 transition-all font-semibold text-sm text-center"
                                    >
                                        View Posted Jobs
                                    </a>
                                    {recruiterCompany && (
                                        <a 
                                            href="/admin/jobs/create"
                                            className="block w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all font-semibold text-sm text-center"
                                        >
                                            Post New Job
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Update Company Dialog */}
            {recruiterCompany && (
                <UpdateRecruiterCompanyDialog 
                    open={openUpdateDialog}
                    setOpen={setOpenUpdateDialog}
                    company={recruiterCompany}
                />
            )}

            {/* Create Company Dialog */}
            <CreateCompanyDialog 
                open={openCreateDialog}
                setOpen={setOpenCreateDialog}
            />
        </div>
    );
};

export default RecruiterProfile;
