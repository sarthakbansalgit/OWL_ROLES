import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './components/adminHome/adminHome';
import Orders from './Components/Orders/Orders';
import AddNew from './Pages/AddNew/AddNew';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import Lists from './Pages/UserLists/UserLists';

import './app.scss';

const userInpDetails = [
    { id: 1, name: 'username', label: 'Username', type: 'text', placeholder: 'John23', required: true, pattern: '^[A-Za-z0-9]{3,12}$', errorMsg: 'Username should be 3-12 characters & should not include any special character!' },
    { id: 2, name: 'name', label: 'Name', type: 'text', placeholder: 'John Smith', required: true, pattern: '^[A-Za-z]{1,20}$', errorMsg: 'Name is required!' },
    { id: 3, name: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com', required: true, errorMsg: 'Enter a valid email!' },
    { id: 4, name: 'password', label: 'Password', type: 'password', placeholder: 'Password', required: true, pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$', errorMsg: 'Password should be 6-20 characters and include at least 1 num, 1 letter, 1 special character!' },
    { id: 5, name: 'address', label: 'Address', type: 'text', placeholder: 'Address', required: true, errorMsg: 'Address is required!' },
];

function Supreme_App() {
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    {/* Route 1: Home page route */}
                    <Route path="/supreme" element={<Home />} />
                    
                    {/* Route 2: Login page route */}
                    <Route path="/supreme/login" element={<Login />} />
                    
                    {/* Route 3: Applicants section with nested routes */}
                    <Route path="/supreme/applicants">
                        {/* Route 3.1: Applicants list (index route) */}
                        <Route index element={<Lists type="user" />} />
                        
                        {/* Route 3.2: Add new applicant route - fixed to use relative path */}
                        <Route path="addnew" element={<AddNew inputs={userInpDetails} titlee="Add New Applicant" type="USER" />} />

                    </Route>
                    
                    {/* Route 4: Job Vacancies route */}
                    <Route path="/supreme/JobVacancies" element={<Orders />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default Supreme_App;
