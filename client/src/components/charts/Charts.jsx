import React from "react";
import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts"

const data = [
    { "month": "January", "value": 20 },
    { "month": "February", "value": 25 },
    { "month": "March", "value": 30 },
    { "month": "April", "value": 35 },
    { "month": "May", "value": 40 }
  ];


  export const DashChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="value"  />
          <Tooltip />
          <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  };
  