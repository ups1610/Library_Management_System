import React, { useEffect, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import AddUser from "../../components/Users/AddUser";
import userImg from "../../assets/user.png";
import { Link } from "react-router-dom";
import { users } from "../../action/UserAction";
import { useAuth } from "../../context/Authetication";
import UserPDF from "../../utils/pdf/Users";

import { PDFDownloadLink } from "@react-pdf/renderer";

function Users() {
  const {user,token} = useAuth();

  const [showAddUserModel, setAddUserModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading,setIsLoading]=useState(true);

  const fetchData = async () => {
    try {
      const response = await users(token);
      if (response.success) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch user data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
   

    fetchData();
    setIsLoading(false);
  }, [token]);

  const filteredUsers = userData.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="md:w-full w-screen mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search for User"
              className="border-2 px-2 w-full rounded-md border-gray-200 py-2 pe-2 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end">
     
        <PDFDownloadLink   className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center" document={<UserPDF userData={filteredUsers} username={user.userName}/>}  fileName="users.pdf">
  {({ loading }) => (loading ? "Loading..." : <><BsFileEarmarkPdf /> Download PDF</>)}
</PDFDownloadLink>
       
          <button
            className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center"
            onClick={() => setAddUserModal(true)}
          >
            <IoMdPersonAdd />  Add User
          </button>
          {showAddUserModel && (
            <AddUser onClose={() =>{ setAddUserModal(false); fetchData()}} />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead></thead>
          <tbody className="divide-y divide-gray-200">

            {isLoading?(
              <tr>
              <td colSpan="8" className="py-4">
                Loading...
              </td>
            </tr>
            ): filteredUsers.length===0?(
              <tr>
              <td colSpan="8" className="py-4">
                No records available.
              </td>
            </tr>
            ):( filteredUsers.map((user) => (
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
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.firstName} {user.lastName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <span
                    className={`p-1 rounded-md text-white text-sm ${
                      user.status === "active" ? "bg-orange-500" : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <Link
                    to={`/dashboard/users/manage/${user.userId}/view`}
                    className="bg-green-700 p-1 rounded-md text-white text-sm"
                  >
                    View/Edit
                  </Link>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
