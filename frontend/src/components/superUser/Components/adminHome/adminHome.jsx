import React, { useEffect, useState } from 'react';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import axios from 'axios';
import './Home.scss';
import { APPLICATION_API_END_POINT, COMPANY_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import ApplicationsOverTimeChart from '../Chart/ApplicationsOverTimeChart';
import ApplicationsByJobChart from '../Chart/ApplicationsByJobChart';
import JobsByCompanyChart from '../Chart/JobsByCompanyChart';
import ApplicationByStatusChart from '../Chart/ApplicationByStatusChart';

function AdminHome() {
    const [totalApplicants, setTotalApplicants] = useState(0);
    const [totalRecruiters, setTotalRecruiters] = useState(0);
    const [totalCompanies, setTotalCompanies] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const applicantsResponse = await axios.get(`${APPLICATION_API_END_POINT}/countApplicants`);
                const recruitersResponse = await axios.get(`${USER_API_END_POINT}/getRecruiterCount`);
                const companiesResponse = await axios.get(`${COMPANY_API_END_POINT}/companyCount`);

                setTotalApplicants(applicantsResponse.data.count);
                setTotalRecruiters(recruitersResponse.data.count);
                setTotalCompanies(companiesResponse.data.count);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="Applicants" count={totalApplicants} />
                    <ItemLists type="Recruiter" count={totalRecruiters} />
                    <ItemLists type="Companies" count={totalCompanies} />
                </div>



                <div className="table">
                    <div className="title">Recently Added Companies</div>
                    <TableList />
                </div>

                <div className="chart_sec">
                    <ProgressBar style={{ height: '100px' }} />
                    <Chart height={250} title="New Users, for next review - sample graph: " />
                    <ApplicationsByJobChart style={{ height: '400px', marginLeft: '-200px' }} /> {/* pinkChart */}
                    <ApplicationByStatusChart style={{ height: '400px' }} /> {/* piechart */}
                    <ApplicationsOverTimeChart style={{ height: '400px' }} /> {/* linechart */}
                    <JobsByCompanyChart style={{ height: '400px' }} />  {/* barChart */}
                </div>

            </div>
        </div>
    );
}

export default AdminHome;
