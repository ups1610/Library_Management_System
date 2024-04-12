import React, { useEffect, useState } from "react";
import userImg from "../../assets/user.png";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/Authetication";
import MemberAction from "../../action/MemberAction";

export const MemberTable = () => {
  const [userData, setUserData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await MemberAction.getAllMembers(token);

        const recentMembers = response.data.slice(0, 5); 
        setUserData(recentMembers);
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
            {userData.map((member, index) => (
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
        <hr></hr>
        <Link to="/dashboard/member/MemberTable" className="text-xs float-right mt-4 text-blue-700">
          {" "}
          See All
        </Link>
      </div>
    </div>
  );
};
