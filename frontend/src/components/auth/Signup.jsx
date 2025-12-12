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
import { Loader2, User, Mail, Phone, Lock, Upload, User as UserIcon, Briefcase, MapPin, BookOpen, Award } from 'lucide-react';

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
        researchAreas: ""
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
    
        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            return toast.error("Please fill in all required fields.");
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
        
        // Add profile fields
        if (input.bio) formData.append("bio", input.bio);
        if (input.location) formData.append("location", input.location);
        if (input.orcidId) formData.append("orcidId", input.orcidId);
        if (input.researchAreas) {
            const areas = input.researchAreas.split(",").map(a => a.trim());
            formData.append("researchAreas", JSON.stringify(areas));
        }
    
        if (input.file) {
            formData.append("file", input.file);
        }
    
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

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-950 to-gray-900'>
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
                <div className='w-full max-w-md'>
                    <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-2xl p-8 space-y-5">
                        {/* Header */}
                        <div className='text-center mb-6'>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className='text-gray-600 text-sm'>Join us and start your career journey</p>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className='text-gray-700 font-semibold flex items-center gap-2'>
                                <User className='w-4 h-4' />
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Phone className='w-4 h-4' />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="9876543210"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Lock className='w-4 h-4' />
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Role Selection */}
                        <div className='space-y-3 py-4 border-y border-gray-200'>
                            <Label className='text-gray-700 font-semibold block'>Select your role</Label>
                            <div className='grid grid-cols-2 gap-3'>
                                {/* Candidate Option */}
                                <button
                                    type='button'
                                    onClick={() => setInput({ ...input, role: 'student' })}
                                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                        input.role === 'student'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <UserIcon className={`w-5 h-5 ${input.role === 'student' ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span className={`text-sm font-semibold ${input.role === 'student' ? 'text-blue-600' : 'text-gray-700'}`}>
                                        Candidate
                                    </span>
                                    {input.role === 'student' && (
                                        <div className='absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs'>
                                            ✓
                                        </div>
                                    )}
                                </button>

                                {/* Recruiter Option */}
                                <button
                                    type='button'
                                    onClick={() => setInput({ ...input, role: 'recruiter' })}
                                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                        input.role === 'recruiter'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <Briefcase className={`w-5 h-5 ${input.role === 'recruiter' ? 'text-blue-600' : 'text-gray-600'}`} />
                                    <span className={`text-sm font-semibold ${input.role === 'recruiter' ? 'text-blue-600' : 'text-gray-700'}`}>
                                        Recruiter
                                    </span>
                                    {input.role === 'recruiter' && (
                                        <div className='absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs'>
                                            ✓
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-2">
                            <Label htmlFor="file" className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Upload className='w-4 h-4' />
                                Profile Picture (Optional)
                            </Label>
                            <Input
                                id="file"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className='cursor-pointer px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                            <p className='text-xs text-gray-500'>Max 5MB • JPG, PNG, GIF</p>
                        </div>

                        {/* Additional Profile Information - Collapsible */}
                        <div className='space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50'>
                            <button
                                type='button'
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className='w-full flex items-center justify-between text-gray-700 font-semibold hover:text-blue-600 transition'
                            >
                                <span className='flex items-center gap-2'>
                                    <BookOpen className='w-4 h-4' />
                                    Professional Information (Optional)
                                </span>
                                <span className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {showAdvanced && (
                                <div className='space-y-3 pt-3 border-t border-gray-200'>
                                    {/* Bio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="bio" className='text-gray-700 font-semibold flex items-center gap-2'>
                                            Bio
                                        </Label>
                                        <textarea
                                            id="bio"
                                            value={input.bio}
                                            name="bio"
                                            onChange={changeEventHandler}
                                            placeholder="Tell us about yourself..."
                                            rows="3"
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className='text-gray-700 font-semibold flex items-center gap-2'>
                                            <MapPin className='w-4 h-4' />
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            type="text"
                                            value={input.location}
                                            name="location"
                                            onChange={changeEventHandler}
                                            placeholder="City, Country"
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        />
                                    </div>

                                    {/* ORCID ID */}
                                    <div className="space-y-2">
                                        <Label htmlFor="orcidId" className='text-gray-700 font-semibold flex items-center gap-2'>
                                            ORCID iD
                                        </Label>
                                        <Input
                                            id="orcidId"
                                            type="text"
                                            value={input.orcidId}
                                            name="orcidId"
                                            onChange={changeEventHandler}
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                        />
                                        <p className='text-xs text-gray-500'>Optional: Your ORCID identifier</p>
                                    </div>

                                    {/* Research Areas - Only for Candidates */}
                                    {input.role === 'student' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="researchAreas" className='text-gray-700 font-semibold flex items-center gap-2'>
                                                <Award className='w-4 h-4' />
                                                Research Areas
                                            </Label>
                                            <Input
                                                id="researchAreas"
                                                type="text"
                                                value={input.researchAreas}
                                                name="researchAreas"
                                                onChange={changeEventHandler}
                                                placeholder="e.g., Machine Learning, Data Science, Cloud Computing"
                                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                            />
                                            <p className='text-xs text-gray-500'>Comma-separated list of your research interests</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Signup Button */}
                        {
                            loading
                                ? <Button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </Button>
                                : <Button type="submit" className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                                    Signup
                                </Button>
                        }

                        {/* Login Link */}
                        <div className='text-center text-sm text-gray-600'>
                            Already have an account? <Link to="/login" className='text-blue-600 font-semibold hover:text-blue-700 transition'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
