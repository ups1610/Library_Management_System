import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";

function ActionTable(props) {
    const [options, showOptions] = useState(false)
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          {/* Add select field here */}
          <select className="border rounded-md px-3 py-1">
            <option value="">Filter</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          {/* Add search bar here */}
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-1"
          />
        </div>
        {/* Shifted the button to the right */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Book</button>
      </div>
      <div className="relative overflow-x-auto"> {/* Added relative positioning */}
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="text-left">
              <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                {props.col1}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                {props.col2}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                {props.col3}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                {props.col4}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                {props.col5}
                </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Welcome to the books....
              </td>
              <td className="whitespace-nowrap px-4 py-2 flex flex-row justify-center gap-4 ">
               <button
                className="hover:bg-gray-50 p-1 hover:shadow-md">
               <GrView />
               </button>
               <button
                className="hover:bg-gray-50 p-1 hover:shadow-md">
               <FaEdit />
               </button>
               <button
                className="hover:bg-gray-50 p-1 hover:shadow-md">
               <AiTwotoneDelete />
               </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ActionTable;
