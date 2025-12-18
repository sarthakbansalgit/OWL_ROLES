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
import { toast } from 'sonner';

const ProfileCandidate = () => {
    useGetAppliedJobs();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const [scoreAnimated, setScoreAnimated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const resumeInputRef = useRef(null);
    const photoInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeoutRef = useRef(null);

    const [editData, setEditData] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.profile?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        location: user?.profile?.location || '',
        orcidId: user?.profile?.orcidId || '',
        qualifications: user?.profile?.qualifications || [],
        researchAreas: user?.profile?.researchAreas || [],
        experience: user?.profile?.experience || [],
        coursesTaught: user?.profile?.coursesTaught || [],
        publications: user?.profile?.publications || [],
        resume: user?.profile?.resume || '',
        profilePhoto: user?.profile?.profilePhoto || ''
    });

    useEffect(() => {
        setScoreAnimated(true);
    }, []);

    // Auto-save handler with debouncing
    const autoSaveProfile = async (dataToSave) => {
        try {
            setIsSaving(true);
            const config = { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.put(apiUrl, dataToSave, config);

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success('Profile updated!');
            }
        } catch (error) {
            console.error('Error auto-saving profile:', error.response?.data || error.message);
            toast.error('Failed to save');
        } finally {
            setIsSaving(false);
        }
    };

    // Debounced auto-save on edit
    const handleEditChange = (field, value) => {
        const newEditData = { ...editData, [field]: value };
        setEditData(newEditData);

        // Clear previous timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout for auto-save (2 seconds after user stops typing)
        saveTimeoutRef.current = setTimeout(() => {
            if (value && value.trim()) { // Only save if field has content
                const dataToSend = { [field]: value };
                autoSaveProfile(dataToSend);
            }
        }, 1500);
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('profilePhoto', file);

        try {
            console.log('Uploading profile photo:', {
                filename: file.name,
                size: file.size,
                type: file.type
            });

            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.put(apiUrl, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 60000 // 1 minute for image upload
            });

            console.log('Photo upload response:', response.data);

            if (response.data.success) {
                setEditData({ ...editData, profilePhoto: response.data.user.profile.profilePhoto });
                dispatch(setUser(response.data.user));
                toast.success('Profile photo updated successfully!');
            }
        } catch (error) {
            console.error('Error uploading photo:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // Handle token expiry
            if (error.response?.status === 401 || error.response?.data?.message?.includes('token')) {
                toast.error('Your session has expired. Please login again.');
            } else {
                toast.error(error.response?.data?.message || 'Failed to upload profile photo');
            }
        } finally {
            setUploading(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            console.log('Uploading resume:', {
                filename: file.name,
                size: file.size,
                type: file.type
            });

            const apiUrl = `${import.meta.env.VITE_API_END_POINT}/api/v1/user/profile/update`;
            
            const response = await axios.put(apiUrl, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 120000 // 2 minutes for file upload
            });

            console.log('Resume upload response:', response.data);

            if (response.data.success) {
                setEditData({ ...editData, resume: response.data.user.profile.resume });
                dispatch(setUser(response.data.user));
                toast.success('Resume uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading resume:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // Handle token expiry
            if (error.response?.status === 401 || error.response?.data?.message?.includes('token')) {
                toast.error('Your session has expired. Please login again.');
                // Could redirect to login here
            } else {
                toast.error(error.response?.data?.message || 'Failed to upload resume');
            }
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
            if (editData.orcidId) dataToSend.orcidId = editData.orcidId;
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

    const handleAddPublication = () => {
        setEditData({
            ...editData,
            publications: [...editData.publications, { title: '', journal: '', year: '', authors: '', link: '' }]
        });
    };

    const handleUpdatePublication = (index, field, value) => {
        const updatedPublications = [...editData.publications];
        updatedPublications[index][field] = value;
        setEditData({ ...editData, publications: updatedPublications });
    };

    const handleDeletePublication = (index) => {
        setEditData({
            ...editData,
            publications: editData.publications.filter((_, i) => i !== index)
        });
    };

    if (isEditing) {
        return (
            <div className="min-h-screen bg-white text-gray-900">
                <Navbar />
                <main className="page-transition px-4 sm:px-10 lg:px-20 py-8 pt-24">
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
                                            onChange={(e) => handleEditChange('email', e.target.value)}
                                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                                    <textarea
                                        value={editData.bio}
                                        onChange={(e) => handleEditChange('bio', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                    />
                                </div>

                                {/* ORCID ID Input */}
                                <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
                                    <label className="block text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        ORCID iD (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.orcidId}
                                        onChange={(e) => handleEditChange('orcidId', e.target.value)}
                                        placeholder="e.g., 0000-0002-1825-0097"
                                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none font-mono"
                                    />
                                    <p className="text-xs text-green-700 mt-2">Get one at <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">orcid.org</a></p>
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
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {editData.researchAreas?.map((area, idx) => (
                                        <div key={idx} className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2">
                                            <span>{typeof area === 'object' ? (area?.field || area?.name) : area}</span>
                                            <button
                                                type="button"
                                                onClick={() => setEditData({
                                                    ...editData,
                                                    researchAreas: editData.researchAreas.filter((_, i) => i !== idx)
                                                })}
                                                className="text-blue-900 hover:text-red-600 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add research area and press Enter"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                            setEditData({
                                                ...editData,
                                                researchAreas: [...editData.researchAreas, { field: e.target.value.trim() }]
                                            });
                                            e.target.value = '';
                                            e.preventDefault();
                                        }
                                    }}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
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

                            {/* Publications */}
                            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Publications</h2>
                                    <Button onClick={handleAddPublication} className="bg-blue-600 hover:bg-blue-700 h-8">
                                        <Plus className="h-4 w-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {editData.publications.map((pub, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-200 flex gap-4 items-start">
                                            <div className="flex-1 space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Publication Title"
                                                    value={pub.title || ''}
                                                    onChange={(e) => handleUpdatePublication(idx, 'title', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Journal/Conference"
                                                        value={pub.journal || ''}
                                                        onChange={(e) => handleUpdatePublication(idx, 'journal', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Year (e.g., 2023)"
                                                        value={pub.year || ''}
                                                        onChange={(e) => handleUpdatePublication(idx, 'year', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Paper Link (URL)"
                                                        value={pub.link || ''}
                                                        onChange={(e) => handleUpdatePublication(idx, 'link', e.target.value)}
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Authors (e.g., Name, et al.)"
                                                    value={pub.authors || ''}
                                                    onChange={(e) => handleUpdatePublication(idx, 'authors', e.target.value)}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleDeletePublication(idx)}
                                                variant="outline"
                                                className="h-8 px-2 border-red-300 text-red-600 hover:bg-red-50 mt-1"
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
            
            <main className="page-transition px-4 sm:px-10 lg:px-20 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6 border-b border-blue-200 pb-8 mb-8">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-center">
                            {/* Profile Info */}
                            <div className="flex items-center gap-6">
                                {/* Avatar with Badge */}
                                <div className="relative">
                                    <Avatar className="h-32 w-32 ring-2 ring-blue-600 ring-offset-4 ring-offset-white flex-shrink-0 shadow-lg shadow-blue-600/20 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => photoInputRef.current?.click()}>
                                        <AvatarImage 
                                            src={editData.profilePhoto || user?.profile?.profilePhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-d8fJZhKvx9Gp5xEe6KxYpnGqCrvt4P69HiyaQQshDIULSxcdcf8TJxFz5EeOj40QEhblQOa1I8AYl6IQIQN9jfW54oFSCm00-_JISQl1bi7MDBO4nh7R6wXUfiQIB3rtfE1uGgRlvfxFC_wsPQ4bTP6dE6mx8IIdBx9ClJrQ5o8UPlRE17L-iYGUNZuB4ZXL4BdjtL4MUbw0jERVyee3BIdkRqAqC5O-qoqDnNcWJCPUE7lygW9S5DVyRRUOcMzXbTka9YjIoQlo"} 
                                            className="object-cover"
                                        />
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 ring-2 ring-white cursor-pointer hover:bg-blue-700" onClick={() => photoInputRef.current?.click()}>
                                        <Upload className="h-5 w-5 text-white" />
                                    </div>
                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
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
                                {user?.profile?.qualifications?.length ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {user.profile.qualifications.map((qual, index) => (
                                            <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200 flex flex-col items-center text-center hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 border border-blue-300 mb-3">
                                                    <span className="text-2xl">{typeof qual === 'object' ? (qual?.emoji || '📚') : '📚'}</span>
                                                </div>
                                                <h3 className="text-gray-900 font-bold text-lg">{typeof qual === 'string' ? qual : qual?.title || 'Qualification'}</h3>
                                                <p className="text-gray-600 text-sm">{typeof qual === 'object' ? (qual?.institution || qual?.year || '') : ''}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 rounded-lg border border-blue-300 p-8 text-center">
                                        <p className="text-gray-600 mb-3">Add your qualifications to make your profile stand out</p>
                                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                            <Pen className="w-4 h-4 mr-2" />
                                            Add Qualifications
                                        </Button>
                                    </div>
                                )}
                            </section>

                            {/* Research Areas */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Areas</h2>
                                {user?.profile?.researchAreas?.length ? (
                                    <div className="flex flex-wrap gap-3">
                                        {user.profile.researchAreas.map((area, idx) => (
                                            <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-300">
                                                {typeof area === 'string' ? area : typeof area === 'object' ? (area?.field || area?.name || 'Research Area') : String(area)}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 rounded-lg border border-blue-300 p-8 text-center">
                                        <p className="text-gray-600 mb-3">Add your research areas to showcase your expertise</p>
                                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                            <Pen className="w-4 h-4 mr-2" />
                                            Add Research Areas
                                        </Button>
                                    </div>
                                )}
                            </section>

                            {/* Publications */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Publications</h2>
                                {user?.profile?.publications?.length ? (
                                    <div className="space-y-4">
                                        {user.profile.publications.map((pub, idx) => (
                                            <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-6">
                                                <h3 className="font-bold text-gray-900 mb-1">{typeof pub === 'string' ? pub : pub?.title || 'Untitled'}</h3>
                                                <p className="text-gray-600 text-sm mb-1">{typeof pub === 'object' ? (pub?.journal || '') + ' ' + (pub?.year ? `(${pub.year})` : '') : ''}</p>
                                                {typeof pub === 'object' && pub?.authors && <p className="text-gray-500 text-xs mb-3">{pub.authors}</p>}
                                                {typeof pub === 'object' && pub?.link && (
                                                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
                                                        Read Paper → 
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 rounded-lg border border-blue-300 p-8 text-center">
                                        <p className="text-gray-600 mb-3">Add your publications to showcase your research work</p>
                                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                            <Pen className="w-4 h-4 mr-2" />
                                            Add Publications
                                        </Button>
                                    </div>
                                )}
                            </section>

                            {/* Experience */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                                {user?.profile?.experience?.length ? (
                                    <div className="space-y-4">
                                        {user.profile.experience.map((exp, idx) => (
                                            <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-6 flex items-start gap-4">
                                                <div className="h-3 w-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900">{typeof exp === 'string' ? exp : exp?.title || 'Untitled'}</h3>
                                                    <p className="text-gray-600 text-sm">{typeof exp === 'object' ? exp?.company || '' : ''}</p>
                                                    {typeof exp === 'object' && exp?.duration && <p className="text-gray-500 text-xs mt-1">{exp.duration}</p>}
                                                    {typeof exp === 'object' && exp?.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 rounded-lg border border-blue-300 p-8 text-center">
                                        <p className="text-gray-600 mb-3">Add your work experience to stand out</p>
                                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                            <Pen className="w-4 h-4 mr-2" />
                                            Add Experience
                                        </Button>
                                    </div>
                                )}
                            </section>

                            {/* Courses Taught */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Taught</h2>
                                {user?.profile?.coursesTaught?.length ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {user.profile.coursesTaught.map((course, idx) => (
                                            <div key={idx} className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
                                                <h3 className="font-bold text-gray-900 text-sm">{typeof course === 'string' ? course : course?.name || 'Unnamed'}</h3>
                                                <p className="text-gray-600 text-xs mt-1">{typeof course === 'object' && course?.students ? course.students + ' Students' : ''}</p>
                                                <div className="flex items-center justify-center mt-2 text-yellow-500">
                                                    {typeof course === 'object' && course?.rating ? '★'.repeat(Math.floor(course.rating)) : ''}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-blue-50 rounded-lg border border-blue-300 p-8 text-center">
                                        <p className="text-gray-600 mb-3">Add the courses you have taught</p>
                                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                            <Pen className="w-4 h-4 mr-2" />
                                            Add Courses
                                        </Button>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right Column - 1 col */}
                        <div className="space-y-6">
                            {/* ORCID ID Section */}
                            <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="bg-green-500 rounded-full p-2 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-gray-900 font-bold text-lg">ORCID iD</h3>
                                        <p className="text-green-700 text-xs font-medium">Link your ORCID to verify your publications</p>
                                    </div>
                                </div>
                                {user?.profile?.orcidId ? (
                                    <div className="bg-white rounded-lg p-4 border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">ORCID ID</p>
                                                <p className="text-lg font-mono font-bold text-green-700 mt-1">{user.profile.orcidId}</p>
                                            </div>
                                            <a 
                                                href={`https://orcid.org/${user.profile.orcidId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-semibold text-sm transition"
                                            >
                                                Verify
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg p-4 border border-green-200">
                                        <p className="text-gray-600 text-sm mb-3">Add your ORCID iD to increase credibility and visibility</p>
                                        <a 
                                            href="https://orcid.org/register"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center text-sm transition mb-2"
                                        >
                                            Get ORCID iD
                                        </a>
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="block w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-semibold text-sm transition"
                                        >
                                            Add My ORCID
                                        </button>
                                    </div>
                                )}
                            </div>

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
