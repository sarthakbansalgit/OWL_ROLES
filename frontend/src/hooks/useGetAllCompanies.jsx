import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [companyRefreshTrigger, setCompanyRefreshTrigger] = useState(0);
    const { user } = useSelector(store => store.auth); // Listen to user changes
    
    // Function to trigger a refresh
    const refreshCompanies = () => {
        setCompanyRefreshTrigger(prev => prev + 1);
    };
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get?t=${Date.now()}`, {withCredentials:true});
                // console.log(res);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
                // If error, clear companies
                dispatch(setCompanies([]));
            }
        }
        fetchCompanies();
    }, [companyRefreshTrigger, dispatch, user]); // Added user as dependency 
    
    return { refreshCompanies };
}

export default useGetAllCompanies