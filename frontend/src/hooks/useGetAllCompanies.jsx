import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [companyRefreshTrigger, setCompanyRefreshTrigger] = useState(0);
    const { user } = useSelector(store => store.auth);
    
    // Function to trigger a refresh
    const refreshCompanies = () => {
        setCompanyRefreshTrigger(prev => prev + 1);
    };
    
    useEffect(() => {
        // Always fetch companies when user changes or component mounts
        if (!user || !user._id) {
            // User is not logged in, clear companies
            dispatch(setCompanies([]));
            return;
        }

        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get?t=${Date.now()}`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                } else {
                    dispatch(setCompanies([]));
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
                // On error, clear companies to prevent showing stale data
                dispatch(setCompanies([]));
            }
        }
        
        fetchCompanies();
    }, [user?._id, dispatch, companyRefreshTrigger]); 
    
    return { refreshCompanies };
}

export default useGetAllCompanies