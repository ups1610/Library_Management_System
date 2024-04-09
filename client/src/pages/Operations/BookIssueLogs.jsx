import React, { useEffect, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { users } from "../../action/UserAction";
import { useAuth } from "../../context/Authetication";
import { AiOutlineFilePdf } from "react-icons/ai";
import { PiKeyReturnLight } from "react-icons/pi";

import { FaRegEye } from "react-icons/fa";
import ReturnBook from "../../components/bookLog/ReturnBook";
function BookIssueLogs() {
  const auth = useAuth();
  const token = auth.token;
  const [showReturnModel, setshowReturnModel] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await users(token);
      if (response.success) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
   

    fetchData();
  }, [token]);

  const filteredUsers = userData.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
        <select className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
              <option value="">All</option>
              <option value="option1">Book Issue</option>
              <option value="option2">Return Book</option>
              <option value="option2">Due Return</option>
            </select>
          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">
             Book
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
        <button className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center">
        <AiOutlineFilePdf /> Downlaod Pdf
      </button>
          <Link to="Issue"
            className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center"
         
          >
           <MdOutlineLibraryAdd /> Issue Book
          </Link>
          
        </div>
      </div>

      <div className="rounded-lg border border-gray-200">
  <div className="overflow-x-auto rounded-t-lg">
    <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="  divide-y-2 divide-gray-200 ">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">#</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Memeber Id</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Member Name</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Book Title</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Book Instance</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
        </tr>
      </thead>

      <tbody className="  divide-y-2 divide-gray-200 text-center">
        <tr>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">1</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">1232</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">Sagar Bisht</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">Ghost Village of UK</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">32</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">Issue</td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex">
            <Link to="view" className="text-gray-400 bg-gray-200 p-1 rounded-sm"> <FaRegEye /></Link>
            <button className="text-white bg-red-500 p-1 rounded-sm ml-1"  onClick={()=> setshowReturnModel(true)}>  <PiKeyReturnLight /></button>

            {showReturnModel && (
            <ReturnBook onClose={() =>{ setshowReturnModel(false)}} />
          )}
          </td>
        </tr>

      </tbody>
    </table>
  </div>

  <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
    <ol className="flex justify-end gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li>
        <a
          href="#"
          className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          1
        </a>
      </li>

      <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
        2
      </li>

      <li>
        <a
          href="#"
          className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          3
        </a>
      </li>

      <li>
        <a
          href="#"
          className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          4
        </a>
      </li>

      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>
</div>
     
    </div>

        



  );
}

export default BookIssueLogs;
