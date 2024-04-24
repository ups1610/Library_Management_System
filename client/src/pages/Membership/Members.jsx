import React, { useEffect, useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authetication";
import MemberAction from "../../action/MemberAction";
import toast from "react-hot-toast";

function Members() {
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const [searchQuery,setSearchQuery]=useState("");

  const fetchData = () => {
    MemberAction.getAllMembers(token).then((response) => {
      if (response.success) {
        setMembers(response.data);
      } else {
        toast.error("Failed to fetch members data");
      }
    });

    MemberAction.getAllMembership(token).then((response) => {
      if (response.success) {
        setMemberships(response.data);
      } else {
        toast.error("Failed to fetch memberships data");
      }
    });
  };

  const filterMembers=members.filter((member)=>
    Object.values(member).some(
      (value)=>
      value && 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="md:w-full w-screen mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
          <div className="flex flex-col sm:flex-row gap-2">
           
            <div className="relative w-full">
              <label htmlFor="search" className="sr-only">
                Member
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search for Member"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                className="border-2 px-2 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
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
            <button className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center">
              <AiOutlineFilePdf /> Download Pdf
            </button>
            <Link
              to="save"
              className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center"
            >
              <MdOutlineLibraryAdd />
              Add Member
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="divide-y-2 divide-gray-200 bg-slate-900">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Member Id
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Name
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Mobile
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Email ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Membership Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white  text-center">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-4">
                    Loading...
                  </td>
                </tr>
              ) : filterMembers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-4">
                    No Record found
                  </td>
                </tr>
              ) : (
                filterMembers.map((member, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {member.memberId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {member.firstName} {member.familyName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {member.mobile}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {member.email}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {memberships.find(
                        (membership) => membership.memberId === member.memberId
                      ) ? (
                        memberships.find(
                          (membership) =>
                            membership.memberId === member.memberId
                        ).status === "active" ? (
                          <span className="bg-green-200 text-xs rounded-md text-green-900 p-1">
                            Active
                          </span>
                        ) : memberships.find(
                          (membership) =>
                            membership.memberId === member.memberId
                        ).status === "pending" ? (
                          <span className="text-xs rounded-md text-red-900 p-1">
                            Pending Payment..
                          </span>
                        ): (
                          <span className="bg-red-200 rounded-md text-xs text-red-900 p-1">
                            Blocked
                          </span>
                        )
                      ) : (
                        <span className="bg-orange-200 rounded-md text-xs text-orange-900 p-1">
                          No Membership
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <Link
                        to={`${member.memberId}/manage`}
                        class="inline-flex items-center gap-1 rounded-md  text-xs text-gray-500 hover:text-gray-700 focus:relative"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Members;
