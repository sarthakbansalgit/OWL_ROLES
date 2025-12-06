import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';
import { CHART_API_END_POINT } from '@/utils/constant';
import './chart.scss';

const ApplicationsOverTimeChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using the new chart endpoint
        const response = await axios.get(`${CHART_API_END_POINT}/applicationsOverTime`);
        
        if (response.data && response.data.timeData) {
          setData(response.data.timeData);
        } else {
          // Fallback to generated data if API response format is unexpected
          console.warn('API response format unexpected, using fallback data');
          setData(generatePolynomialData());
        }
      } catch (error) {
        console.error('Error fetching application time data:', error);
        setError('Failed to load time-based data');
        // Use generated data on error
        setData(generatePolynomialData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generatePolynomialData = () => {
    // Polynomial function for fallback data
    const coefficients = { a: 0.02, b: -0.5, c: 5, d: 10 };
    const data = [];
    const startYear = 2022;
    const endYear = 2024;
    const monthsInYear = 12;

    for (let i = 0; i < (endYear - startYear + 1) * monthsInYear; i++) {
      const month = i % monthsInYear + 1; // months from 1 to 12
      const year = Math.floor(i / monthsInYear) + startYear;
      const x = i; // time index (in months)

      // Polynomial formula for fallback data
      const count = Math.max(0, coefficients.a * Math.pow(x, 3) + coefficients.b * Math.pow(x, 2) + coefficients.c * x + coefficients.d);
      const date = `${year}-${month < 10 ? '0' + month : month}-01`;

      data.push({
        date,
        count: Math.round(count),
      });
    }

    return data;
  };

  if (loading) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '700px', marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading timeline data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: 300, marginLeft: '700px', marginTop: '50px', color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="chart_sec">
      <div>
        <div style={{ width: '100%', height: 300, marginLeft: '700px', marginTop: '50px' }}>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B0082',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            Applications Over Time
          </p>

          <AreaChart
            width={850}
            height={300}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#301934" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#4B0082" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="gray"
              tickFormatter={(tick) => {
                const date = new Date(tick);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
              }}
            />
            <CartesianGrid strokeDasharray="3 3" className="strokee" />
            <Tooltip
              labelFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
              }}
              formatter={(value) => [`${value} applications`, 'Count']}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#536def"
              fill="url(#colorApplications)"
              fillOpacity={1}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsOverTimeChart;
