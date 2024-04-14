import React, { useEffect, useState } from "react";
import userImg from "../../assets/user.png";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/Authetication";
import MemberAction from "../../action/MemberAction";
import toast from "react-hot-toast"
export const MemberTable = () => {
  const [memberData, setMemberData] = useState([]);
  const { token } = useAuth();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await MemberAction.getAllMembers(token);
        if(response.success){
          const recentMembers = response.data.slice(0, 5); 
          setMemberData(recentMembers);
          setLoading(false);
        }else{
              toast.error("Something Went Wrong!");
        }
       
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, [token]);

  return (
    <div className="text-lg bg-white p-6 rounded-md mb-2 mt-4">
      <span className="flex justify-between">
        <h2> Members List </h2>{" "}
        <Link to="/dashboard/member/MemberTable/add">
          {" "}
          <small className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center border-gray-500 ">
            {" "}
            Add New Member
          </small>
        </Link>
      </span>
      <div className="overflow-x-auto">

      {loading ? ( 
          <p className="text-xs">Loading...</p>
        ) : memberData.length === 0 ? ( 
          <p className="text-xs">No books available</p>
        ) : (
        <table className="min-w-full mt-6 border-0 divide-y-2 divide-gray-200 bg-white text-sm align-center">
          <thead className="text-gray-600">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Member ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Member Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
               Mobile
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" border-0 divide-y divide-gray-200 text-center">
            
            {  memberData.map((member, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {member.memberId}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img src={userImg} className="w-4 h-4" />{" "}
                    <span> {member.firstName} {member.familyName}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                 {member.mobile}
                </td>
                <td className="whitespace-nowrap px-4 py-2 ">
                  <Link
                    to=""
                    className="flex nowrap gap-1 text-blue-500"
                  >
                   
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        <hr></hr>
        <Link to="/dashboard/member/MemberTable" className="text-xs float-right mt-4 text-blue-700">
          {" "}
          See All
        </Link>
      </div>
    </div>
  );
};
