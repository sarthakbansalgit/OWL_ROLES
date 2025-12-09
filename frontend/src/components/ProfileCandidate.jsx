import React, { useState, useEffect, useRef } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, Download, Upload, Badge, CheckCircle2, PlayCircle, Save, X, Plus, Trash2, FileUp } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector, useDispatch } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { ReportDownloadButton } from './DownloadReport';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const ProfileCandidate = () => {
    useGetAppliedJobs();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const [scoreAnimated, setScoreAnimated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const resumeInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const [editData, setEditData] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.profile?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        location: user?.profile?.location || '',
        qualifications: user?.profile?.qualifications || [],
        researchAreas: user?.profile?.researchAreas || [],
        experience: user?.profile?.experience || [],
        coursesTaught: user?.profile?.coursesTaught || [],
        resume: user?.profile?.resume || ''
    });

    useEffect(() => {
        setScoreAnimated(true);
    }, []);

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.post(apiUrl, formData, config);

            if (response.data.success) {
                setEditData({ ...editData, resume: response.data.user.profile.resume });
                dispatch(setUser(response.data.user));
                alert('Resume uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.post(apiUrl, editData, config);

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                setIsEditing(false);
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    const handleAddQualification = () => {
        setEditData({
            ...editData,
            qualifications: [...editData.qualifications, { title: '', institution: '', year: '', emoji: '🎓' }]
        });
    };

    const handleUpdateQualification = (index, field, value) => {
        const updatedQuals = [...editData.qualifications];
        updatedQuals[index][field] = value;
        setEditData({ ...editData, qualifications: updatedQuals });
    };

    const handleDeleteQualification = (index) => {
        setEditData({
            ...editData,
            qualifications: editData.qualifications.filter((_, i) => i !== index)
        });
    };

    const handleAddExperience = () => {
        setEditData({
            ...editData,
            experience: [...editData.experience, { title: '', company: '', description: '', duration: '' }]
        });
    };

    const handleUpdateExperience = (index, field, value) => {
        const updatedExp = [...editData.experience];
        updatedExp[index][field] = value;
        setEditData({ ...editData, experience: updatedExp });
    };

    const handleDeleteExperience = (index) => {
        setEditData({
            ...editData,
            experience: editData.experience.filter((_, i) => i !== index)
        });
    };

    const handleAddCourse = () => {
        setEditData({
            ...editData,
            coursesTaught: [...editData.coursesTaught, { name: '', students: 0, rating: 4.5, color: 'teal' }]
        });
    };

    const handleUpdateCourse = (index, field, value) => {
        const updatedCourses = [...editData.coursesTaught];
        updatedCourses[index][field] = value;
        setEditData({ ...editData, coursesTaught: updatedCourses });
    };

    const handleDeleteCourse = (index) => {
        setEditData({
            ...editData,
            coursesTaught: editData.coursesTaught.filter((_, i) => i !== index)
        });
    };

    if (isEditing) {
        return (
            <div className="min-h-screen bg-white text-gray-900">
                <Navbar />
                <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold">Edit Profile</h1>
                            <div className="flex gap-2">
                                <Button onClick={() => setIsEditing(false)} variant="outline">
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                                <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Basic Info */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={editData.fullname}
                                            onChange={(e) => setEditData({ ...editData, fullname: e.target.value })}
                                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={editData.phoneNumber}
                                            onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={editData.location}
                                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                                    <textarea
                                        value={editData.bio}
                                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>

                                {/* Resume Upload */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF)</label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            ref={resumeInputRef}
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleResumeUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            onClick={() => resumeInputRef.current?.click()}
                                            disabled={uploading}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <FileUp className="mr-2 h-4 w-4" />
                                            {uploading ? 'Uploading...' : 'Upload Resume'}
                                        </Button>
                                        {editData.resume && (
                                            <a
                                                href={editData.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 underline flex items-center gap-2"
                                            >
                                                <Download className="h-4 w-4" /> View Resume
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Qualifications */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Qualifications</h2>
                                    <Button onClick={handleAddQualification} className="bg-blue-600 hover:bg-blue-700 h-8">
                                        <Plus className="h-4 w-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {editData.qualifications.map((qual, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-200 flex gap-4 items-start">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Degree (e.g., Ph.D)"
                                                    value={qual.title || ''}
                                                    onChange={(e) => handleUpdateQualification(idx, 'title', e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Institution"
                                                    value={qual.institution || ''}
                                                    onChange={(e) => handleUpdateQualification(idx, 'institution', e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Year (e.g., 2016)"
                                                    value={qual.year || ''}
                                                    onChange={(e) => handleUpdateQualification(idx, 'year', e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleDeleteQualification(idx)}
                                                variant="outline"
                                                className="h-8 px-2 border-red-300 text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Research Areas */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Research Areas</h2>
                                <div className="flex flex-wrap gap-2">
                                    {editData.researchAreas.map((area, idx) => (
                                        <div key={idx} className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2">
                                            <span>{area}</span>
                                            <button
                                                onClick={() => setEditData({
                                                    ...editData,
                                                    researchAreas: editData.researchAreas.filter((_, i) => i !== idx)
                                                })}
                                                className="text-blue-900 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add research area (press comma or Enter)"
                                    onKeyDown={(e) => {
                                        if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim()) {
                                            setEditData({
                                                ...editData,
                                                researchAreas: [...editData.researchAreas, e.target.value.trim()]
                                            });
                                            e.target.value = '';
                                            e.preventDefault();
                                        }
                                    }}
                                    className="w-full mt-4 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Experience */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                                    <Button onClick={handleAddExperience} className="bg-blue-600 hover:bg-blue-700 h-8">
                                        <Plus className="h-4 w-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {editData.experience.map((exp, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-200 flex gap-4 items-start">
                                            <div className="flex-1 space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Job Title"
                                                    value={exp.title || ''}
                                                    onChange={(e) => handleUpdateExperience(idx, 'title', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Company"
                                                        value={exp.company || ''}
                                                        onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Duration (e.g., 2020-2022)"
                                                        value={exp.duration || ''}
                                                        onChange={(e) => handleUpdateExperience(idx, 'duration', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Description"
                                                    value={exp.description || ''}
                                                    onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleDeleteExperience(idx)}
                                                variant="outline"
                                                className="h-8 px-2 border-red-300 text-red-600 hover:bg-red-50 mt-1"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Courses Taught */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Courses Taught</h2>
                                    <Button onClick={handleAddCourse} className="bg-blue-600 hover:bg-blue-700 h-8">
                                        <Plus className="h-4 w-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {editData.coursesTaught.map((course, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-200 flex gap-4 items-start">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Course Name"
                                                    value={course.name || ''}
                                                    onChange={(e) => handleUpdateCourse(idx, 'name', e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Students"
                                                    value={course.students || 0}
                                                    onChange={(e) => handleUpdateCourse(idx, 'students', parseInt(e.target.value))}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Rating"
                                                    step="0.1"
                                                    value={course.rating || 4.5}
                                                    onChange={(e) => handleUpdateCourse(idx, 'rating', parseFloat(e.target.value))}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleDeleteCourse(idx)}
                                                variant="outline"
                                                className="h-8 px-2 border-red-300 text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

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
                                        <CheckCircle2 className="h-5 w-5 text-white" />
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
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Pen className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                                {editData.resume && (
                                    <a href={editData.resume} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                            <Download className="mr-2 h-4 w-4" /> Download Resume
                                        </Button>
                                    </a>
                                )}
                                <ReportDownloadButton />
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
                                                    <span className="text-2xl">{qual.emoji || '📚'}</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">{qual.title || 'Ph.D'}</h3>
                                                <p className="text-gray-600 text-sm">{qual.institution || qual.year}</p>
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
                                    {user?.profile?.researchAreas?.length ? (
                                        user.profile.researchAreas.map((area, idx) => (
                                            <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">
                                                {area}
                                            </span>
                                        ))
                                    ) : (
                                        <>
                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">AI in Education</span>
                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">Natural Language Processing</span>
                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">Digital Pedagogy</span>
                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">E-learning Platforms</span>
                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">Machine Learning</span>
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Publications */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Publications</h2>
                                <div className="space-y-4">
                                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
                                        <h3 className="font-bold text-gray-900 mb-1">IEEE Transactions, 2023</h3>
                                        <p className="text-gray-600 text-sm mb-3">AI-driven Personalised Learning Paths</p>
                                        <p className="text-gray-500 text-xs mb-4">Sharma, A., et al.</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
                                            Read Paper → 
                                        </a>
                                    </div>
                                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
                                        <h3 className="font-bold text-gray-900 mb-1">Journal of Tech & Society, 2021</h3>
                                        <p className="text-gray-600 text-sm mb-3">Challenges of NLP in Vernacular Languages</p>
                                        <p className="text-gray-500 text-xs mb-4">Sharma, A., Patel, R.</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
                                            Read Paper →
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* Experience */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                                <div className="space-y-4">
                                    {user?.profile?.experience?.length ? (
                                        user.profile.experience.map((exp, idx) => (
                                            <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-6 flex items-start gap-4">
                                                <div className="h-3 w-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                                    <p className="text-gray-600 text-sm">{exp.company}</p>
                                                    {exp.duration && <p className="text-gray-500 text-xs mt-1">{exp.duration}</p>}
                                                    {exp.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="rounded-lg bg-blue-50 border border-blue-200 p-6 flex items-start gap-4">
                                                <div className="h-3 w-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">Assistant Professor</h3>
                                                    <p className="text-gray-600 text-sm">IIT Delhi</p>
                                                    <p className="text-gray-500 text-xs mt-1">2019 - Present</p>
                                                </div>
                                            </div>
                                            <div className="rounded-lg bg-blue-50 border border-blue-200 p-6 flex items-start gap-4">
                                                <div className="h-3 w-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">Lecturer</h3>
                                                    <p className="text-gray-600 text-sm">University of Mumbai</p>
                                                    <p className="text-gray-500 text-xs mt-1">2016 - 2019</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Courses Taught */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Taught</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {user?.profile?.coursesTaught?.length ? (
                                        user.profile.coursesTaught.map((course, idx) => (
                                            <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
                                                <h3 className="font-bold text-gray-900 text-sm">{course.name}</h3>
                                                <p className="text-gray-600 text-xs mt-1">{course.students} Students</p>
                                                <div className="flex items-center justify-center mt-2 text-yellow-500">
                                                    {'★'.repeat(Math.floor(course.rating))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="rounded-lg bg-teal-50 border border-teal-200 p-4 text-center">
                                                <h3 className="font-bold text-teal-900 text-sm">Data Structures</h3>
                                                <p className="text-teal-600 text-xs mt-1">120 Students</p>
                                            </div>
                                            <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-center">
                                                <h3 className="font-bold text-purple-900 text-sm">Machine Learning</h3>
                                                <p className="text-purple-600 text-xs mt-1">95 Students</p>
                                            </div>
                                            <div className="rounded-lg bg-orange-50 border border-orange-200 p-4 text-center">
                                                <h3 className="font-bold text-orange-900 text-sm">Database Mgmt</h3>
                                                <p className="text-orange-600 text-xs mt-1">80 Students</p>
                                            </div>
                                            <div className="rounded-lg bg-pink-50 border border-pink-200 p-4 text-center">
                                                <h3 className="font-bold text-pink-900 text-sm">OS</h3>
                                                <p className="text-pink-600 text-xs mt-1">110 Students</p>
                                            </div>
                                            <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-4 text-center">
                                                <h3 className="font-bold text-cyan-900 text-sm">Artificial AI</h3>
                                                <p className="text-cyan-600 text-xs mt-1">85 Students</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right Column - 1 col */}
                        <div className="space-y-6">
                            {/* AI Strength Score */}
                            <div className="rounded-xl bg-blue-50 border border-blue-200 p-8 text-center">
                                <h3 className="text-gray-900 font-bold mb-4">AI Strength Score</h3>
                                <div className="relative h-40 w-40 mx-auto mb-4">
                                    <svg className="h-full w-full" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                        <circle cx="60" cy="60" r="50" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray={`${Math.PI * 100 * 0.92} ${Math.PI * 100}`} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold text-blue-600">92%</span>
                                        <span className="text-xs text-gray-600">Match</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">Based on profile completeness and fit.</p>
                            </div>

                            {/* View Demo */}
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 gap-2">
                                <PlayCircle className="h-4 w-4" />
                                View Demo Lecture
                            </Button>
                        </div>
                    </div>

                    {/* Applied Jobs */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
                        <AppliedJobTable />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileCandidate;
