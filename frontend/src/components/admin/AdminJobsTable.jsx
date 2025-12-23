import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter(job => {
            if (!searchJobByText) return true
            const search = searchJobByText.toLowerCase()
            return (
                job?.title?.toLowerCase().includes(search) ||
                job?.company?.name.toLowerCase().includes(search)
            )
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
    
        try {
            const res = await fetch(`${JOB_API_END_POINT}/delete/${jobId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete job.");
            }
    
            // Optionally show a toast or message
            // alert("Job deleted successfully.");
            toast.success("Job deleted successfully!")

            setFilterJobs(prev => prev.filter(job => job._id !== jobId));
        } catch (error) {
            console.error("Failed to delete job:", error);
            alert(error.message || "Error deleting job.");
        }
    };
    
    

    return (
        <div className="rounded-3xl border border-sky-300/50 shadow-2xl bg-white/95 overflow-hidden card-3d scale-in backdrop-blur-xl">
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
                <Table>
                    <TableHeader className="bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 border-b-2 border-sky-300/60">
                        <TableRow className="hover:bg-sky-50">
                            <TableHead className="w-[240px] text-slate-700 font-bold text-sm">Company</TableHead>
                            <TableHead className="min-w-[300px] text-slate-700 font-bold text-sm">Job Title</TableHead>
                            <TableHead className="w-[140px] text-slate-700 font-bold text-sm">Posted Date</TableHead>
                            <TableHead className="text-right w-[140px] text-slate-700 font-bold text-sm">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filterJobs?.map((job, idx) => (
                            <TableRow 
                                key={job._id}
                                className={`group hover:bg-sky-50/80 transition-all duration-300 border-b border-sky-200/50 hover:border-sky-300 stagger-item-${(idx % 5) + 1} slide-in-up`}
                            >
                                <TableCell className="font-bold text-slate-900">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12 border-3 border-sky-300/60 card-3d group-hover:scale-110 transition-transform">
                                            <AvatarImage src={job.company?.logo} className="object-cover" />
                                            <AvatarFallback className="bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 font-bold text-sm">
                                                {job.company?.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className='truncate text-base'>{job.company?.name}</span>
                                    </div>
                                </TableCell>
                                
                                <TableCell className="text-slate-900 font-semibold text-base">
                                    <div className='flex items-center gap-2'>
                                        <span className='inline-block w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-500'></span>
                                        {job.title}
                                    </div>
                                </TableCell>
                                
                                <TableCell className="text-slate-600 text-sm font-semibold">
                                    {formatDate(job.createdAt)}
                                </TableCell>
                                
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-2 hover:bg-sky-200 rounded-full transition card-3d hover:scale-110">
                                            <MoreHorizontal className="w-5 h-5 text-slate-600 group-hover:text-sky-600 transition-colors" />
                                        </PopoverTrigger>
                                        
                                        <PopoverContent 
                                            className="w-52 p-3 rounded-xl shadow-2xl border border-sky-300/60 bg-white"
                                            align="end"
                                        >
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-[0_10px_40px_rgba(56,189,248,0.4)] transition-all font-semibold text-sm card-3d hover:scale-105 active:scale-95"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span>Edit Job</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] transition-all font-semibold text-sm card-3d hover:scale-105 active:scale-95"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>View Applicants</span>
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white hover:shadow-[0_10px_40px_rgba(239,68,68,0.4)] transition-all font-semibold text-sm card-3d hover:scale-105 active:scale-95"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className='md:hidden space-y-4 p-5'>
                {filterJobs?.map((job, idx) => (
                    <div key={job._id} className={`bg-gradient-to-br from-white to-sky-50/50 border border-sky-300/50 rounded-2xl p-5 hover:shadow-xl transition-all card-3d stagger-item-${(idx % 3) + 1} slide-in-up hover:border-sky-400`}>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-3 flex-1'>
                                <Avatar className='w-12 h-12 border-3 border-sky-300/60 card-3d flex-shrink-0'>
                                    <AvatarImage src={job.company?.logo} className="object-cover" />
                                    <AvatarFallback className='bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 font-bold text-sm'>
                                        {job.company?.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex-1 min-w-0'>
                                    <p className='font-bold text-slate-900 text-sm truncate'>{job.company?.name}</p>
                                    <p className='text-xs text-slate-500 font-semibold'>{formatDate(job.createdAt)}</p>
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className='p-2 hover:bg-sky-200 rounded-full flex-shrink-0 card-3d'>
                                    <MoreHorizontal className='w-5 h-5 text-slate-600' />
                                </PopoverTrigger>
                                <PopoverContent className='w-48 p-2 rounded-xl shadow-xl border border-sky-300/60'>
                                    <div className='space-y-2'>
                                        <button onClick={() => navigate(`/admin/jobs/edit/${job._id}`)} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <Edit2 className='w-4 h-4' /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <Eye className='w-4 h-4' /> Applicants
                                        </button>
                                        <button onClick={() => handleDeleteJob(job._id)} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold card-3d hover:scale-105 active:scale-95'>
                                            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <h3 className='font-bold text-slate-900 text-sm line-clamp-2'>{job.title}</h3>
                    </div>
                ))}
            </div>

            {filterJobs.length === 0 && (
                <div className="p-16 text-center slide-in-down">
                    <p className='text-slate-600 text-lg font-bold mb-2'>📋 {searchJobByText ? "No jobs found" : "No jobs posted yet"}</p>
                    <p className='text-slate-400 text-base'>Try adjusting your search criteria or post a new job</p>
                </div>
            )}
        </div>
    )
}

export default AdminJobsTable