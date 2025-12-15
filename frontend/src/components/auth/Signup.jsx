import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, Upload, User as UserIcon, Briefcase, MapPin, BookOpen, Award, Plus, Trash2, Video } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
        bio: "",
        location: "",
        orcidId: "",
        researchAreas: [],
        qualifications: [],
        experience: [],
        publications: [],
        coursesTaught: [],
        demoVideo: ""
    });

    const [showAdvanced, setShowAdvanced] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle input change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file change (Profile image)
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            return toast.error("File size should be less than 5MB");
        }
        if (file && !file.type.startsWith("image/")) {
            return toast.error("Only image files are allowed.");
        }
        setInput({ ...input, file });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            return toast.error("Please fill in all basic required fields.");
        }

        // Professional info validation (mandatory for candidates)
        if (input.role === 'student') {
            if (!input.bio?.trim() || !input.location?.trim()) {
                return toast.error("Bio and Location are mandatory for candidates");
            }
            if (input.researchAreas.length === 0) {
                return toast.error("Please add at least one research area");
            }
            if (input.qualifications.length === 0) {
                return toast.error("Please add at least one qualification");
            }
            if (input.experience.length === 0) {
                return toast.error("Please add at least one experience entry");
            }
            if (input.publications.length === 0) {
                return toast.error("Please add at least one publication");
            }
            if (input.coursesTaught.length === 0) {
                return toast.error("Please add at least one course taught");
            }
        }
    
        // Validate phone number format
        if (!/^\d{10}$/.test(input.phoneNumber)) {
            return toast.error("Please enter a valid 10-digit phone number.");
        }
    
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        
        // Add mandatory profile fields for candidates
        if (input.role === 'student') {
            formData.append("bio", input.bio);
            formData.append("location", input.location);
            formData.append("qualifications", JSON.stringify(input.qualifications));
            formData.append("researchAreas", JSON.stringify(input.researchAreas));
            formData.append("experience", JSON.stringify(input.experience));
            formData.append("publications", JSON.stringify(input.publications));
            formData.append("coursesTaught", JSON.stringify(input.coursesTaught));
        }
        
        // Add optional fields
        if (input.orcidId?.trim()) formData.append("orcidId", input.orcidId.trim());
        if (input.demoVideo) formData.append("demoVideo", input.demoVideo);
        if (input.file) formData.append("file", input.file);
    
        dispatch(setLoading(true));
        
        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            
            if (response.data.success) {
                toast.success(response.data.message || "Account created successfully!");
                navigate('/login');
            } else {
                toast.error(response.data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message === "Network Error") {
                toast.error("Network error. Please check your connection and try again.");
            } else {
                toast.error(error.message || "Something went wrong. Please try again.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Add field helper functions
    const addQualification = () => {
        setInput({
            ...input,
            qualifications: [...input.qualifications, { title: '', institution: '', year: '', emoji: '🎓' }]
        });
    };

    const updateQualification = (idx, field, value) => {
        const updated = [...input.qualifications];
        updated[idx][field] = value;
        setInput({ ...input, qualifications: updated });
    };

    const removeQualification = (idx) => {
        setInput({
            ...input,
            qualifications: input.qualifications.filter((_, i) => i !== idx)
        });
    };

    const addResearchArea = () => {
        setInput({
            ...input,
            researchAreas: [...input.researchAreas, '']
        });
    };

    const updateResearchArea = (idx, value) => {
        const updated = [...input.researchAreas];
        updated[idx] = value;
        setInput({ ...input, researchAreas: updated });
    };

    const removeResearchArea = (idx) => {
        setInput({
            ...input,
            researchAreas: input.researchAreas.filter((_, i) => i !== idx)
        });
    };

    const addExperience = () => {
        setInput({
            ...input,
            experience: [...input.experience, { title: '', company: '', description: '', duration: '' }]
        });
    };

    const updateExperience = (idx, field, value) => {
        const updated = [...input.experience];
        updated[idx][field] = value;
        setInput({ ...input, experience: updated });
    };

    const removeExperience = (idx) => {
        setInput({
            ...input,
            experience: input.experience.filter((_, i) => i !== idx)
        });
    };

    const addPublication = () => {
        setInput({
            ...input,
            publications: [...input.publications, { title: '', journal: '', year: '', authors: '', link: '' }]
        });
    };

    const updatePublication = (idx, field, value) => {
        const updated = [...input.publications];
        updated[idx][field] = value;
        setInput({ ...input, publications: updated });
    };

    const removePublication = (idx) => {
        setInput({
            ...input,
            publications: input.publications.filter((_, i) => i !== idx)
        });
    };

    const addCourse = () => {
        setInput({
            ...input,
            coursesTaught: [...input.coursesTaught, { name: '', students: 0, rating: 4.5, color: 'teal' }]
        });
    };

    const updateCourse = (idx, field, value) => {
        const updated = [...input.coursesTaught];
        updated[idx][field] = value;
        setInput({ ...input, coursesTaught: updated });
    };

    const removeCourse = (idx) => {
        setInput({
            ...input,
            coursesTaught: input.coursesTaught.filter((_, i) => i !== idx)
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 page-transition'>
            <Navbar />
            <div className="px-4 py-12 max-w-3xl mx-auto">
                <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-2xl p-8 space-y-8">
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                        <p className='text-gray-600 text-sm'>Complete all fields to get started</p>
                    </div>

                    {/* === BASIC INFORMATION SECTION === */}
                    <div className='space-y-6 pb-8 border-b border-gray-200'>
                        <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                            <User className='w-5 h-5 text-blue-600' />
                            Basic Information
                        </h2>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label className='text-gray-700 font-semibold'>Full Name *</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label className='text-gray-700 font-semibold'>Email *</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label className='text-gray-700 font-semibold'>Phone Number *</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label className='text-gray-700 font-semibold'>Password *</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className='space-y-3'>
                            <Label className='text-gray-700 font-semibold block'>Select Your Role *</Label>
                            <div className='grid grid-cols-2 gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setInput({ ...input, role: 'student' })}
                                    className={`relative p-4 rounded-lg border-2 transition-all ${
                                        input.role === 'student'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <UserIcon className={`w-5 h-5 mx-auto mb-2 ${input.role === 'student' ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span className={`text-sm font-semibold ${input.role === 'student' ? 'text-blue-600' : 'text-gray-700'}`}>
                                        Candidate
                                    </span>
                                    {input.role === 'student' && <div className='absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center'>✓</div>}
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInput({ ...input, role: 'recruiter' })}
                                    className={`relative p-4 rounded-lg border-2 transition-all ${
                                        input.role === 'recruiter'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <Briefcase className={`w-5 h-5 mx-auto mb-2 ${input.role === 'recruiter' ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span className={`text-sm font-semibold ${input.role === 'recruiter' ? 'text-blue-600' : 'text-gray-700'}`}>
                                        Recruiter
                                    </span>
                                    {input.role === 'recruiter' && <div className='absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center'>✓</div>}
                                </button>
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-2">
                            <Label className='text-gray-700 font-semibold'>Profile Picture</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className='cursor-pointer px-4 py-2 border border-gray-300 rounded-lg'
                            />
                            <p className='text-xs text-gray-500'>Max 5MB • JPG, PNG, GIF</p>
                        </div>
                    </div>

                    {/* === PROFESSIONAL INFORMATION SECTION (Mandatory for Candidates) === */}
                    {input.role === 'student' && (
                        <>
                            <div className='space-y-6 pb-8 border-b border-gray-200'>
                                <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                    <BookOpen className='w-5 h-5 text-blue-600' />
                                    Professional Information *
                                </h2>

                                {/* Bio and Location */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className="space-y-2">
                                        <Label className='text-gray-700 font-semibold'>Bio *</Label>
                                        <textarea
                                            value={input.bio}
                                            name="bio"
                                            onChange={changeEventHandler}
                                            placeholder="Tell us about yourself..."
                                            rows="4"
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className='text-gray-700 font-semibold flex items-center gap-2'>
                                            <MapPin className='w-4 h-4' />
                                            Location *
                                        </Label>
                                        <Input
                                            type="text"
                                            value={input.location}
                                            name="location"
                                            onChange={changeEventHandler}
                                            placeholder="City, Country"
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                    </div>
                                </div>

                                {/* ORCID ID (Optional) */}
                                <div className="space-y-2">
                                    <Label className='text-gray-700 font-semibold'>ORCID iD (Optional)</Label>
                                    <Input
                                        type="text"
                                        value={input.orcidId}
                                        name="orcidId"
                                        onChange={changeEventHandler}
                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                        className='w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono'
                                    />
                                    <p className='text-xs text-gray-500'>Get one at <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline font-semibold'>orcid.org</a></p>
                                </div>
                            </div>

                            {/* === QUALIFICATIONS SECTION === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                        <Award className='w-5 h-5 text-blue-600' />
                                        Qualifications * ({input.qualifications.length})
                                    </h2>
                                    <Button
                                        type='button'
                                        onClick={addQualification}
                                        className='bg-blue-600 hover:bg-blue-700 gap-2'
                                    >
                                        <Plus className='w-4 h-4' /> Add
                                    </Button>
                                </div>
                                <div className='space-y-3'>
                                    {input.qualifications.map((qual, idx) => (
                                        <div key={idx} className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                                <Input
                                                    placeholder="Degree/Certification"
                                                    value={qual.title}
                                                    onChange={(e) => updateQualification(idx, 'title', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Institution"
                                                    value={qual.institution}
                                                    onChange={(e) => updateQualification(idx, 'institution', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Year (e.g., 2023)"
                                                    value={qual.year}
                                                    onChange={(e) => updateQualification(idx, 'year', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                            </div>
                                            <Button
                                                type='button'
                                                onClick={() => removeQualification(idx)}
                                                variant='outline'
                                                className='w-full text-red-600 border-red-300 hover:bg-red-50'
                                            >
                                                <Trash2 className='w-4 h-4 mr-2' /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === RESEARCH AREAS SECTION === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                        <BookOpen className='w-5 h-5 text-blue-600' />
                                        Research Areas * ({input.researchAreas.length})
                                    </h2>
                                    <Button
                                        type='button'
                                        onClick={addResearchArea}
                                        className='bg-blue-600 hover:bg-blue-700 gap-2'
                                    >
                                        <Plus className='w-4 h-4' /> Add
                                    </Button>
                                </div>
                                <div className='space-y-3'>
                                    {input.researchAreas.map((area, idx) => (
                                        <div key={idx} className='flex gap-2'>
                                            <Input
                                                placeholder="e.g., Machine Learning"
                                                value={area}
                                                onChange={(e) => updateResearchArea(idx, e.target.value)}
                                                className='flex-1 border-blue-300'
                                            />
                                            <Button
                                                type='button'
                                                onClick={() => removeResearchArea(idx)}
                                                variant='outline'
                                                className='text-red-600 border-red-300 hover:bg-red-50'
                                            >
                                                <Trash2 className='w-4 h-4' />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === EXPERIENCE SECTION === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                        <Briefcase className='w-5 h-5 text-blue-600' />
                                        Experience * ({input.experience.length})
                                    </h2>
                                    <Button
                                        type='button'
                                        onClick={addExperience}
                                        className='bg-blue-600 hover:bg-blue-700 gap-2'
                                    >
                                        <Plus className='w-4 h-4' /> Add
                                    </Button>
                                </div>
                                <div className='space-y-3'>
                                    {input.experience.map((exp, idx) => (
                                        <div key={idx} className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                                <Input
                                                    placeholder="Job Title"
                                                    value={exp.title}
                                                    onChange={(e) => updateExperience(idx, 'title', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Company"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                            </div>
                                            <Input
                                                placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                                                value={exp.duration}
                                                onChange={(e) => updateExperience(idx, 'duration', e.target.value)}
                                                className='w-full border-blue-300'
                                            />
                                            <textarea
                                                placeholder="Job description"
                                                value={exp.description}
                                                onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                                                rows="3"
                                                className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                                            />
                                            <Button
                                                type='button'
                                                onClick={() => removeExperience(idx)}
                                                variant='outline'
                                                className='w-full text-red-600 border-red-300 hover:bg-red-50'
                                            >
                                                <Trash2 className='w-4 h-4 mr-2' /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === PUBLICATIONS SECTION === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                        <Award className='w-5 h-5 text-blue-600' />
                                        Publications * ({input.publications.length})
                                    </h2>
                                    <Button
                                        type='button'
                                        onClick={addPublication}
                                        className='bg-blue-600 hover:bg-blue-700 gap-2'
                                    >
                                        <Plus className='w-4 h-4' /> Add
                                    </Button>
                                </div>
                                <div className='space-y-3'>
                                    {input.publications.map((pub, idx) => (
                                        <div key={idx} className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
                                            <Input
                                                placeholder="Publication Title"
                                                value={pub.title}
                                                onChange={(e) => updatePublication(idx, 'title', e.target.value)}
                                                className='border-blue-300'
                                            />
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                                <Input
                                                    placeholder="Journal/Conference"
                                                    value={pub.journal}
                                                    onChange={(e) => updatePublication(idx, 'journal', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Year (e.g., 2023)"
                                                    value={pub.year}
                                                    onChange={(e) => updatePublication(idx, 'year', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Paper Link (URL)"
                                                    value={pub.link}
                                                    onChange={(e) => updatePublication(idx, 'link', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                            </div>
                                            <textarea
                                                placeholder="Authors (e.g., Name, et al.)"
                                                value={pub.authors}
                                                onChange={(e) => updatePublication(idx, 'authors', e.target.value)}
                                                rows="2"
                                                className='w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                                            />
                                            <Button
                                                type='button'
                                                onClick={() => removePublication(idx)}
                                                variant='outline'
                                                className='w-full text-red-600 border-red-300 hover:bg-red-50'
                                            >
                                                <Trash2 className='w-4 h-4 mr-2' /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === COURSES TAUGHT SECTION === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                        <BookOpen className='w-5 h-5 text-blue-600' />
                                        Courses Taught * ({input.coursesTaught.length})
                                    </h2>
                                    <Button
                                        type='button'
                                        onClick={addCourse}
                                        className='bg-blue-600 hover:bg-blue-700 gap-2'
                                    >
                                        <Plus className='w-4 h-4' /> Add
                                    </Button>
                                </div>
                                <div className='space-y-3'>
                                    {input.coursesTaught.map((course, idx) => (
                                        <div key={idx} className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                                <Input
                                                    placeholder="Course Name"
                                                    value={course.name}
                                                    onChange={(e) => updateCourse(idx, 'name', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Number of Students"
                                                    type="number"
                                                    value={course.students}
                                                    onChange={(e) => updateCourse(idx, 'students', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                                <Input
                                                    placeholder="Rating (e.g., 4.5)"
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="5"
                                                    value={course.rating}
                                                    onChange={(e) => updateCourse(idx, 'rating', e.target.value)}
                                                    className='border-blue-300'
                                                />
                                            </div>
                                            <Button
                                                type='button'
                                                onClick={() => removeCourse(idx)}
                                                variant='outline'
                                                className='w-full text-red-600 border-red-300 hover:bg-red-50'
                                            >
                                                <Trash2 className='w-4 h-4 mr-2' /> Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* === DEMO LECTURE VIDEO (Optional) === */}
                            <div className='space-y-4 pb-8 border-b border-gray-200'>
                                <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                                    <Video className='w-5 h-5 text-blue-600' />
                                    Demo Lecture Video (Optional)
                                </h2>
                                <div className="space-y-2">
                                    <Label className='text-gray-700 font-semibold'>Upload Video</Label>
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setInput({ ...input, demoVideo: e.target.files?.[0] })}
                                        className='cursor-pointer px-4 py-2 border border-gray-300 rounded-lg'
                                    />
                                    <p className='text-xs text-gray-500'>Max 50MB • MP4, WebM, Ogg</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* === SUBMIT BUTTON === */}
                    <div className='flex gap-4'>
                        <Link to="/login" className='flex-1'>
                            <Button variant="outline" className='w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50'>
                                Already have an account? Login
                            </Button>
                        </Link>
                        {loading ? (
                            <Button disabled className='flex-1 bg-blue-600 gap-2'>
                                <Loader2 className='w-4 h-4 animate-spin' />
                                Creating Account...
                            </Button>
                        ) : (
                            <Button type="submit" className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold'>
                                Create Account
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
