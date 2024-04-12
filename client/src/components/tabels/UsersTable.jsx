import React, { useEffect, useState } from "react";
import userImg from "../../assets/user.png"


import { Link } from "react-router-dom";

import { users } from "../../action/UserAction";
import { useAuth } from "../../context/Authetication";

export const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const {token}=useAuth();

  useEffect(() => {
 
    const fetchData = async () => {
    
      try {
        const response = await users(token);
        if (response.success) {
          setUserData(response.data.slice(0, 6)); 
          console.log(userData);
        } else {
          console.error("Failed to fetch user data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  },[] );

  
  return (
  
      <div className="text-lg text-[#8c8b8b] bg-white p-6 rounded-md mb-2 mt-4">
        <span className="flex justify-between"><h2>  Users   </h2>   <Link to="/dasboard/users/manage"> <small className="text-[14px] text-blue-500  "> view all</small></Link></span>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead></thead>
          <tbody className="divide-y divide-gray-200">
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <div className="flex items-center space-x-4">
                    <img
                      src={userImg}
                      alt="user"
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.userName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
              
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                  {user.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <span
                    className={`p-1 rounded-md text-white text-[10px] ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

  );
};
