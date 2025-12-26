import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setAllApplicants } from '@/redux/applicationSlice';
import CandidateProfileModal from './CandidateProfileModal';

const shortlistingStatus = ["Accepted", "Rejected", "pending"];

const ApplicantsTable = ({ triggerRefresh }) => {
    const { applicants } = useSelector(store => store.application);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.patch(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log("Status update response:", res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                
                // Direct update to Redux state for immediate UI feedback
                const updatedApplicants = {
                    ...applicants,
                    applications: applicants.applications.map(app => 
                        app._id === id ? { ...app, status } : app
                    )
                };
                
                dispatch(setAllApplicants(updatedApplicants));
                
                triggerRefresh();
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Status update error:", error);
        }
    }

    const handleStatusChange = (status, id) => {
        statusHandler(status, id);
    }

    const openProfileModal = (applicant) => {
        setSelectedApplicant(applicant);
        setIsModalOpen(true);
    }

    const deleteApplicationHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${APPLICATION_API_END_POINT}/delete/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                triggerRefresh();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
    const viewCandidateProfileHandler = (userId) => {
        navigate(`/view-user-profile/${userId}`);
    }

    return (
        <div className='border-2 p-6 rounded-sm border-zinc-300'>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell> 
                                    <span 
                                        className={`p-3 rounded-md text-sm ${
                                        item?.status === "accepted" 
                                            ? "bg-green-100 text-green-800" 
                                            : item?.status === "rejected" 
                                            ? "bg-red-100 text-red-800" 
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        {item?.status}
                                    </span>
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openProfileModal(item)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-[0_10px_40px_rgba(56,189,248,0.4)] transition-all font-semibold text-sm card-3d hover:scale-105 active:scale-95"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Show Profile</span>
                                        </button>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-56 p-3 space-y-2">
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div 
                                                                onClick={() => statusHandler(status, item?._id)} 
                                                                key={index} 
                                                                className={`flex w-auto items-center cursor-pointer bg-stone-300 text-sm text-left hover:bg-zinc-400 rounded-lg hover:text-black p-2 transition-all ${
                                                                    item?.status === status ? 'border-2 border-blue-500 font-semibold' : ''
                                                                }`}
                                                            >
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <hr className='m-3'/>
                                                <Button 
                                                    onClick={() => deleteApplicationHandler(item?._id)} 
                                                    sx={{
                                                        color: '#dc2626', 
                                                        fontSize: '0.875rem', 
                                                        textAlign: 'left', 
                                                        width: '100%', 
                                                        '&:hover': {
                                                        backgroundColor: '#fca5a5', 
                                                        color: '#000000',
                                                        },
                                                        borderRadius: '0.5rem',
                                                        padding: '0.5rem',
                                                        cursor: 'pointer', 
                                                        justifyContent: 'flex-start', 
                                                    }}
                                                    >
                                                    Delete Application
                                                </Button>   
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>

            {/* Candidate Profile Modal */}
            <CandidateProfileModal 
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                applicant={selectedApplicant}
                onStatusChange={handleStatusChange}
            />
        </div>
    )
}

export default ApplicantsTable