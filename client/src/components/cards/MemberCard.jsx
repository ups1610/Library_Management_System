import React, { useEffect, useState } from 'react'
import { IoIosPeople } from "react-icons/io";
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';
export const MemberCard = () => {
const [members,setMember]=useState([]);

      const {token}=useAuth();
  useEffect(() => {
    
    const fetchData = async () => {

       MemberAction.getAllMembers(token)
       .then((resp)=>{
              setMember(resp.data);
       })
       .catch((err)=>{
        console.log("Failed"+err)
       });
    }

    fetchData();
  }, []);

  return (
    <article
        
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded-full bg-blue-600 p-2 text-white">
      <IoIosPeople size={24} />
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="text-right font-medium">Total Members</h2>
        {/* Value */}
        <p className="text-gray-500 text-xl font-bold text-right">{members.length }</p>
      </div>
    </div>
  </article>
  )
}
