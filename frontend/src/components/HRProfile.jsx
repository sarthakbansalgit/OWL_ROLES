import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, MapPin, Globe, Phone, Building2, Edit3, Trash2 } from 'lucide-react';
import UpdateCompanyDialog from './UpdateCompanyDialog';
import { useSelector } from 'react-redux';
import useGetHRCompany from '@/hooks/useGetHRCompany';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const HRProfile = () => {
    useGetHRCompany();
    const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { company } = useSelector(store => store.company);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteCompany = async () => {
        if (!company?._id) return;
        
        try {
            setIsDeleting(true);
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${company._id}`, {
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success('Company deleted successfully');
                // Redirect to home or re-fetch
                window.location.href = '/';
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete company');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-gray-900">
            <Navbar />
            
            <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6 border-b border-blue-200 pb-8 mb-8">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-start">
                            {/* Profile Info */}
                            <div className="flex items-center gap-6">
                                {/* HR Avatar */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 ring-2 ring-blue-600 ring-offset-4 ring-offset-white flex-shrink-0 shadow-lg shadow-blue-600/20">
                                        <AvatarImage 
                                            src={user?.profile?.profilePhoto || "https://via.placeholder.com/128"} 
                                            className="object-cover"
                                        />
                                    </Avatar>
                                </div>

                                {/* HR Name & Info */}
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.fullname}</h1>
                                    <p className="text-gray-600 text-base font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {user?.email}
                                    </p>
                                    <p className="text-gray-600 text-base flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {user?.phoneNumber || 'Not provided'}
                                    </p>
                                    <span className="inline-block mt-3 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                        HR / Recruiter
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Section */}
                    {company && company._id ? (
                        <div className="bg-white rounded-2xl border border-blue-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-6">
                                        {/* Company Logo */}
                                        {company.logo && (
                                            <div className="relative">
                                                <img 
                                                    src={company.logo} 
                                                    alt={company.name}
                                                    className="h-20 w-20 rounded-xl object-cover shadow-md border-2 border-blue-200"
                                                />
                                            </div>
                                        )}

                                        {/* Company Info */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Building2 className="h-6 w-6 text-blue-600" />
                                                <h2 className="text-3xl font-bold text-gray-900">{company.name}</h2>
                                            </div>
                                            {company.description && (
                                                <p className="text-gray-600 text-base mb-4">{company.description}</p>
                                            )}
                                            
                                            {/* Company Details */}
                                            <div className="flex flex-wrap gap-6 mt-4">
                                                {company.location && (
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <MapPin className="h-5 w-5 text-blue-600" />
                                                        <span>{company.location}</span>
                                                    </div>
                                                )}
                                                {company.website && (
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <Globe className="h-5 w-5 text-blue-600" />
                                                        <a 
                                                            href={company.website} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {company.website}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button 
                                            onClick={() => setOpenCompanyDialog(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-200/30"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                            Edit Company
                                        </Button>
                                        <Button 
                                            onClick={handleDeleteCompany}
                                            disabled={isDeleting}
                                            variant="outline"
                                            className="border-red-600 text-red-600 hover:bg-red-50 gap-2"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-gray-600 text-sm font-medium">Company ID</p>
                                        <p className="text-gray-900 font-bold text-lg mt-1 truncate">{company._id}</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-gray-600 text-sm font-medium">Created</p>
                                        <p className="text-gray-900 font-bold text-lg mt-1">
                                            {new Date(company.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-gray-600 text-sm font-medium">Status</p>
                                        <p className="text-green-600 font-bold text-lg mt-1">Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-blue-300 shadow-lg p-12 text-center">
                            <Building2 className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Company Yet</h2>
                            <p className="text-gray-600 mb-6">You need to create a company to start posting jobs</p>
                            <Button 
                                onClick={() => setOpenCompanyDialog(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Create Company
                            </Button>
                        </div>
                    )}

                    {/* Quick Links */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">📋 Manage Jobs</h3>
                            <p className="text-gray-700 mb-4">Post, edit, and manage all your job openings</p>
                            <Button 
                                onClick={() => window.location.href = '/admin/jobs'}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Go to Jobs Management
                            </Button>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">👥 View Candidates</h3>
                            <p className="text-gray-700 mb-4">Review applications and manage candidates</p>
                            <Button 
                                onClick={() => window.location.href = '/admin/jobs'}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                View Applications
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Update Company Dialog */}
            <UpdateCompanyDialog 
                open={openCompanyDialog} 
                setOpen={setOpenCompanyDialog} 
                company={company}
            />
        </div>
    );
};

export default HRProfile;
