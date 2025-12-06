import React from 'react'; 
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllAppliedJobs } from '@/redux/jobSlice'; 
import { toast } from 'sonner';

const AppliedJobTable = () => {
    const dispatch = useDispatch(); 
    const { allAppliedJobs = [] } = useSelector(store => store.job || {});

    const handleWithdraw = async (id) => {
        try {
            const response = await fetch(`${APPLICATION_API_END_POINT}/withdraw/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            }); 

            if (!response.ok) {
                throw new Error('Failed to withdraw application');
            }

            toast.success('Application withdrawn successfully!');

            const updatedAppliedJobs = allAppliedJobs.filter(job => job._id !== id);
            dispatch(setAllAppliedJobs(updatedAppliedJobs));


        } catch (err) {
            console.error(err.message); 
            alert(`Error: ${err.message}`); 
        }
    };
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <span>You haven't applied for any jobs yet.</span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title || "N/A"}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        className='text-black' 
                                        onClick={() => handleWithdraw(appliedJob._id)} 
                                    >
                                        Withdraw Application
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
