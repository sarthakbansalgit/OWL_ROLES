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
        <div className="rounded-lg md:rounded-2xl border border-gray-100 shadow-lg bg-white overflow-hidden">
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
                <Table>
                    <TableHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
                        <TableRow className="hover:bg-purple-50">
                            <TableHead className="w-[220px] text-gray-700 font-bold">Company</TableHead>
                            <TableHead className="min-w-[280px] text-gray-700 font-bold">Job Title</TableHead>
                            <TableHead className="w-[140px] text-gray-700 font-bold">Posted Date</TableHead>
                            <TableHead className="text-right w-[140px] text-gray-700 font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filterJobs?.map((job) => (
                            <TableRow 
                                key={job._id}
                                className="group hover:bg-purple-50 transition-colors border-b border-gray-100"
                            >
                                <TableCell className="font-semibold text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border-2 border-purple-200">
                                            <AvatarImage src={job.company?.logo} />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold text-sm">
                                                {job.company?.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className='truncate'>{job.company?.name}</span>
                                    </div>
                                </TableCell>
                                
                                <TableCell className="text-gray-900 font-medium">
                                    <div className='flex items-center gap-2'>
                                        <span className='inline-block w-2 h-2 rounded-full bg-purple-500'></span>
                                        {job.title}
                                    </div>
                                </TableCell>
                                
                                <TableCell className="text-gray-600 text-sm">
                                    {formatDate(job.createdAt)}
                                </TableCell>
                                
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-2 hover:bg-purple-100 rounded-full transition">
                                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                        </PopoverTrigger>
                                        
                                        <PopoverContent 
                                            className="w-48 p-2 rounded-xl shadow-xl border border-purple-200 bg-white"
                                            align="end"
                                        >
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Applicants</span>
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            <div className='md:hidden space-y-3 p-4'>
                {filterJobs?.map((job) => (
                    <div key={job._id} className='bg-white border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow'>
                        <div className='flex items-center justify-between mb-3'>
                            <div className='flex items-center gap-2 flex-1'>
                                <Avatar className='w-8 h-8 border-2 border-purple-200 flex-shrink-0'>
                                    <AvatarImage src={job.company?.logo} />
                                    <AvatarFallback className='bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold text-xs'>
                                        {job.company?.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-gray-900 text-sm truncate'>{job.company?.name}</p>
                                    <p className='text-xs text-gray-500'>{formatDate(job.createdAt)}</p>
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className='p-2 hover:bg-purple-100 rounded-full flex-shrink-0'>
                                    <MoreHorizontal className='w-4 h-4 text-gray-600' />
                                </PopoverTrigger>
                                <PopoverContent className='w-40 p-2 rounded-lg shadow-lg border border-purple-200'>
                                    <div className='space-y-1'>
                                        <button onClick={() => navigate(`/admin/jobs/edit/${job._id}`)} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-blue-50 text-blue-600 font-medium'>
                                            <Edit2 className='w-3 h-3' /> Edit
                                        </button>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-purple-50 text-purple-600 font-medium'>
                                            <Eye className='w-3 h-3' /> Applicants
                                        </button>
                                        <button onClick={() => handleDeleteJob(job._id)} className='w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-red-50 text-red-600 font-medium'>
                                            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <h3 className='font-semibold text-gray-900 text-sm line-clamp-2'>{job.title}</h3>
                    </div>
                ))}
            </div>

            {filterJobs.length === 0 && (
                <div className="p-12 text-center">
                    <p className='text-gray-500 text-base mb-2'>📋 {searchJobByText ? "No jobs found" : "No jobs posted yet"}</p>
                    <p className='text-gray-400 text-sm'>Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    )
}

export default AdminJobsTable