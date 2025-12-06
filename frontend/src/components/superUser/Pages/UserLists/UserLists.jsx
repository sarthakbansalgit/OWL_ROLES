import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import DataTableUser from '../../Components/DataTableUser/DataTableUser';
import DataTableRecruiter from '../../Components/DataTableRecruiter/DataTableRecruiter'; 
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import './userlists.scss';
import { COMPANY_API_END_POINT } from '@/utils/constant';


function Lists({ type }) {
    const getLinkPath = () => {
        switch (type) {
            case 'companies':
                return '/supreme/companies/add'; // Routes to AddNewCompany component
            case 'user':
                return '/supreme/applicants/add'; // Routes to AddNewApplicant component
            case 'recruiter':
                return '/supreme/recruiters/add'; // Routes to AddNewRecruiter component
            default:
                return '/';
        }
    };

    const renderTable = () => {
        switch (type) {
            case 'user':
                return <DataTableUser />;
            case 'recruiter':
                return <DataTableRecruiter />;
            default:
                return <TableList />;
        }
    };

    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />
                <h1 className="table_heading ">{type.toUpperCase()} List</h1>
                <div className="data_table">
                    <div className="btnn">
                        <Link to={getLinkPath()} style={{ textDecoration: 'none' }}>
                            <button type="button">Add New {type}</button>
                        </Link>
                    </div>

                    {renderTable()}
                </div>
            </div>
        </div>
    );
}

export default Lists;
