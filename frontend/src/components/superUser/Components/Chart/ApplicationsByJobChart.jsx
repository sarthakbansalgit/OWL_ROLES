import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { CHART_API_END_POINT } from '@/utils/constant';

const ApplicationsByJobChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using the new chart endpoint
        const response = await axios.get(`${CHART_API_END_POINT}/applicationsByJob`);
        
        if (response.data && response.data.applicationCounts) {
          setData(response.data.applicationCounts);
        } else {
          // Fallback to sample data if API response format is unexpected
          console.warn('API response format unexpected, using fallback data');
          setData([
            { jobTitle: 'Software Engineer', count: 20 },
            { jobTitle: 'Data Scientist', count: 15 },
            { jobTitle: 'Product Manager', count: 10 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching application data:', error);
        setError('Failed to load application data');
        // Use fallback data on error
        setData([
          { jobTitle: 'Software Engineer', count: 20 },
          { jobTitle: 'Data Scientist', count: 15 },
          { jobTitle: 'Product Manager', count: 10 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '-200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading applications data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '-200px', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300, marginLeft: '-200px' }}>
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#4B0082',
        textAlign: 'left',
        whiteSpace: 'nowrap'
      }}>
        Applications by job
      </p>
      <BarChart
        width={850}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jobTitle" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF6384" />
      </BarChart>
    </div>
  );
};

export default ApplicationsByJobChart;
