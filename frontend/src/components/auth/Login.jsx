import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Globe,
    Loader2,
    Lock,
    Mail,
    ShieldCheck,
    Sparkles,
    User,
    X,
} from 'lucide-react';

import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { USER_API_END_POINT } from '@/utils/constant';
import { setLoading, setUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password || !input.role) {
            toast.error('Please fill in all fields before continuing.');
            return;
        }

        dispatch(setLoading(true));

        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message || 'Login successful!');
                
                // Redirect based on user role
                if (response.data.user?.role === 'recruiter') {
                    navigate('/admin/jobs');
                } else {
                    setShowProfilePopup(true);
                    setTimeout(() => {
                        navigate('/profile');
                    }, 3200);
                }
            } else {
                toast.error(response.data.message || 'Login failed, please try again.');
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message === 'Network Error') {
                toast.error('Network error. Please check your connection and try again.');
            } else {
                toast.error('Something went wrong. Please try again.');
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

    const heroHighlights = [
        {
            icon: ShieldCheck,
            title: 'Secure Access',
            description: 'Enterprise-grade protection keeps your profile and data safe.',
        },
        {
            icon: Sparkles,
            title: 'Tailored Matches',
            description: 'AI-curated recommendations surface the roles that fit you best.',
        },
        {
            icon: Globe,
            title: 'Global Talent',
            description: 'Connect with teams and researchers from 120+ countries.',
        },
    ];

    const statBadges = [
        { label: 'Professionals enrolled', value: '30K+' },
        { label: 'Roles posted monthly', value: '4.2K' },
        { label: 'Avg. match time', value: '3 days' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 page-transition">
            <Navbar />

            <div className="auth-aurora" />
            <div className="auth-aurora auth-aurora--two" />
            <div className="auth-orb auth-orb--one" />
            <div className="auth-orb auth-orb--two" />
            <div className="auth-orb auth-orb--three" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-6xl flex-col justify-center px-4 pb-24 pt-16 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <span className="auth-mini-badge">
                                <Sparkles className="h-4 w-4 text-sky-500" />
                                Elevate your next move
                            </span>
                            <h1 className="text-4xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-5xl">
                                Step into a vibrant workspace curated for ambitious minds
                            </h1>
                            <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                                Log in to unlock a cinematic dashboard, real-time analytics, and beautifully orchestrated hiring journeys designed to keep you inspired at every step.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {heroHighlights.map(({ icon: Icon, title, description }) => (
                                <div
                                    key={title}
                                    className="auth-section-soft group relative overflow-hidden p-6 transition-transform hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative space-y-3">
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-500">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                            <p className="text-sm text-slate-600">{description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {statBadges.map((badge) => (
                                <div
                                    key={badge.label}
                                    className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-inner backdrop-blur"
                                >
                                    <span className="font-semibold text-slate-900">{badge.value}</span>
                                    <span className="ml-2 text-slate-600">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="auth-section-card relative overflow-hidden border border-white/20 bg-gradient-to-b from-slate-800/70 to-slate-900/80 p-12 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="absolute -top-24 right-24 hidden h-40 w-40 rounded-full bg-sky-400/30 blur-3xl sm:block" />
                        <div className="absolute -bottom-24 left-10 hidden h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl sm:block" />

                        <div className="relative space-y-16">
                            <header className="space-y-6 text-center slide-in-down">
                                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                                    Welcome back
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-6xl font-bold text-white drop-shadow-lg">Log in to continue</h2>
                                    <p className="text-xl text-white/90 font-medium drop-shadow">
                                        Beautifully fluid animations, powerful analytics, and opportunities tailored just for you.
                                    </p>
                                </div>
                            </header>

                            <form onSubmit={submitHandler} className="space-y-4 scale-in" aria-label="Login form">
                                <fieldset className="space-y-4 stagger-item-1 pt-48" aria-labelledby="login-email-label">
                                    <legend className="sr-only">Email</legend>
                                    <Label id="login-email-label" className="flex items-center gap-2 text-base font-bold text-black bg-yellow-200 px-3 py-2 rounded-lg w-fit">
                                        <Mail className="h-5 w-5 text-black" />
                                        Email address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className="h-14 rounded-2xl border-2 border-sky-400/60 bg-white/30 px-5 text-white text-base placeholder:text-white/70 focus:border-sky-300 focus:bg-white/40 focus:ring-2 focus:ring-sky-300 backdrop-blur-md transition-all shadow-lg shadow-sky-500/20"
                                        autoComplete="email"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        inputMode="email"
                                        required
                                    />
                                </fieldset>

                                <fieldset className="space-y-4 stagger-item-2 pt-8" aria-labelledby="login-password-label">
                                    <legend className="sr-only">Password</legend>
                                    <Label id="login-password-label" className="flex items-center gap-2 text-base font-bold text-black bg-yellow-200 px-3 py-2 rounded-lg w-fit">
                                        <Lock className="h-5 w-5 text-black" />
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={input.password}
                                            onChange={changeEventHandler}
                                            placeholder="Enter your password"
                                            className="h-14 rounded-2xl border-2 border-sky-400/60 bg-white/30 px-5 pr-14 text-white text-base placeholder:text-white/70 focus:border-sky-300 focus:bg-white/40 focus:ring-2 focus:ring-sky-300 backdrop-blur-md transition-all shadow-lg shadow-sky-500/20"
                                            autoComplete="current-password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-4 flex items-center text-white/80 transition hover:text-sky-300"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </fieldset>

                                <div className="space-y-5 stagger-item-3 pt-8">
                                    <Label className="block text-lg font-bold text-black bg-yellow-200 px-4 py-3 rounded-lg w-fit">Select your role</Label>
                                    <div className="grid grid-cols-2 gap-5">
                                        {[
                                            { key: 'student', label: 'Candidate', description: 'Discover tailored opportunities.' },
                                            { key: 'recruiter', label: 'Recruiter', description: 'Showcase roles with style.' },
                                        ].map((role) => {
                                            const isActive = input.role === role.key;
                                            return (
                                                <button
                                                    key={role.key}
                                                    type="button"
                                                    onClick={() => setInput((prev) => ({ ...prev, role: role.key }))}
                                                    className={`group relative overflow-hidden rounded-2xl border px-4 py-6 text-left transition-all ${
                                                        isActive
                                                            ? 'border-black bg-yellow-100 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md'
                                                            : 'border-slate-300 bg-white hover:border-yellow-400 hover:bg-yellow-50 backdrop-blur'
                                                    }`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-300/10 via-blue-300/5 to-indigo-300/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                                    <div className="relative space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold ${
                                                                        isActive
                                                                            ? 'border-black bg-yellow-200 text-black'
                                                                            : 'border-slate-300 bg-slate-100 text-slate-600'
                                                                    }`}
                                                                >
                                                                    <User className="h-5 w-5" />
                                                                </span>
                                                                <div>
                                                                    <p className="text-base font-bold text-black">{role.label}</p>
                                                                    <p className="text-sm font-semibold text-black">{role.description}</p>
                                                                </div>
                                                            </div>
                                                            {isActive && (
                                                                <CheckCircle2 className="h-5 w-5 text-sky-300 animate-pulse" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="auth-divider" />

                                {loading ? (
                                    <Button
                                        type="button"
                                        disabled
                                        className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 py-4 text-lg font-bold text-white shadow-[0_20px_100px_rgba(56,189,248,0.4)] hover:shadow-[0_25px_120px_rgba(56,189,248,0.5)] transition-all duration-300 card-3d opacity-75 cursor-not-allowed"
                                    >
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        Logging in...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-700 py-4 text-lg font-bold text-white shadow-[0_20px_100px_rgba(56,189,248,0.4)] hover:shadow-[0_30px_140px_rgba(56,189,248,0.6)] transition-all duration-300 card-3d hover:scale-105 active:scale-95"
                                    >
                                        Enter dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                )}

                                <p className="text-center text-sm text-slate-600">
                                    Don&apos;t have an account yet?{' '}
                                    <Link to="/signup" className="font-semibold text-sky-600 hover:text-sky-500">
                                        Create one in seconds
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showProfilePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur">
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_35px_120px_rgba(148,163,184,0.4)]">
                        <button
                            onClick={() => setShowProfilePopup(false)}
                            className="absolute right-4 top-4 rounded-full bg-white/70 p-1.5 text-slate-500 transition hover:bg-white hover:text-slate-700"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="space-y-6 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 text-white shadow-[0_10px_45px_rgba(56,189,248,0.35)]">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-semibold text-slate-900">Welcome aboard! ✨</h3>
                                <p className="text-sm text-slate-600">Login successful — let&apos;s polish your profile to shine brighter.</p>
                            </div>

                            <div className="auth-section-soft space-y-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-left">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="mt-1 h-5 w-5 text-sky-500" />
                                    <div>
                                        <p className="font-semibold text-slate-900">Boost your first impression</p>
                                        <p className="text-sm text-slate-600">
                                            Add your expertise, media, and achievements to start appearing in curated shortlists instantly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Button
                                    onClick={() => {
                                        setShowProfilePopup(false);
                                        user?.role === 'recruiter' ? navigate('/admin/jobs') : navigate('/profile');
                                    }}
                                    className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 py-3 text-base font-semibold text-white shadow-[0_18px_90px_rgba(56,189,248,0.3)]"
                                >
                                    {user?.role === 'recruiter' ? 'Go to Dashboard' : 'Polish my profile now'}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setShowProfilePopup(false);
                                        navigate('/');
                                    }}
                                    className="rounded-2xl border border-slate-200/70 bg-white/80 py-3 text-slate-600 transition hover:bg-white"
                                >
                                    I&apos;ll do it later
                                </Button>
                            </div>

                            <p className="text-xs text-slate-500">Auto-redirecting to your profile in a few seconds...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;