import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Download, Upload, Badge } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { ReportDownloadButton } from './DownloadReport';
// import UserFallback from "@assets/user.png"

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Profile Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4 border-2 border-slate-100">
                                <AvatarImage 
                                    src={user?.profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"} 
                                    className="object-cover"
                                />
                            </Avatar>
                            <div className="profile-header">
                                <h1 data-testid="profile-name" className="text-xl font-bold">
                                    {user?.fullname}
                                </h1>
                                <p data-testid="user-email" className="text-gray-600">
                                    {user?.email}
                                </p>
                            </div>
                            <p className="text-slate-600 mb-4">{user?.profile?.bio || "Add a professional bio"}</p>
                            
                            <Button 
                                onClick={() => setOpen(true)}
                                variant="ghost"
                                className="w-full gap-2 text-slate-700 hover:bg-slate-50"
                            >
                                <Pen className="h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3 text-slate-700 p-3 bg-slate-50 rounded-lg">
                                <Mail className="h-5 w-5 text-slate-600" />
                                <div data-testid="user-email">{user?.email}</div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-slate-700 p-3 bg-slate-50 rounded-lg">
                                <Contact className="h-5 w-5 text-slate-600" />
                                <span className="text-sm">{user?.phoneNumber || "Add phone number"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-base font-semibold text-slate-900 mb-4">Skills & Resume</h3>
                    
                        
                        <div className="space-y-4">
                            {/* Skills section remains unchanged */}

                             <div>
                                 <h4 className="text-sm font-medium text-slate-700 mb-2">Technical Skills</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {user?.profile?.skills?.length ? (
                                         user.profile.skills.map((skill, index) => (
                                             <span
                                                 key={index}
                                                 variant="secondary"
                                                 className="px-2.5 py-1 text-gray-500 bg-slate-100 rounded-lg border border-black"
                                             >
                                                 {skill}
                                             </span>
                                         ))
                                     ) : (
                                         <p className="text-sm text-slate-400">No skills added yet</p>
                                     )}
                                 </div>
                             </div>

                            <div>
                                <h4 className="text-sm font-medium text-slate-700 mb-2">Resume</h4>
                                {user?.profile?.resume ? (
                                    <div className="flex flex-col gap-2">
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={user.profile.resume}
                                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span className="truncate">
                                                {user.profile.resumeOriginalName || 'Download Resume'}
                                            </span>
                                        </a>
                                        <p className="text-xs text-slate-500">
                                            Last updated: {new Date(user.profile.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-slate-400">No resume uploaded</p>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => setOpen(true)}
                                            className="gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Upload Resume
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <ReportDownloadButton />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Column */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Application History</h2>
                        </div>
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;