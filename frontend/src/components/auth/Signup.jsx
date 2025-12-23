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
import {
    AlertCircle,
    ArrowRight,
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    Globe,
    Loader2,
    Lock,
    Mail,
    MapPin,
    Phone,
    Plus,
    Sparkles,
    Trash2,
    Upload,
    User as UserIcon,
    Video,
} from 'lucide-react';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector((state) => state.auth);

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        bio: '',
        location: '',
        orcidId: '',
        qualifications: [],
        researchAreas: [],
        experience: [],
        publications: [],
        coursesTaught: [],
        demoVideo: null,
        file: null,
    });

    const changeEventHandler = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const changeFileHandler = (event) => {
        const file = event.target.files?.[0] ?? null;
        setInput((prev) => ({ ...prev, file }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            toast.error('Please fill in all basic required fields.');
            return;
        }

        if (input.role === 'student') {
            if (!input.bio?.trim() || !input.location?.trim()) {
                toast.error('Bio and Location are mandatory for candidates');
                return;
            }
            if (input.researchAreas.length === 0) {
                toast.error('Please add at least one research area');
                return;
            }
            if (input.qualifications.length === 0) {
                toast.error('Please add at least one qualification');
                return;
            }
            if (input.experience.length === 0) {
                toast.error('Please add at least one experience entry');
                return;
            }
            if (input.publications.length === 0) {
                toast.error('Please add at least one publication');
                return;
            }
            if (input.coursesTaught.length === 0) {
                toast.error('Please add at least one course taught');
                return;
            }
        }

        if (!/^\d{10}$/.test(input.phoneNumber)) {
            toast.error('Please enter a valid 10-digit phone number.');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);

        if (input.role === 'student') {
            formData.append('bio', input.bio);
            formData.append('location', input.location);
            formData.append('qualifications', JSON.stringify(input.qualifications));
            formData.append('researchAreas', JSON.stringify(input.researchAreas));
            formData.append('experience', JSON.stringify(input.experience));
            formData.append('publications', JSON.stringify(input.publications));
            formData.append('coursesTaught', JSON.stringify(input.coursesTaught));
        }

        if (input.orcidId?.trim()) {
            formData.append('orcidId', input.orcidId.trim());
        }
        if (input.demoVideo) {
            formData.append('demoVideo', input.demoVideo);
        }
        if (input.file) {
            formData.append('file', input.file);
        }

        dispatch(setLoading(true));

        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                },
            );

            if (response.data.success) {
                toast.success(response.data.message || 'Account created successfully!');
                navigate('/login');
            } else {
                toast.error(response.data.message || 'Signup failed, please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message === 'Network Error') {
                toast.error('Network error. Please check your connection and try again.');
            } else {
                toast.error(error.message || 'Something went wrong. Please try again.');
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
        setInput((prev) => ({
            ...prev,
            qualifications: [...prev.qualifications, { title: '', institution: '', year: '', emoji: '🎓' }],
        }));
    };

    const updateQualification = (idx, field, value) => {
        setInput((prev) => {
            const updated = prev.qualifications.map((item, i) => (i === idx ? { ...item, [field]: value } : item));
            return { ...prev, qualifications: updated };
        });
    };

    const removeQualification = (idx) => {
        setInput((prev) => ({
            ...prev,
            qualifications: prev.qualifications.filter((_, i) => i !== idx),
        }));
    };

    const addResearchArea = () => {
        setInput((prev) => ({
            ...prev,
            researchAreas: [...prev.researchAreas, ''],
        }));
    };

    const updateResearchArea = (idx, value) => {
        setInput((prev) => {
            const updated = prev.researchAreas.map((item, i) => (i === idx ? value : item));
            return { ...prev, researchAreas: updated };
        });
    };

    const removeResearchArea = (idx) => {
        setInput((prev) => ({
            ...prev,
            researchAreas: prev.researchAreas.filter((_, i) => i !== idx),
        }));
    };

    const addExperience = () => {
        setInput((prev) => ({
            ...prev,
            experience: [...prev.experience, { title: '', company: '', description: '', duration: '' }],
        }));
    };

    const updateExperience = (idx, field, value) => {
        setInput((prev) => {
            const updated = prev.experience.map((item, i) => (i === idx ? { ...item, [field]: value } : item));
            return { ...prev, experience: updated };
        });
    };

    const removeExperience = (idx) => {
        setInput((prev) => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== idx),
        }));
    };

    const addPublication = () => {
        setInput((prev) => ({
            ...prev,
            publications: [...prev.publications, { title: '', journal: '', year: '', authors: '', link: '' }],
        }));
    };

    const updatePublication = (idx, field, value) => {
        setInput((prev) => {
            const updated = prev.publications.map((item, i) => (i === idx ? { ...item, [field]: value } : item));
            return { ...prev, publications: updated };
        });
    };

    const removePublication = (idx) => {
        setInput((prev) => ({
            ...prev,
            publications: prev.publications.filter((_, i) => i !== idx),
        }));
    };

    const addCourse = () => {
        setInput((prev) => ({
            ...prev,
            coursesTaught: [...prev.coursesTaught, { name: '', students: 0, rating: 4.5, color: 'teal' }],
        }));
    };

    const updateCourse = (idx, field, value) => {
        setInput((prev) => {
            const updated = prev.coursesTaught.map((item, i) => (i === idx ? { ...item, [field]: value } : item));
            return { ...prev, coursesTaught: updated };
        });
    };

    const removeCourse = (idx) => {
        setInput((prev) => ({
            ...prev,
            coursesTaught: prev.coursesTaught.filter((_, i) => i !== idx),
        }));
    };

    const heroHighlights = [
        {
            icon: Sparkles,
            title: 'Immersive storytelling',
            description: 'Animated sections spotlight academic peaks and career wins in seconds.',
        },
        {
            icon: Globe,
            title: 'Global visibility',
            description: 'Connect with leading institutes and companies across 120+ countries.',
        },
        {
            icon: Award,
            title: 'Verified credibility',
            description: 'Structured data helps reviewers trust and respond to your profile faster.',
        },
    ];

    const journeySteps = [
        {
            step: '01',
            title: 'Share your essentials',
            detail: 'Lay the groundwork with contact info and preferred role.',
        },
        {
            step: '02',
            title: 'Showcase achievements',
            detail: 'Add your qualifications, research, and teaching experience.',
        },
        {
            step: '03',
            title: 'Launch your profile',
            detail: 'Go live with a radiant presence that recruiters remember.',
        },
    ];

    const statBadges = [
        { label: 'Experts onboarded', value: '30K+' },
        { label: 'Opportunities monthly', value: '4.2K' },
        { label: 'Avg. match time', value: '3 days' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white page-transition">
            <Navbar />

            <div className="auth-aurora" />
            <div className="auth-aurora auth-aurora--two" />
            <div className="auth-orb auth-orb--one" />
            <div className="auth-orb auth-orb--two" />
            <div className="auth-orb auth-orb--three" />

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-14 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <section className="relative space-y-10">
                        <div className="space-y-4">
                            <span className="auth-mini-badge">
                                <Sparkles className="h-4 w-4 text-sky-500" />
                                Design-first onboarding
                            </span>
                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                                Craft a luminous profile that employers can&apos;t ignore
                            </h1>
                            <p className="max-w-xl text-base text-black sm:text-lg">
                                The signup journey glows with cinematic gradients, floating auroras, and silky
                                transitions that celebrate every detail you share. Step in and let your expertise shine.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {heroHighlights.map(({ icon: Icon, title, description }) => (
                                <div
                                    key={title}
                                    className="auth-section-soft group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 transition-transform hover:-translate-y-1 backdrop-blur-md"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-blue-400/5 to-indigo-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative space-y-4">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div className="space-y-1">
                                            <p className="text-lg font-semibold text-black">{title}</p>
                                            <p className="text-sm text-slate-700">{description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="auth-section-soft relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                            <div className="absolute -top-10 -right-6 h-24 w-24 rounded-full bg-sky-500/20 blur-3xl" />
                            <div className="relative space-y-5">
                                {journeySteps.map(({ step, title, detail }) => (
                                    <div key={step} className="flex gap-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-sm font-semibold text-sky-300">
                                            {step}
                                        </span>
                                        <div>
                                            <p className="text-base font-semibold text-black">{title}</p>
                                            <p className="text-sm text-slate-700">{detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {statBadges.map((badge) => (
                                <div
                                    key={badge.label}
                                    className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm text-slate-700 shadow-inner backdrop-blur-md"
                                >
                                    <span className="font-semibold text-black">{badge.value}</span>
                                    <span className="ml-2 text-slate-700">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="auth-section-card relative overflow-hidden border border-white/20 bg-gradient-to-b from-slate-800/70 to-slate-900/80 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="absolute -top-24 right-12 hidden h-44 w-44 rounded-full bg-sky-400/20 blur-3xl sm:block" />
                        <div className="absolute -bottom-28 left-8 hidden h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl sm:block" />

                        <div className="relative space-y-8">
                            <header className="space-y-3 text-center lg:text-left">
                                <span className="auth-mini-badge">
                                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                                    Step into brilliance
                                </span>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-semibold text-white drop-shadow-lg">Create your account</h2>
                                    <p className="text-sm text-white drop-shadow">
                                        Complete each section to unlock a vibrant dashboard, curated opportunities, and animated profile storytelling.
                                    </p>
                                </div>
                            </header>

                            <form onSubmit={submitHandler} className="space-y-10" aria-label="Signup form">
                                <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6 backdrop-blur-sm">
                                    <div className="space-y-1">
                                        <p className="text-lg font-semibold text-black">Basic profile</p>
                                        <p className="text-sm text-slate-700">
                                            Tell us how to reach you and which experience you want to unlock.
                                        </p>
                                    </div>

                                    <div className="grid gap-6 lg:gap-8">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-semibold text-black">
                                                <UserIcon className="h-4 w-4 text-sky-600" />
                                                Full name *
                                            </Label>
                                            <Input
                                                type="text"
                                                name="fullname"
                                                value={input.fullname}
                                                onChange={changeEventHandler}
                                                placeholder="Ada Lovelace"
                                                className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 text-black placeholder:text-slate-500 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-400"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-semibold text-black">
                                                <Mail className="h-4 w-4 text-sky-600" />
                                                Email *
                                            </Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={input.email}
                                                onChange={changeEventHandler}
                                                placeholder="you@example.com"
                                                className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 text-black placeholder:text-slate-500 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-400"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-semibold text-black">
                                                <Phone className="h-4 w-4 text-sky-600" />
                                                Phone number *
                                            </Label>
                                            <Input
                                                type="text"
                                                name="phoneNumber"
                                                value={input.phoneNumber}
                                                onChange={changeEventHandler}
                                                placeholder="9876543210"
                                                className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 text-black placeholder:text-slate-500 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-400"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-bold text-black bg-yellow-200 px-3 py-2 rounded-lg w-fit">
                                                <Lock className="h-4 w-4 text-black" />
                                                Password *
                                            </Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                value={input.password}
                                                onChange={changeEventHandler}
                                                placeholder="Create a secure password"
                                                className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 text-black placeholder:text-slate-500 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="block text-sm font-bold text-black bg-yellow-200 px-3 py-2 rounded-lg w-fit">Select your role *</Label>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {[
                                                {
                                                    key: 'student',
                                                    title: 'Candidate',
                                                    description: 'Curate a portfolio and get scouted by teams.',
                                                    icon: UserIcon,
                                                },
                                                {
                                                    key: 'recruiter',
                                                    title: 'Recruiter',
                                                    description: 'Showcase roles and collaborate with talent.',
                                                    icon: Briefcase,
                                                },
                                            ].map((role) => {
                                                const isActive = input.role === role.key;
                                                const RoleIcon = role.icon;
                                                return (
                                                    <button
                                                        key={role.key}
                                                        type="button"
                                                        onClick={() => setInput((prev) => ({ ...prev, role: role.key }))}
                                                        className={`group relative overflow-hidden rounded-2xl border px-5 py-5 text-left transition-all ${
                                                            isActive
                                                                ? 'border-sky-400 bg-sky-50 shadow-[0_18px_80px_rgba(56,189,248,0.2)]'
                                                                : 'border-slate-300 bg-white hover:border-sky-300 hover:bg-sky-50/40'
                                                        }`}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/10 to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                                        <div className="relative space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <span
                                                                        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold ${
                                                                            isActive
                                                                                ? 'border-sky-400 bg-sky-100 text-sky-600'
                                                                                : 'border-slate-300 bg-slate-50 text-slate-600'
                                                                        }`}
                                                                    >
                                                                        <RoleIcon className="h-4 w-4" />
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-base font-bold text-black">{role.title}</p>
                                                                        <p className="text-xs font-semibold text-black">{role.description}</p>
                                                                    </div>
                                                                </div>
                                                                {isActive && <CheckCircle2 className="h-5 w-5 text-sky-300" />}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2 text-sm font-semibold text-white">
                                            <Upload className="h-4 w-4 text-sky-300" />
                                            Profile picture
                                        </Label>
                                        <label className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-sky-300/60 hover:bg-white/10">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                                                <Upload className="h-5 w-5" />
                                            </span>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-white">Upload profile image</p>
                                                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                                            </div>
                                            {input.file ? (
                                                <p className="text-xs text-sky-300">{input.file.name}</p>
                                            ) : null}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={changeFileHandler}
                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                            />
                                        </label>
                                    </div>
                                </div>

                                {input.role === 'student' && (
                                    <div className="space-y-8">
                                        <div className="auth-section-soft flex items-start gap-3 rounded-3xl border border-slate-300 bg-white p-4 text-sm text-slate-700">
                                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                            <p>
                                                Candidate accounts unlock our talent marketplace. Complete the sections below to ensure your profile is spotlight ready.
                                            </p>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="space-y-1">
                                                <p className="text-lg font-semibold text-black">Professional story</p>
                                                <p className="text-sm text-slate-700">
                                                    Set the scene with a compelling bio and your current location.
                                                </p>
                                            </div>

                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label className="flex items-center gap-2 text-sm font-semibold text-black">
                                                        <BookOpen className="h-4 w-4 text-sky-600" />
                                                        Bio *
                                                    </Label>
                                                    <textarea
                                                        name="bio"
                                                        value={input.bio}
                                                        onChange={changeEventHandler}
                                                        placeholder="Tell us about your mission, specialties, and what drives your work..."
                                                        rows={5}
                                                        className="min-h-[140px] w-full rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-sm text-black placeholder:text-slate-500 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                                                    />
                                                </div>

                                                <div className="space-y-5">
                                                    <div className="space-y-3">
                                                        <Label className="flex items-center gap-2 text-sm font-semibold text-black">
                                                            <MapPin className="h-4 w-4 text-sky-600" />
                                                            Location *
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="location"
                                                            value={input.location}
                                                            onChange={changeEventHandler}
                                                            placeholder="City, Country"
                                                            className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 text-black placeholder:text-slate-500 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-sky-400"
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-sm font-semibold text-black">ORCID iD (optional)</Label>
                                                        <Input
                                                            type="text"
                                                            name="orcidId"
                                                            value={input.orcidId}
                                                            onChange={changeEventHandler}
                                                            placeholder="0000-0000-0000-0000"
                                                            className="h-12 rounded-2xl border-slate-300 bg-slate-50 px-4 font-mono text-black placeholder:text-slate-500 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-sky-400"
                                                        />
                                                        <p className="text-xs text-slate-700">
                                                            Need one? Visit{' '}
                                                            <a
                                                                href="https://orcid.org/register"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-semibold text-sky-600 hover:text-sky-700"
                                                            >
                                                                orcid.org
                                                            </a>
                                                            .
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-semibold text-black">
                                                        Qualifications <span className="text-sky-600">({input.qualifications.length})</span>
                                                    </p>
                                                    <p className="text-sm text-slate-700">Highlight your degrees and certifications.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addQualification}
                                                    className="gap-2 rounded-xl border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300 hover:bg-sky-500/20"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add qualification
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {input.qualifications.map((qual, idx) => (
                                                    <div
                                                        key={`qual-${idx}`}
                                                        className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4"
                                                    >
                                                        <div className="grid gap-4 md:grid-cols-3">
                                                            <Input
                                                                placeholder="Degree / Certification"
                                                                value={qual.title}
                                                                onChange={(e) => updateQualification(idx, 'title', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Institution"
                                                                value={qual.institution}
                                                                onChange={(e) => updateQualification(idx, 'institution', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Year (e.g., 2025)"
                                                                value={qual.year}
                                                                onChange={(e) => updateQualification(idx, 'year', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => removeQualification(idx)}
                                                            className="mt-3 w-full justify-center gap-2 rounded-xl text-rose-200 hover:bg-rose-500/10 hover:text-rose-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove entry
                                                        </Button>
                                                    </div>
                                                ))}
                                                {input.qualifications.length === 0 && (
                                                    <p className="text-sm text-slate-300">Add at least one qualification to continue.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-semibold text-white">
                                                        Research areas <span className="text-sky-300">({input.researchAreas.length})</span>
                                                    </p>
                                                    <p className="text-sm text-slate-300">Share the domains you specialise in.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addResearchArea}
                                                    className="gap-2 rounded-xl border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300 hover:bg-sky-500/20"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add area
                                                </Button>
                                            </div>

                                            <div className="space-y-3">
                                                {input.researchAreas.map((area, idx) => (
                                                    <div key={`area-${idx}`} className="flex gap-3">
                                                        <Input
                                                            placeholder="e.g., Machine Learning"
                                                            value={area}
                                                            onChange={(e) => updateResearchArea(idx, e.target.value)}
                                                            className="h-11 flex-1 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => removeResearchArea(idx)}
                                                            className="h-11 w-11 justify-center rounded-xl border border-transparent text-rose-200 hover:border-rose-300 hover:bg-rose-500/10 hover:text-rose-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                {input.researchAreas.length === 0 && (
                                                    <p className="text-sm text-slate-700">Add at least one research area to showcase expertise.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-semibold text-black">
                                                        Experience <span className="text-sky-600">({input.experience.length})</span>
                                                    </p>
                                                    <p className="text-sm text-slate-700">Outline roles, projects, and impact.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addExperience}
                                                    className="gap-2 rounded-xl border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300 hover:bg-sky-500/20"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add experience
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {input.experience.map((exp, idx) => (
                                                    <div
                                                        key={`exp-${idx}`}
                                                        className="space-y-4 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4"
                                                    >
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <Input
                                                                placeholder="Role / Title"
                                                                value={exp.title}
                                                                onChange={(e) => updateExperience(idx, 'title', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Organisation"
                                                                value={exp.company}
                                                                onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                        </div>
                                                        <Input
                                                            placeholder="Duration (e.g., Jan 2023 – Dec 2024)"
                                                            value={exp.duration}
                                                            onChange={(e) => updateExperience(idx, 'duration', e.target.value)}
                                                            className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                        />
                                                        <textarea
                                                            placeholder="Describe your responsibilities, outcomes, and highlights..."
                                                            value={exp.description}
                                                            onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                                                            rows={4}
                                                            className="min-h-[120px] w-full rounded-2xl border-sky-400/30 bg-sky-500/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => removeExperience(idx)}
                                                            className="w-full justify-center gap-2 rounded-xl text-rose-200 hover:bg-rose-500/10 hover:text-rose-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove experience
                                                        </Button>
                                                    </div>
                                                ))}
                                                {input.experience.length === 0 && (
                                                    <p className="text-sm text-slate-300">
                                                        Share at least one professional experience to elevate your profile.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-semibold text-black">
                                                        Publications <span className="text-sky-600">({input.publications.length})</span>
                                                    </p>
                                                    <p className="text-sm text-slate-700">Spotlight the work that made headlines.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addPublication}
                                                    className="gap-2 rounded-xl border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300 hover:bg-sky-500/20"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add publication
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {input.publications.map((pub, idx) => (
                                                    <div
                                                        key={`pub-${idx}`}
                                                        className="space-y-4 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4"
                                                    >
                                                        <Input
                                                            placeholder="Publication title"
                                                            value={pub.title}
                                                            onChange={(e) => updatePublication(idx, 'title', e.target.value)}
                                                            className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                        />
                                                        <div className="grid gap-4 md:grid-cols-3">
                                                            <Input
                                                                placeholder="Journal / Conference"
                                                                value={pub.journal}
                                                                onChange={(e) => updatePublication(idx, 'journal', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Year (e.g., 2024)"
                                                                value={pub.year}
                                                                onChange={(e) => updatePublication(idx, 'year', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Paper link (URL)"
                                                                value={pub.link}
                                                                onChange={(e) => updatePublication(idx, 'link', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                        </div>
                                                        <textarea
                                                            placeholder="Authors (e.g., You, Collaborator et al.)"
                                                            value={pub.authors}
                                                            onChange={(e) => updatePublication(idx, 'authors', e.target.value)}
                                                            rows={3}
                                                            className="min-h-[100px] w-full rounded-2xl border-sky-400/30 bg-sky-500/10 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => removePublication(idx)}
                                                            className="w-full justify-center gap-2 rounded-xl text-rose-200 hover:bg-rose-500/10 hover:text-rose-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove publication
                                                        </Button>
                                                    </div>
                                                ))}
                                                {input.publications.length === 0 && (
                                                    <p className="text-sm text-slate-700">
                                                        Add at least one publication to highlight your research impact.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-6 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-semibold text-black">
                                                        Courses taught <span className="text-sky-600">({input.coursesTaught.length})</span>
                                                    </p>
                                                    <p className="text-sm text-slate-700">Showcase the classes you lead and mentor.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addCourse}
                                                    className="gap-2 rounded-xl border-sky-400/40 bg-sky-500/10 text-sky-100 hover:border-sky-300 hover:bg-sky-500/20"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Add course
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {input.coursesTaught.map((course, idx) => (
                                                    <div
                                                        key={`course-${idx}`}
                                                        className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4"
                                                    >
                                                        <div className="grid gap-4 md:grid-cols-3">
                                                            <Input
                                                                placeholder="Course name"
                                                                value={course.name}
                                                                onChange={(e) => updateCourse(idx, 'name', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Number of students"
                                                                type="number"
                                                                value={course.students}
                                                                onChange={(e) => updateCourse(idx, 'students', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                            <Input
                                                                placeholder="Rating (0 - 5)"
                                                                type="number"
                                                                step="0.1"
                                                                min="0"
                                                                max="5"
                                                                value={course.rating}
                                                                onChange={(e) => updateCourse(idx, 'rating', e.target.value)}
                                                                className="h-11 rounded-xl border-sky-400/30 bg-sky-500/10 px-4 text-slate-100 placeholder:text-slate-300 focus:border-sky-400 focus:bg-sky-500/15 focus:ring-2 focus:ring-sky-300"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => removeCourse(idx)}
                                                            className="mt-3 w-full justify-center gap-2 rounded-xl text-rose-200 hover:bg-rose-500/10 hover:text-rose-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove course
                                                        </Button>
                                                    </div>
                                                ))}
                                                {input.coursesTaught.length === 0 && (
                                                    <p className="text-sm text-slate-700">
                                                        Add at least one course to demonstrate your teaching experience.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-section-soft space-y-4 rounded-3xl border border-slate-300 bg-white p-6">
                                            <div className="flex items-center gap-3">
                                                <Video className="h-5 w-5 text-sky-600" />
                                                <div>
                                                    <p className="text-lg font-semibold text-black">Demo lecture video (optional)</p>
                                                    <p className="text-sm text-slate-700">
                                                        Add a short clip to give recruiters a front-row seat to your teaching style.
                                                    </p>
                                                </div>
                                            </div>
                                            <label className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-sky-400 hover:bg-sky-50/40">
                                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                                                    <Video className="h-5 w-5" />
                                                </span>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-black">Upload demo video</p>
                                                    <p className="text-xs text-slate-700">MP4, WebM, or Ogg up to 50MB</p>
                                                </div>
                                                {input.demoVideo ? (
                                                    <p className="text-xs text-sky-600">{input.demoVideo.name}</p>
                                                ) : null}
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => setInput((prev) => ({ ...prev, demoVideo: e.target.files?.[0] ?? null }))}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="auth-divider" />

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Link to="/login" className="flex-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full justify-center rounded-2xl border-slate-300 bg-white text-black transition hover:border-sky-400 hover:bg-sky-50"
                                        >
                                            Already have an account? Log in
                                        </Button>
                                    </Link>
                                    {loading ? (
                                        <Button
                                            type="button"
                                            disabled
                                            className="btn-shimmer flex-1 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 py-3 text-base font-semibold text-white shadow-[0_18px_90px_rgba(56,189,248,0.35)]"
                                        >
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Creating account...
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="flex-1 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 py-4 text-lg font-semibold text-white shadow-[0_20px_100px_rgba(56,189,248,0.4)] transition-all duration-300 hover:shadow-[0_30px_140px_rgba(56,189,248,0.6)] card-3d hover:scale-105 active:scale-95"
                                        >
                                            Launch my profile
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Signup;
