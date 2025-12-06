import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { CHART_API_END_POINT } from '@/utils/constant';

const JobsByCompanyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using the new chart endpoint
        const response = await axios.get(`${CHART_API_END_POINT}/jobsByCompany`);
        
        if (response.data && response.data.jobCounts) {
          setData(response.data.jobCounts);
        } else {
          // Fallback to sample data if API response format is unexpected
          console.warn('API response format unexpected, using fallback data');
          setData([
            { companyName: 'Company A', count: 10 },
            { companyName: 'Company B', count: 8 },
            { companyName: 'Company C', count: 12 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
        setError('Failed to load job data');
        // Use fallback data on error
        setData([
          { companyName: 'Company A', count: 10 },
          { companyName: 'Company B', count: 8 },
          { companyName: 'Company C', count: 12 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '-600px', marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading company job data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '-600px', marginTop: '100px', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300, marginLeft: '-600px', marginTop: '100px' }}>
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#4B0082',
        textAlign: 'left',
        whiteSpace: 'nowrap'
      }}>
        Company wise Jobs
      </p>
      <BarChart
        width={850}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="companyName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#36A2EB" />
      </BarChart>
    </div>
  );
};

export default JobsByCompanyChart;
