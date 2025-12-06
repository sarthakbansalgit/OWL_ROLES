import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTableRecruiter.scss';
import { USER_API_END_POINT } from '@/utils/constant';

function DataTableRecruiter() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/getAllRecruiters`);
                const formattedData = response.data.recruiters.map((recruiter) => ({
                    id: recruiter._id,
                    username: recruiter.fullname,
                    email: recruiter.email,
                    image: recruiter.image || 'https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2',
                    age: recruiter.age || 'N/A',
                    phoneNumber: recruiter.phoneNumber || 'N/A',
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching recruiters:", error);
            }
        };

        fetchRecruiters();
    }, []);

    const handleDlt = async (id) => {
        try {
            await axios.delete(`${USER_API_END_POINT}/deleteRecruiter/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting recruiter:", error);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img src={param.row.image} alt="User" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        { field: 'username', headerName: 'Recruiter Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 280 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 176 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <div className="actionn">
                    <button
                        type="button"
                        className="delete_btn"
                        onClick={() => handleDlt(params.row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="data_table">
            
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    );
}

export default DataTableRecruiter;
