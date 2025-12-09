import React, { useState, useRef, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Pen, Download, Upload, Badge, CheckCircle2, PlayCircle, Save, X, FileUp } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector, useDispatch } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { ReportDownloadButton } from './DownloadReport';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const EditableProfile = () => {
    useGetAppliedJobs();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const [scoreAnimated, setScoreAnimated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [resume, setResume] = useState(user?.profile?.resume || null);
    const [uploading, setUploading] = useState(false);
    const resumeInputRef = useRef(null);
    
    const [editData, setEditData] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        bio: user?.profile?.bio || '',
        phoneNumber: user?.profile?.phoneNumber || '',
        location: user?.profile?.location || '',
        qualifications: user?.profile?.qualifications || [],
        researchAreas: user?.profile?.researchAreas || [],
        experience: user?.profile?.experience || [],
        coursesTaught: user?.profile?.coursesTaught || [],
        publications: user?.profile?.publications || []
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
        formData.append('file', file);

        try {
            // Upload to Cloudinary or your backend
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/raw/upload`;
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', file);
            cloudinaryFormData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
            cloudinaryFormData.append('folder', 'resumes');

            const response = await axios.post(cloudinaryUrl, cloudinaryFormData);
            const resumeUrl = response.data.secure_url;

            // Save to backend
            const config = {
                headers: { 'Content-Type': 'application/json' }
            };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/upload-resume`;
            const updateResponse = await axios.post(apiUrl, { resumeUrl }, config);

            if (updateResponse.data.success) {
                setResume(resumeUrl);
                dispatch(setUser({
                    ...user,
                    profile: {
                        ...user.profile,
                        resume: resumeUrl
                    }
                }));
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
            // Only send fields that have been modified (not empty)
            const dataToSend = {};
            if (editData.fullname) dataToSend.fullname = editData.fullname;
            if (editData.email) dataToSend.email = editData.email;
            if (editData.phoneNumber) dataToSend.phoneNumber = editData.phoneNumber;
            if (editData.bio) dataToSend.bio = editData.bio;
            if (editData.location) dataToSend.location = editData.location;
            if (editData.qualifications?.length > 0) dataToSend.qualifications = editData.qualifications;
            if (editData.researchAreas?.length > 0) dataToSend.researchAreas = editData.researchAreas;
            if (editData.experience?.length > 0) dataToSend.experience = editData.experience;
            if (editData.coursesTaught?.length > 0) dataToSend.coursesTaught = editData.coursesTaught;
            if (editData.publications?.length > 0) dataToSend.publications = editData.publications;

            if (Object.keys(dataToSend).length === 0) {
                alert('Please make some changes before saving');
                return;
            }

            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.put(apiUrl, dataToSend, config);

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                setIsEditing(false);
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleEditChange = (field, value) => {
        setEditData({
            ...editData,
            [field]: value
        });
    };

    if (isEditing) {
        return (
            <div className="min-h-screen bg-white text-gray-900">
                <Navbar />
                <main className="px-4 sm:px-10 lg:px-20 py-8 pt-24">
                    <div className="max-w-6xl mx-auto">
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

                        <div className="space-y-6 bg-blue-50 rounded-lg p-8 border border-blue-200">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={editData.fullname}
                                        onChange={(e) => handleEditChange('fullname', e.target.value)}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => handleEditChange('email', e.target.value)}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={editData.phoneNumber}
                                        onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={editData.location}
                                        onChange={(e) => handleEditChange('location', e.target.value)}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                                <textarea
                                    value={editData.bio}
                                    onChange={(e) => handleEditChange('bio', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Resume Upload */}
                            <div>
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
                                    {resume && (
                                        <a
                                            href={resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 underline flex items-center gap-2"
                                        >
                                            <Download className="h-4 w-4" /> View Current Resume
                                        </a>
                                    )}
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
                                {resume && (
                                    <a href={resume} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                            <Download className="mr-2 h-4 w-4" /> Download Resume
                                        </Button>
                                    </a>
                                )}
                                <ReportDownloadButton />
                            </div>
                        </div>
                    </div>

                    {/* Qualifications Section */}
                    {user?.profile?.qualifications && user?.profile?.qualifications.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {user.profile.qualifications.map((qual, idx) => (
                                    <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-6 backdrop-blur-sm">
                                        <div className="text-3xl mb-3">{qual.emoji || '🎓'}</div>
                                        <h3 className="font-bold text-gray-900">{qual.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{qual.institution}</p>
                                        {qual.year && <p className="text-xs text-gray-500 mt-2">Year: {qual.year}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Research Areas */}
                    {user?.profile?.researchAreas && user?.profile?.researchAreas.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Areas</h2>
                            <div className="flex flex-wrap gap-2">
                                {user.profile.researchAreas.map((area, idx) => (
                                    <span key={idx} className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-300">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {user?.profile?.experience && user?.profile?.experience.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                            <div className="space-y-4">
                                {user.profile.experience.map((exp, idx) => (
                                    <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                                <p className="text-gray-600">{exp.company}</p>
                                                {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                                            </div>
                                            {exp.duration && <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.duration}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Applied Jobs */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
                        <AppliedJobTable />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditableProfile;
