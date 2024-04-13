import React, { useEffect, useState } from "react";
import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts"
import { useAuth } from "../../context/Authetication";
import { getAllMembership } from "../../action/MemberAction";


   const MembersChart = () => {
    const [membership, setMembership] = useState([])
    const [chartData, setChartData] = useState([]);
    const { token } = useAuth();
    useEffect(()=>{
      const fetchData = async() =>{
        try{
          const membershipData = await getAllMembership(token)
          setMembership(membershipData)
        }
        catch(error)
        {
          console.error("Error occured in fetchinf Data in Charts..")
        }
      }
      fetchData()
    },[])

    useEffect(() => {
      const formatData = () => {
        const formattedData = membership.reduce((acc, curr) => {
          const month = curr.startDate.slice(0, 7); // Extracting month from startDate
          const status = curr.status;
  
          if (!acc[month]) {
            acc[month] = { month, active: 0, expired: 0, pending: 0 };
          }
  
          acc[month][status]++;
  
          return acc;
        }, {});
         // Converting object to array of objects
      const chartDataArray = Object.values(formattedData);
      setChartData(chartDataArray);
    };

    formatData();
  }, [membership]);
    
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-4 mt-4 shadow-sm">
      <div className="flex justify-between p-2 mb-2">
        <h2 className="text-lg text-[#8c8b8b]">Membership Status Report</h2>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <CartesianGrid opacity={0.1} vertical={false} />
          <XAxis dataKey="month" axisLine={true} tickLine={true} />
          <YAxis axisLine={true} tickLine={true} tickCount={8} />
          <Tooltip />
          <Area type="monotone" dataKey="active" stroke="#2451B7" fillOpacity={0.4} fill="#2451B7" />
          <Area type="monotone" dataKey="expired" stroke="#FF5733" fillOpacity={0.4} fill="#FF5733" />
          <Area type="monotone" dataKey="pending" stroke="#FFC300" fillOpacity={0.4} fill="#FFC300" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    );
  };
  
  export default MembersChart;