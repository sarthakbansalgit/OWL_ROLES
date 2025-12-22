import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ShieldCheck, BriefcaseBusiness, Globe2, Bot } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import animeEmoji from '/public/anime-emoji.gif';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const [popupClass, setPopupClass] = useState('hidden');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const showTimer = setTimeout(() => setPopupClass('visible'), 1000);
        const hideTimer = setTimeout(() => setPopupClass('hidden'), 5200);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    const featureTiles = useMemo(
        () => [
            {
                icon: ShieldCheck,
                title: 'Secure hiring hub',
                description: 'Enterprise-grade protection keeps every application safe, verified, and traceable.',
            },
            {
                icon: Bot,
                title: 'AI talent rituals',
                description: 'Context-aware match making reveals the most relevant roles in real time.',
            },
            {
                icon: BriefcaseBusiness,
                title: 'Immersive workflows',
                description: 'Curate cinematic candidate journeys, complete with analytics, nudges, and insights.',
            },
            {
                icon: Globe2,
                title: 'Global resonance',
                description: 'Tap into 120+ countries of researchers, creators, and teams ready to collaborate.',
            },
        ],
        [],
    );

    const statPills = useMemo(
        () => [
            { label: 'Professionals onboarded', value: '30K+' },
            { label: 'Roles posted monthly', value: '4.2K' },
            { label: 'Avg. match time', value: '3 days' },
        ],
        [],
    );

    return (
        <section className="relative flex min-h-[calc(100vh-90px)] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-100 px-4 py-16 text-slate-800 sm:px-6 lg:px-10">
            <div className={`popup ${popupClass}`}>
                <p className="m-0 text-sm font-medium text-slate-700">Hello, welcome to Owl Roles!</p>
                <div className="flex h-9 w-9 items-center justify-center">
                    <img className="h-9 w-9 rounded-full" src={animeEmoji} alt="Welcome" />
                </div>
            </div>

            {/* Ambient layers */}
            <motion.div
                className="hero-aurora-layer"
                animate={{ opacity: [0.35, 0.55, 0.4] }}
                transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
            />
            <motion.div
                className="hero-aurora-layer hero-aurora-layer--secondary"
                animate={{ opacity: [0.25, 0.5, 0.3], rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
            />
            <div className="hero-gridlines" />

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
                <div className="flex flex-1 flex-col gap-8 text-left">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 shadow-sm">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Elevate your search
                    </div>
                    <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                        Step into an <span className="hero-text-shimmer">immersive hiring universe</span> crafted for ambitious minds
                    </h1>
                    <p className="max-w-xl text-base text-slate-600 sm:text-lg">
                        Orchestrate cinematic onboarding flows, collaborate with global talent, and make confident hiring decisions with real-time analytics and curated recommendations.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="search-shell">
                            <Search className="h-5 w-5 flex-shrink-0 text-blue-500" />
                            <input
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') searchJobHandler();
                                }}
                                placeholder="Search roles, institutions, or keywords"
                                className="hero-search-input"
                                aria-label="Search for jobs"
                            />
                            <Button
                                variant="default"
                                onClick={searchJobHandler}
                                className="hero-search-button rounded-full"
                                type="button"
                            >
                                <span>Discover roles</span>
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {statPills.map((pill) => (
                                <div key={pill.label} className="hero-stat-pill">
                                    <span className="text-base font-semibold text-slate-900">{pill.value}</span>
                                    <span className="text-xs text-slate-600">{pill.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {featureTiles.map(({ icon: Icon, title, description }, index) => (
                            <div key={title} className="tilt-card">
                                <motion.div
                                    className="tilt-card-inner"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
                                >
                                    <span className="tilt-card-icon">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                        <p className="text-sm text-slate-600">{description}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        className="hero-spotlight"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-500">Dynamic dashboard</p>
                            <h4 className="text-lg font-semibold text-slate-900">Interactive analytics that glow with every milestone reached.</h4>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                                <Sparkles className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="text-sm">
                                Set goals, measure traction, and keep your pipelines radiant without leaving the launchpad.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;