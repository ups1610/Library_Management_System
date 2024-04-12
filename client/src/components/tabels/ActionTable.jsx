import React, { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { AiTwotonePrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

function ActionTable(props) {
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `${props.title} Details`
  });

  const handleDeleteData = (id) => {
    try {
      props.onDelete(id);
      console.log("id passed " + id);
    } catch (error) {
      console.error("Error in passing id " + id + error);
    }
  };

  const handleEditData = (id) => {
    try{
      props.onEdit(id);
    }
    catch(error){
      console.error("Error in passing " +id + error)
    }
  };

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
              {props.load ? (
                  <div>Loading...</div>
                ) : props.mapData.length === 0 ? (
                  <div>No records found</div>)
                  : (
                props.mapData.map((item) => (

                    <tr>
                    <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                      {item[props.data1]}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                      {item[props.data2]}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-gray-700 max-sm:hidden">
                      {item[props.data3]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-gray-700 max-lg:hidden">
                    {Array.isArray(item[props.data4])? item[props.data4][0] : item[props.data4]}
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 flex gap-2 ">
                      <div className="inline-flex rounded-lg">
                        <div className="hidden md:block">
                        <button onClick={() => handleEditData(item.id)}
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ">
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          <span className="hidden lg:block">Edit</span>
                        </button>
                        </div>
                        
                        <div>
                        <Link to={`${props.path}/${item.id}`} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ">
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
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="hidden sm:block">View</span>
                        </Link>
                        </div>
                        
                        <div className="hidden lg:block">
                          <button  onClick={()=>handleDeleteData(item.id)}
                          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              {" "}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )))}
                
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
