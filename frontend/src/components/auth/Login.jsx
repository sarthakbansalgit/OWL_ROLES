import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Briefcase } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.email || !input.password || !input.role) {
            toast.error("Please fill in all fields");
            return;
        }
        
        dispatch(setLoading(true));
        
        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            
            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message || "Login successful!");
                navigate("/");
            } else {
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
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
            navigate("/");
        }
    }, []);
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-950 to-gray-900'>
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-100px)] px-4'>
                <div className='w-full max-w-md'>
                    <form 
                        onSubmit={submitHandler}
                        role="form"
                        aria-label="Login form"
                        className='bg-white rounded-xl shadow-2xl p-8 space-y-6'
                    >
                        {/* Header */}
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                            <p className='text-gray-600 text-sm'>Sign in to your account to continue</p>
                        </div>

                        {/* Email Input */}
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition'
                            />
                        </div>

                        {/* Password Input */}
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-semibold flex items-center gap-2'>
                                <Lock className='w-4 h-4' />
                                Password
                            </Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition'
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
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <User className={`w-5 h-5 ${input.role === 'student' ? 'text-purple-600' : 'text-gray-600'}`} />
                                    <span className={`text-sm font-semibold ${input.role === 'student' ? 'text-purple-600' : 'text-gray-700'}`}>
                                        Candidate
                                    </span>
                                    {input.role === 'student' && (
                                        <div className='absolute top-2 right-2 w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs'>
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

                        {/* Login Button */}
                        {
                            loading ? (
                                <Button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition"> 
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                    Logging in...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
                                >
                                    Login
                                </Button>
                            )
                        }

                        {/* Signup Link */}
                        <div className='text-center text-sm text-gray-600'>
                            Don't have an account? <Link to="/signup" className='text-purple-600 font-semibold hover:text-purple-700 transition'>Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login