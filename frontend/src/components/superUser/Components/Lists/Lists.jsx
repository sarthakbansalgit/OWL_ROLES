import React, { useState, useEffect } from 'react';
import './lists.scss';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import UserTable from '../Tables/UserTable';
import RecruiterTable from '../Tables/RecruiterTable';
import CompanyTable from '../Tables/CompanyTable';
import { APPLICATION_API_END_POINT, USER_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

function Lists({ type }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new fetch
            try {
                let response;
                
                if (type === 'user') {
                    // Fetch all users with role 'user' (applicants)
                    response = await axios.get(`${USER_API_END_POINT}/getAllUsers`, { withCredentials: true });
                    if (response.data.success) {
                        setData(response.data.users || []);
                    } else {
                        setError(response.data.message || "Failed to fetch users");
                    }
                } else if (type === 'recruiter') {
                    // Fetch all recruiters
                    response = await axios.get(`${USER_API_END_POINT}/getAllRecruiters`, { withCredentials: true });
                    if (response.data.success) {
                        setData(response.data.recruiters || []);
                    } else {
                        setError(response.data.message || "Failed to fetch recruiters");
                    }
                } else if (type === 'companies') {
                    // Fetch all companies
                    response = await axios.get(`${COMPANY_API_END_POINT}/getAllCompanies`, { withCredentials: true });
                    if (response.data.success) {
                        setData(response.data.companies || []);
                    } else {
                        setError(response.data.message || "Failed to fetch companies");
                    }
                } else {
                    setError("Invalid list type specified");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response?.data?.message || "An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    // Table title based on type
    const getTitle = () => {
        switch (type) {
            case 'user':
                return 'Applicants';
            case 'recruiter':
                return 'Recruiters';
            case 'companies':
                return 'Companies';
            default:
                return '';
        }
    };

    return (
        <div className="lists">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="listTitle">{getTitle()}</div>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <>
                        {type === 'user' && <UserTable data={data || []} />}
                        {type === 'recruiter' && <RecruiterTable data={data || []} />}
                        {type === 'companies' && <CompanyTable data={data || []} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default Lists;
