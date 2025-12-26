import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { X, Download, Mail, Phone, MapPin, Award, BookOpen, Briefcase, FileText, CheckCircle2, Eye, ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const CandidateProfileModal = ({ open, onOpenChange, applicant, onStatusChange }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);

    const candidate = applicant?.applicant || {};
    const profile = candidate?.profile || {};

    // Debug logging
    useEffect(() => {
        if (open && applicant) {
            console.log('=== CANDIDATE PROFILE DATA ===');
            console.log('Full applicant:', applicant);
            console.log('Candidate:', candidate);
            console.log('Profile:', profile);
            console.log('Qualifications:', profile?.qualifications);
            console.log('Research Areas:', profile?.researchAreas);
            console.log('Experience:', profile?.experience);
            console.log('Publications:', profile?.publications);
            console.log('Courses Taught:', profile?.coursesTaught);
        }
    }, [open, applicant]);

    // Animated score effect
    useEffect(() => {
        if (!open || !applicant) {
            return;
        }

        if (profile?.profileStrengthScore) {
            let currentScore = 0;
            const targetScore = profile.profileStrengthScore;
            const increment = targetScore / 30;

            const interval = setInterval(() => {
                currentScore += increment;
                if (currentScore >= targetScore) {
                    setAnimatedScore(targetScore);
                    clearInterval(interval);
                } else {
                    setAnimatedScore(Math.round(currentScore));
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [open, applicant, profile?.profileStrengthScore]);

    const handleStatusUpdate = async (status) => {
        try {
            setIsUpdating(true);
            axios.defaults.withCredentials = true;
            const res = await axios.patch(
                `${APPLICATION_API_END_POINT}/status/${applicant._id}/update`,
                { status }
            );
            
            if (res.data.success) {
                toast.success(`Application ${status}!`);
                onStatusChange(status, applicant._id);
                onOpenChange(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!applicant ? null : (
            <DialogContent className="max-w-6xl max-h-[98vh] overflow-y-auto p-0 border-0 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-slate-200">
                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 p-2 hover:bg-white/80 rounded-full transition-all z-50"
                >
                    <X className="h-6 w-6 text-gray-600" />
                </button>

                <div className="p-8">
                    {/* Header with Profile Photo and Basic Info */}
                    <div className="slide-in-up space-y-6 mb-8 pb-8 border-b border-blue-200/50">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            {/* Profile Photo */}
                            <Avatar className="w-32 h-32 border-4 border-sky-400 shadow-xl card-3d">
                                <AvatarImage 
                                    src={profile?.profilePhoto || "https://tse3.mm.bing.net/th/id/OIP.Wkn4_kVHLYYZOOy7FMnFXwHaHa?pid=ImgDet&w=188&h=188&c=7&dpr=1.5"}
                                    alt={candidate.fullname}
                                />
                                <AvatarFallback>{candidate.fullname?.charAt(0)}</AvatarFallback>
                            </Avatar>

                            {/* Basic Information */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{candidate.fullname}</h1>
                                    <p className="text-lg text-gray-600">{profile?.bio || 'No bio added'}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-3 rounded-xl">
                                        <Mail className="h-5 w-5 text-sky-600" />
                                        <span className="text-sm text-gray-700">{candidate.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-3 rounded-xl">
                                        <Phone className="h-5 w-5 text-sky-600" />
                                        <span className="text-sm text-gray-700">{profile?.phoneNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-3 rounded-xl">
                                        <MapPin className="h-5 w-5 text-sky-600" />
                                        <span className="text-sm text-gray-700">{profile?.location || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-3 rounded-xl">
                                        <Award className="h-5 w-5 text-sky-600" />
                                        <span className="text-sm text-gray-700">Applied on {new Date(applicant.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Strength Score and Resume */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* AI Strength Score */}
                        <div className="stagger-item-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl card-3d">
                            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                AI Strength Score
                            </h3>
                            <div className="relative w-40 h-40 mx-auto">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray={`${(animatedScore / 100) * 283} 283`}
                                        className="transition-all duration-500"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold">{animatedScore}%</div>
                                        <div className="text-xs text-blue-100 mt-1">Match</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-blue-100 text-center mt-4">Based on profile completeness and fit</p>
                        </div>

                        {/* Resume Download */}
                        <div className="stagger-item-2 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-3xl p-6 shadow-lg card-3d">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="h-6 w-6 text-yellow-600" />
                                <h3 className="font-bold text-gray-900">Resume</h3>
                            </div>
                            {profile?.resume ? (
                                <div className="space-y-3">
                                    <div className="bg-white rounded-xl p-3 text-center">
                                        <p className="text-sm font-semibold text-gray-700 truncate">
                                            {profile.resumeOriginalName || 'Resume.pdf'}
                                        </p>
                                    </div>
                                    <a
                                        href={profile.resume}
                                        download
                                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 rounded-xl hover:shadow-lg transition-all card-3d hover:scale-105 active:scale-95"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Resume
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-gray-100 rounded-xl p-4 text-center">
                                    <p className="text-sm text-gray-600">No resume uploaded</p>
                                </div>
                            )}
                        </div>

                        {/* ORCID ID */}
                        <div className="stagger-item-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-6 shadow-lg card-3d">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                <h3 className="font-bold text-gray-900">ORCID iD</h3>
                            </div>
                            {profile?.orcidId ? (
                                <div className="space-y-3">
                                    <div className="bg-white rounded-xl p-3 text-center font-mono text-sm font-semibold text-gray-700 break-all">
                                        {profile.orcidId}
                                    </div>
                                    <a
                                        href={`https://orcid.org/${profile.orcidId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-2 rounded-xl hover:shadow-lg transition-all card-3d hover:scale-105 active:scale-95"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        View Profile
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-gray-100 rounded-xl p-4 text-center">
                                    <p className="text-sm text-gray-600">Not provided</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Qualifications */}
                    <div className="stagger-item-1 mb-8 bg-white rounded-3xl p-6 border border-blue-200/50 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="h-6 w-6 text-sky-600" />
                            Qualifications
                        </h2>
                        {profile?.qualifications && profile.qualifications.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.qualifications.map((qual, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200/50 card-3d hover:shadow-md transition-all">
                                        <p className="font-semibold text-gray-900">{qual.degree || 'N/A'}</p>
                                        <p className="text-sm text-gray-600">{qual.school || qual.institution || 'N/A'}</p>
                                        {qual.year && <p className="text-xs text-gray-500 mt-2">Year: {qual.year}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No qualifications added</p>
                        )}
                    </div>

                    {/* Research Areas */}
                    <div className="stagger-item-2 mb-8 bg-white rounded-3xl p-6 border border-blue-200/50 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-sky-600" />
                            Research Areas
                        </h2>
                        {profile?.researchAreas && profile.researchAreas.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.researchAreas.map((area, idx) => {
                                    let areaText = 'N/A';
                                    if (typeof area === 'string') {
                                        areaText = area;
                                    } else if (typeof area === 'object' && area !== null) {
                                        areaText = area.title || area.name || 'N/A';
                                    }
                                    return (
                                        <span key={idx} className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-900 px-4 py-2 rounded-full text-sm font-semibold card-3d">
                                            {areaText}
                                        </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No research areas added</p>
                        )}
                    </div>

                    {/* Experience */}
                    <div className="stagger-item-3 mb-8 bg-white rounded-3xl p-6 border border-blue-200/50 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-sky-600" />
                            Experience
                        </h2>
                        {profile?.experience && profile.experience.length > 0 ? (
                            <div className="space-y-4">
                                {profile.experience.map((exp, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50 card-3d">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-semibold text-gray-900">{exp.title || exp.jobTitle || 'N/A'}</p>
                                            <span className="text-xs text-gray-500">{exp.duration || exp.period || 'N/A'}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{exp.company || exp.organization || 'N/A'}</p>
                                        {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No experience added</p>
                        )}
                    </div>

                    {/* Publications */}
                    <div className="stagger-item-1 mb-8 bg-white rounded-3xl p-6 border border-blue-200/50 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="h-6 w-6 text-sky-600" />
                            Publications
                        </h2>
                        {profile?.publications && profile.publications.length > 0 ? (
                            <div className="space-y-4">
                                {profile.publications.map((pub, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50 card-3d">
                                        <p className="font-semibold text-gray-900 mb-1">{pub.title || 'N/A'}</p>
                                        <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Journal:</span> {pub.journal || pub.venue || 'N/A'}</p>
                                        <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Authors:</span> {pub.authors || 'N/A'}</p>
                                        <p className="text-xs text-gray-600 mb-2"><span className="font-semibold">Year:</span> {pub.year || 'N/A'}</p>
                                        {pub.link && (
                                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 text-sm font-semibold underline">
                                                View Paper →
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No publications added</p>
                        )}
                    </div>

                    {/* Courses Taught */}
                    <div className="stagger-item-2 mb-8 bg-white rounded-3xl p-6 border border-blue-200/50 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-sky-600" />
                            Courses Taught
                        </h2>
                        {profile?.coursesTaught && profile.coursesTaught.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.coursesTaught.map((course, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200/50 card-3d">
                                        <p className="font-semibold text-gray-900">{course.courseName || course.name || 'N/A'}</p>
                                        {course.level && <p className="text-sm text-gray-600">{course.level}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No courses added</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="stagger-item-2 sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent pt-6 mt-8 flex gap-3 justify-end">
                        <Button
                            onClick={() => handleStatusUpdate('rejected')}
                            disabled={isUpdating || applicant.status === 'rejected'}
                            className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold px-6 py-3 rounded-3xl hover:shadow-[0_15px_60px_rgba(239,68,68,0.3)] transition-all card-3d hover:scale-105 active:scale-95"
                        >
                            {isUpdating ? 'Updating...' : '✗ Reject'}
                        </Button>
                        <Button
                            onClick={() => handleStatusUpdate('pending')}
                            disabled={isUpdating || applicant.status === 'pending'}
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-3xl hover:shadow-[0_15px_60px_rgba(245,158,11,0.3)] transition-all card-3d hover:scale-105 active:scale-95"
                        >
                            {isUpdating ? 'Updating...' : '⏳ Pending'}
                        </Button>
                        <Button
                            onClick={() => handleStatusUpdate('accepted')}
                            disabled={isUpdating || applicant.status === 'accepted'}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-3xl hover:shadow-[0_15px_60px_rgba(16,185,129,0.3)] transition-all card-3d hover:scale-105 active:scale-95"
                        >
                            {isUpdating ? 'Updating...' : '✓ Accept'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
            )}
        </Dialog>
    );
};

export default CandidateProfileModal;
