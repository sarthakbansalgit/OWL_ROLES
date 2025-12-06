import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Contact, Mail } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const ViewUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${USER_API_END_POINT}/profile/${userId}`, { withCredentials: true });
                if (res.data.success) {
                    console.log("User details fetched")
                } else {
                    toast.error("Failed to fetch user profile");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching user profile");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="max-w-4xl mx-auto my-10 text-center">
                    <p>Loading user profile...</p>
                </div>
            </div>
        );
    }

    // if (!user) {
    //     return (
    //         <div>
    //             <Navbar />
    //             <div className="max-w-4xl mx-auto my-10 text-center">
    //                 <p>User profile not found</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.profile?.profilePhoto || "/src/assets/user.png"} alt="profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills && user?.profile?.skills.length !== 0 
                                ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) 
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='w-full max-w-sm items-center gap-1.5 mt-6'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume 
                            ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer ml-2'>{user?.profile?.resumeOriginalName}</a> 
                            : <span>NA</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewUserProfile