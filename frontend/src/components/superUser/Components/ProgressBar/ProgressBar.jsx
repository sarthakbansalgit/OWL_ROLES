import React, { useEffect, useState } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Tooltip } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './progressBar.scss';
import { APPLICATION_API_END_POINT } from '@/utils/constant'; 

function ProgressBar() {
    const [jobCount, setJobCount] = useState(0); // State for job count
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`);
                setJobCount(response.data.jobs.length); 
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError("PIE CHART PLACEHOLDER");
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="progress_bar">
            <div className="top">
                <p>Admin Charts 🙂</p>
                {/* <MoreVertOutlinedIcon /> */}
            </div>

            <div className="middle">
                <div className="progress">
                    {loading ? (
                        <p></p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={[{ value: applicantCount }]} 
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#536def"
                                    label
                                /> */}
                                {/* <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                                                    <p>{`Total Applicants: ${applicantCount}`}</p>
                                                </div>
                                            );
                                        }
                                        return null; 
                                    }}
                                /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <p>Check out the admin charts</p> {/* Displaying dynamic job count */}
            </div>

                {/* <div className="bottom">
                    <div className="botom_nested">
                        <div className="nested_nested">
                            <p>Last Week</p>
                            <p className="pricee">
                                <KeyboardArrowUpOutlinedIcon /> 150
                            </p>
                        </div>
                        <div className="nested_nested">
                            <p>Last Month</p>
                            <p className="pricee decrese">
                                <KeyboardArrowUpOutlinedIcon /> 110
                            </p>
                        </div>
                    </div>
                </div> */}
        </div>
    );
}

export default ProgressBar;
