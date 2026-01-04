import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(()=>{
        // Clear jobs when user logs out
        if (!user || !user._id) {
            dispatch(setAllAdminJobs([]));
            return;
        }
        
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs?t=${Date.now()}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    dispatch(setAllAdminJobs([]));
                }
            } catch (error) {
                console.log(error);
                dispatch(setAllAdminJobs([]));
            }
        }
        fetchAllAdminJobs();
    }, [user?._id, dispatch])
}

export default useGetAllAdminJobs