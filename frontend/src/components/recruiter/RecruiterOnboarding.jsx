import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight, Briefcase, FileText, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const RecruiterOnboarding = ({ isOpen, onClose, user }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: '👋 Welcome to Your Recruiter Dashboard!',
            description: 'We\'re excited to have you on board. Let\'s get you up and running in just a few steps.',
            icon: Briefcase,
        },
        {
            title: '🏢 Your Company Profile',
            description: 'Your company has been set up. You can view and edit all company details from your profile page. This is where candidates will learn about your organization.',
            action: 'Your company is ready to go!',
            icon: Briefcase,
        },
        {
            title: '📝 Post Your First Job',
            description: 'Head to the Jobs page to create your first job opening. Add details like job title, description, requirements, and location. Make it attractive for top talent!',
            action: 'Click "Jobs" in the menu and start posting →',
            highlight: 'Jobs',
            icon: FileText,
        },
        {
            title: '👥 Find the Perfect Candidates',
            description: 'Browse through candidate profiles, review their qualifications, experience, and publications. Find the best fit for your team.',
            action: 'Start exploring candidates →',
            highlight: 'Browse',
            icon: Users,
        },
        {
            title: '✨ You\'re All Set!',
            description: 'You now have everything you need to post jobs and hire amazing candidates. Let\'s build great teams together!',
            action: 'Let\'s get started',
            icon: CheckCircle2,
        }
    ];

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Mark first login as complete
            try {
                await axios.post(`${USER_API_END_POINT}/markFirstLoginComplete`, {}, { 
                    withCredentials: true 
                });
                onClose();
            } catch (error) {
                console.error('Error marking first login complete:', error);
                onClose();
            }
        }
    };

    const handleSkip = async () => {
        try {
            await axios.post(`${USER_API_END_POINT}/markFirstLoginComplete`, {}, { 
                withCredentials: true 
            });
            onClose();
        } catch (error) {
            console.error('Error marking first login complete:', error);
            onClose();
        }
    };

    const CurrentStepIcon = steps[currentStep].icon;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-gradient-to-b from-white to-blue-50 border-sky-300/50">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-slate-900">
                        Welcome, {user?.fullname?.split(' ')[0]}! 🎉
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 py-6">
                    {/* Progress Indicator */}
                    <div className="flex justify-between items-center px-2">
                        {steps.map((_, idx) => (
                            <div key={idx} className="flex items-center flex-1">
                                <div
                                    className={`h-2 flex-1 rounded-full transition-all ${
                                        idx <= currentStep
                                            ? 'bg-gradient-to-r from-sky-400 to-blue-500'
                                            : 'bg-slate-200'
                                    }`}
                                />
                                {idx < steps.length - 1 && <div className="w-1" />}
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="space-y-6 text-center px-4">
                        <div className="flex justify-center">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                                <CurrentStepIcon className="h-10 w-10 text-sky-600" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-900">
                                {steps[currentStep].title}
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed max-w-lg mx-auto">
                                {steps[currentStep].description}
                            </p>
                            {steps[currentStep].action && (
                                <p className="text-sky-600 font-semibold mt-4">
                                    {steps[currentStep].action}
                                </p>
                            )}
                        </div>

                        {/* Step counter */}
                        <div className="text-sm text-slate-500 font-medium">
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center pt-4">
                        <Button
                            onClick={handleSkip}
                            variant="outline"
                            className="rounded-2xl border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                            Skip Tour
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all px-8"
                        >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecruiterOnboarding;
