import React, { useState, useEffect } from "react";
import ChangePassword from "../../components/Users/ChangePassword";
import UpdateUser from "../../components/Users/UpdateUser";
import { useParams } from "react-router-dom";
import { particularUser, changeStatus } from "../../action/UserAction"; // Import particularUser method
import { useAuth } from "../../context/Authetication";

import toast from "react-hot-toast";
export default function View() {
  const [changePassword, setChangePassword] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [userData, setUserData] = useState(null); 
  const { id } = useParams();
  const { token } = useAuth();


  const fetchUserData = () => {
    particularUser(id, token)
      .then((response) => {
        if (response.success) {
          setUserData(response.data);
        } else {
          console.error("Failed to fetch user data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, [id, token,updateUser]);

  const handleChangeStatus = () => {
    const newStatus = userData.status === "active" ? "blocked" : "active";
    changeStatus(id, token)
      .then((response) => {
        if (response.success) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            status: newStatus,
          }));
        } else {
          toast.error("Failed to change user status:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error changing user status:", error);
        toast.error("Error changing user status.  Try later on!");
      });
  };

  return (
    <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <h1> User information</h1>
      <div className="">
        {userData && ( // Render table if userData is not null
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <tbody>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> UserName</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {userData.userName}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> First Name</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {userData.firstName}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> Family Name</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {userData.lastName}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> Mobile No</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {userData.mobile}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> Email</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {userData.email}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2"> Role</td>
                <td className="whitespace-nowrap px-4 py-2">{userData.role}</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2">isActive</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <span
                    className={`p-1 rounded-md text-white text-sm ${
                      userData.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {userData.status === "active" ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-row gap-3 mt-20 justify-center">
        <button
          className="inline-block rounded border border-green-600  px-2 py-1 text-sm font-medium text-green-600 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring"
          onClick={() => setUpdateUser(true)}
        >
          Update Detail
        </button>
        {updateUser && <UpdateUser  userData={userData} onClose={() =>{ setUpdateUser(false); fetchUserData();}} />}
        <button
          className="inline-block rounded border border-orange-600  px-2 py-1 text-sm font-medium text-orange-600 hover:bg-transparent  hover:text-orange-600  focus:outline-none focus:ring"
          onClick={() => setChangePassword(true)}
        >
          Change Password
        </button>
        {changePassword && (
          <ChangePassword id={id} onClose={() => setChangePassword(false)} />
        )}

        <button
          className={`inline-block rounded border ${
            userData && userData.status === "active"
              ? "border-red-600 bg-red-600"
              : "border-green-600 bg-green-600"
          } px-2 py-1 text-sm font-medium text-white focus:ring`}
          onClick={handleChangeStatus}
        >
          {userData && userData.status === "active"
            ? "Block User"
            : "Activate User"}
        </button>
      </div>
    </div>
  );
}
