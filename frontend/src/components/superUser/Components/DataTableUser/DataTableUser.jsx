import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTableUser.scss';
import { USER_API_END_POINT } from '@/utils/constant';

function DataTableUser() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/getAllUsers`);
                const formattedData = response.data.users.map((user) => ({
                    id: user._id,
                    username: user.fullname,
                    email: user.email,
                    image: user.image || 'https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2',
                    age: user.age || 'N/A',
                    phoneNumber: user.phoneNumber || 'N/A',
                    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDlt = async (id) => {
        try {
            await axios.delete(`${USER_API_END_POINT}/deleteUser/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 300,
            renderCell: (param) => (
                <div className="userr">
                    <img src={param.row.image} alt="User" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        { field: 'username', headerName: 'User Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        { field: 'joinDate', headerName: 'Joined Date', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
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

export default DataTableUser;
