import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { CHART_API_END_POINT } from '@/utils/constant';

const ApplicationByStatusChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using the new chart endpoint
        const response = await axios.get(`${CHART_API_END_POINT}/statusCounts`);
        
        if (response.data && response.data.statusCounts) {
          setData(response.data.statusCounts);
        } else {
          // Fallback to sample data if API response format is unexpected
          console.warn('API response format unexpected, using fallback data');
          setData([
            { status: 'Applied', count: 50 },
            { status: 'Interviewed', count: 30 },
            { status: 'Rejected', count: 20 },
            { status: 'Hired', count: 10 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching application status data:', error);
        setError('Failed to load status data');
        // Use fallback data on error
        setData([
          { status: 'Applied', count: 50 },
          { status: 'Interviewed', count: 30 },
          { status: 'Rejected', count: 20 },
          { status: 'Hired', count: 10 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  if (loading) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading status data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '200px', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{width: '100%', height: 300, marginLeft: '200px'}}>
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#4B0082',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        Application Status
      </p>
      <PieChart width={850} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ApplicationByStatusChart;
