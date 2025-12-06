import React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

// import css file
import './chart.scss';

const data = [
    {
        name: 'January',
        total: 0,
    },
    {
        name: 'February',
        total: 1000
    },
    {
        name: 'March',
        total: 410,
    },
    {
        name: 'April',
        total: 100,
    },
    {
        name: 'May',
        total: 700,
    },
    {
        name: 'June',
        total: 1000,
    },
    {
        name: 'July',
        total: 1250,
    },
    {
        name: 'August',
        total:  0,
    },
    {
        name: 'September',
        total: 800,
    },
    {
        name: 'October',
        total: 960,
    },
    {
        name: 'November',
        total: 1150,
    },
    {
        name: 'December',
        total: 0,
    },
];

function Chart({ height, title }) {
    return (
        <div className="chart_sec">
            <div>
                <div className="title">
                    <p>{title} </p>
                </div>

                <div style={{ width: '100%', height: 300 }}>
                    {/* <ResponsiveContainer> */}
                    <AreaChart
                        width={850}
                        height={height}
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                        <linearGradient id="totals" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#301934" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#4B0082" stopOpacity={0} />
                        </linearGradient>

                        </defs>
                        <XAxis dataKey="name" stroke="gray" />
                        <CartesianGrid strokeDasharray="3 3" className="strokee" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#536def"
                            fillOpacity={1}
                            fill="url(#totals)"
                        />
                    </AreaChart>
                    {/* </ResponsiveContainer> */}
                </div>
            </div>
        </div>
    );
}

export default Chart;
