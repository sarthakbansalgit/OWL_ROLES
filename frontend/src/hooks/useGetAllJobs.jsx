import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        // Clear jobs when user logs out
        if (!user || !user._id) {
            dispatch(setAllJobs([]));
            return;
        }
        
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?t=${Date.now()}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
                dispatch(setAllJobs([]));
            }
        };
        
        fetchAllJobs();
    }, [user?._id, dispatch]);
    
}

export default useGetAllJobs