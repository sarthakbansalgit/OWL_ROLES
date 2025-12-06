import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [companyRefreshTrigger, setCompanyRefreshTrigger] = useState(0);
    
    // Function to trigger a refresh
    const refreshCompanies = () => {
        setCompanyRefreshTrigger(prev => prev + 1);
    };
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
                // console.log(res);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [companyRefreshTrigger, dispatch]); 
    
    return { refreshCompanies };
}

export default useGetAllCompanies