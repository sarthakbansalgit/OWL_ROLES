import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react'; // Using Lucide icon instead of image
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user){
            navigate('/login');
            return;
        }
        
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { userId: user?._id },
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Application failed');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    {
                        withCredentials: true
                    }
                );
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => 
                        app.applicant === user?._id
                    ));
                }
            } catch (error) {
                toast.error('Failed to load job details');
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
        <Navbar/>
        <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 min-h-screen py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 py-6 md:py-12 space-y-6 md:space-y-8">
                {/* Header Section */}
                <div className="space-y-3 md:space-y-4">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="gap-2 px-0 hover:bg-transparent text-gray-600 text-sm md:text-base"
                    >
                        <ArrowLeft className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                        <span className="font-medium">Back to Jobs</span>
                    </Button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-lg md:rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100">
                        <div className="space-y-2 flex-1 w-full">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                                {singleJob?.title}
                            </h1>
                            <p className="text-sm md:text-base text-gray-600 font-medium">{singleJob?.company?.name}</p>
                            <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
                                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 text-xs md:text-sm">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs md:text-sm">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 text-xs md:text-sm">
                                    ₹{singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={applyJobHandler}
                            disabled={isApplied}
                            className={`w-full md:w-auto text-sm md:text-base px-6 md:px-8 py-3 md:py-6 rounded-xl transition-all ${
                                isApplied 
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white shadow-lg'
                            }`}
                        >
                            {isApplied ? '✓ Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>

                {/* Job Details Grid */}
                <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                        📋 Job Details
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200">
                            <p className="text-xs md:text-sm text-gray-600 font-medium">Location</p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900 mt-1">{singleJob?.location || 'N/A'}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200">
                            <p className="text-xs md:text-sm text-gray-600 font-medium">Experience</p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900 mt-1">{singleJob?.experienceLevel || 'Not specified'} yrs</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200">
                            <p className="text-xs md:text-sm text-gray-600 font-medium">Posted</p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900 mt-1">{new Date(singleJob?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 md:p-4 rounded-lg md:rounded-xl border border-green-200">
                            <p className="text-xs md:text-sm text-gray-600 font-medium">Applicants</p>
                            <p className="text-sm md:text-lg font-semibold text-gray-900 mt-1">{singleJob?.applications?.length || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                        📝 Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                        {singleJob?.description}
                    </p>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 shadow-lg border border-blue-100">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                        ✅ Requirements
                    </h2>
                    {singleJob?.requirements && singleJob.requirements.length > 0 ? (
                        <ul className="space-y-2 md:space-y-3">
                            {(Array.isArray(singleJob.requirements) ? singleJob.requirements : singleJob.requirements.split(',')).map((req, idx) => (
                                <li key={idx} className="text-gray-700 flex items-center gap-3 text-sm md:text-base lg:text-lg">
                                    <span className='text-blue-600 font-bold'>•</span>
                                    {req.trim()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm md:text-base">No specific requirements listed</p>
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

// Reusable detail component
const DetailItem = ({ label, value }) => (
    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <span className="font-medium">{label}</span>
        <span className="text-foreground">{value}</span>
    </div>
);

export default JobDescription;