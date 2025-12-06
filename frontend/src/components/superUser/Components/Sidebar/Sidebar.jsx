import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';

function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.success("Logout Successful!");
        }
    }
    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/supreme" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none font-bold">Admin Dashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/supreme" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/supreme/applicants" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Applicant
                        </li>
                    </Link>
                    <Link to="/supreme/recruiters" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Recruiter
                        </li>
                    </Link>

                    <Link to="/supreme/Companies" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Companies
                        </li>
                    </Link>
            
                    <p className="spann">Seetings</p>

                    <li className='hover:bg-transparent'>
                        <Button  onClick={logoutHandler}><LogoutIcon className="icon" /> Log Out</Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
