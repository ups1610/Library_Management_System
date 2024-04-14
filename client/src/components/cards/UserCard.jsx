import React, { useEffect, useState } from 'react'
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from '../../context/Authetication';
import { users } from '../../action/UserAction';
export const UserCard = () => {
  const [usersData, setUsersData] = useState([]);
  const {token}=useAuth();


  const activeUsers = usersData.filter(user => user.status === 'active');

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const response = await users(token);
        if (response.success) {
          setUsersData(response.data);
        } else {
          console.error('Failed to fetch user data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


 




  return (
    <article
        
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded-full bg-blue-600 p-2 text-white">
      <RiAdminFill size={24} />
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="text-right font-medium"> Number of Users</h2>
        {/* Value */}
        <p className="text-gray-500 text-right font-bold text-xl">{activeUsers.length} </p>
      </div>
    </div>
  </article>
  )
}
