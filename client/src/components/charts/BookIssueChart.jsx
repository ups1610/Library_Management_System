import React from "react";
import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts"

const data = [
    { "month": "January", "value": 20 },
    { "month": "February", "value": 25 },
    { "month": "March", "value": 15 },
    { "month": "April", "value": 35 },
    { "month": "May", "value": 10 }
  ];


   const BookIssueChart = () => {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-4  mt-4 shadow-sm">
            <div className="flex justify-between p-2 mb-2">
              <h2 className="text-lg text-[#8c8b8b]">Report</h2>

            </div>
            <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
          <CartesianGrid opacity={0.1} vertical={false} />
          <XAxis dataKey="month" axisLine={true} tickLine={true} />
          <YAxis dataKey="value" axisLine={true} tickLine={true} tickCount={8}  />
          <Tooltip />
          <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
        </AreaChart>
      </ResponsiveContainer>
          </div>
    );
  };
  
  export default BookIssueChart;