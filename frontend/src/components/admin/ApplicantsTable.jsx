import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setAllApplicants } from '@/redux/applicationSlice';

const shortlistingStatus = ["Accepted", "Rejected", "pending"];

const ApplicantsTable = ({ triggerRefresh }) => {
    const { applicants } = useSelector(store => store.application);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-52">
                                            {/* <Button 
                                                onClick={() => viewCandidateProfileHandler(item?.applicant?._id)} 
                                                className='bg-neutral-200 text-black text-sm text-left w-full hover:bg-zinc-400 rounded-sm hover:text-black p-2 cursor-pointer mb-2'
                                            >
                                                View Candidate Profile
                                            </Button> */}
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div 
                                                            onClick={() => statusHandler(status, item?._id)} 
                                                            key={index} 
                                                            className={`flex w-auto items-center my-2 mx-2 cursor-pointer bg-stone-300 text-sm text-left hover:bg-zinc-400 rounded-sm hover:text-black p-2 ${
                                                                item?.status === status ? 'border-2 border-blue-500' : ''
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
                                                    borderRadius: '0.125rem',
                                                    padding: '0.5rem',
                                                    cursor: 'pointer', 
                                                    justifyContent: 'flex-start', 
                                                }}
                                                >
                                                Delete Application
                                            </Button>   
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable