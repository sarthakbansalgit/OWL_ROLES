import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './datatable.scss';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

function DataTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${APPLICATION_API_END_POINT}/applicants`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    const formattedData = result.applications.map((app) => ({
                        id: app._id,
                        name: app.applicant.fullname,
                        email: app.applicant.email,
                        status: app.status,
                        company: app.job.company.name,
                    }));

                    setData(formattedData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDlt = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this application?");
        if (!confirmed) return;

        try {
            console.log(`${APPLICATION_API_END_POINT}/delete/${id}`);
            const response = await fetch(`${APPLICATION_API_END_POINT}/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the application');
            }

            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (err) {
            setError("Could not delete the application. Please try again.");
            console.error(err);
        }
    };


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img src='https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2' alt="User" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 180
        },
        { field: 'email', headerName: 'Email', width: 280 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (param) => (
                <div className={`status ${param.row.status}`}>{param.row.status}</div>
            ),
        },
        { field: 'company', headerName: 'Company', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <div className="actionn">

                    {/* <Link to={`/supreme/applicants/view/${params.row.id}`}>
                        <button type="button" className="view_btn">View</button>
                    </Link> */}

                    <button type="button" className="delete_btn" onClick={() => handleDlt(params.row.id)}>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="data_table">
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable;
