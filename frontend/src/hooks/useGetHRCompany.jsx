import { setCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetHRCompany = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        // Clear company when user logs out
        if (!user || !user._id) {
            dispatch(setCompany(null));
            return;
        }
        
        const fetchHRCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get?t=${Date.now()}`, {
                    withCredentials: true
                });
                if (res.data.success && res.data.companies?.length > 0) {
                    // Get the first (and only) company for this HR
                    dispatch(setCompany(res.data.companies[0]));
                } else {
                    dispatch(setCompany(null));
                }
            } catch (error) {
                console.log(error);
                dispatch(setCompany(null));
            }
        }
        
        fetchHRCompany();
    }, [user?._id, dispatch])
}

export default useGetHRCompany
