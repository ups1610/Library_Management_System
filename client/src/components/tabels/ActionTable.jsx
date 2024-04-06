import React, { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { AiTwotoneDelete, AiTwotonePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

function ActionTable(props) {
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `${props.title} Details`,
  });

  return (
    <>
      <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
              <option value="">Filter</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <div className="relative w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search for..."
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
            <button
              onClick={generatePDF}
              className="border-2 font-medium px-4 py-2 rounded-lg flex items-center mb-2 sm:mb-0 sm:mr-2"
            >
              <AiTwotonePrinter size={20} />
              <span className="px-1">Print</span>
            </button>
            <button
              onClick={props.onClick}
              className="border-2 font-medium hover:bg-gray-600 hover:text-white px-4 py-2 rounded-lg flex items-center"
            >
              <MdAdd size={20} /> {props.addButton}
            </button>
          </div>
        </div>

        {/* table */}
        <div ref={componentPDF} className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg overflow-hidden">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-gray-700 text-white font-bold">
                <tr className="text-left">
                  <th className="whitespace-nowrap px-2 py-2 font-medium">
                    {props.col1} 
                  </th>
                  <th className="whitespace-nowrap px-2 py-2 font-medium">
                    {props.col2}
                  </th>
                  <th className="whitespace-nowrap px-2 py-2 font-medium max-sm:hidden">
                    {props.col3}
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 font-medium max-lg:hidden">
                    {props.col4}
                  </th>
                  <th className="px-1 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                    1
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                    Hands On Python
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-gray-700 max-sm:hidden">
                    Upendra Pratap Singh
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-gray-700 max-lg:hidden">
                    Programming, Data Science
                  </td>
                  <td className="whitespace-nowrap px-1 py-2 flex gap-2 ">
                <button className="hover:bg-gray-50 p-1 hover:shadow-md">
                  <span className="flex flex-row"> <LuView size={20} />
                  <span className="hidden sm:block"> View</span>
                  </span>
                </button>
                <button className="hover:bg-gray-50 p-1 hover:shadow-md hidden md:block">
                  <span className="flex flex-row"><FaEdit size={20} />
                   <span className="hidden lg:block">Edit</span>
                   </span>
                </button>
                <button className="hover:bg-gray-50 p-1 hover:shadow-md hidden lg:block">
                  <span className="flex flex-row"><AiTwotoneDelete size={20} />
                   <span className="hidden lg:block">Delete</span>
                   </span>
                </button>
              </td>

                </tr>

              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <a
                  href="/#"
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
                  href="/#"
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
                  href="/#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="/#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="/#"
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
    </>
  );
}

export default ActionTable;
