import React, { useEffect, useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authetication";

import { PiKeyReturnLight } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import ReturnBook from "../../components/bookLog/ReturnBook";
import { getAllIssueBook, sendDueMail } from "../../action/OperationsAction";
import IssueBookPDF from "../../utils/pdf/IssueBook";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs";
import toast from "react-hot-toast"
import {Tooltip as ReactTooltip} from 'react-tooltip';
import { IoMailUnreadOutline } from "react-icons/io5";
function BookIssueLogs() {
  const [issueBooks, setIssueBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { token ,user} = useAuth();
  const [showReturnModelMap, setShowReturnModelMap] = useState({});
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    fetchData();
  }, [showReturnModelMap]);

  const fetchData = async () => {
  
      console.log("Fetching issue book data...");
      getAllIssueBook(token)
      .then((response)=>{
        console.log("Response received:", response);
        if (response.success) {
          console.log("Setting issue books:", response.data);
          setIssueBooks(response.data);
        } else {
          console.log("Error response:", response.data);
          toast.error(response.data);
          console.error("Failed to fetch data:", response.data);
        }
        setIsLoading(false);
      })
     .catch ((error)=>{
      console.error("Error fetching issue book data:", error);
    }
  )
    
  };

  const sendReminder = async (id, token) => {
    toast.promise(
      sendDueMail(id, token),
      {
        loading: 'Sending Reminder',
        success: (resp) => {
          if (resp.success) {
            return "Reminder sent Successfully";
          } else {
            throw new Error(resp.data); 
          }
        },
        error: (err) => {
          return err.message || "Something went wrong"; 
        },
      }
    );
  };
  

  const handleReturnButtonClick = (issueId) => {
    setShowReturnModelMap((prevMap) => ({
      ...prevMap,
      [issueId]: true,
    }));
  };

  const handleReturnModelClose = (issueId) => {
    setShowReturnModelMap((prevMap) => ({
      ...prevMap,
      [issueId]: false,
    }));
  };

  const filteredIssueBooks = issueBooks.filter((issueBook) => {
    if (filterOption === "all") {
      return Object.values(issueBook).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterOption === "issue") return issueBook.isReturn === "No";
    if (filterOption === "return") return issueBook.isReturn === "Yes";
    if (filterOption === "dueReturn") {
      const currentDate = new Date();
      const returnDate = new Date(issueBook.dateOfReturn);
      return issueBook.isReturn === "No" && currentDate >= returnDate;
    }
    return false;
  });

  return (
    <div className=" md:w-full w-screen   mt-5 rounded-lg border border-gray-100 bg-white p-4 m-[30px]shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="issue">Book Issue</option>
            <option value="return">Return Book</option>
            <option value="dueReturn">Due Return</option>
          </select>
          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">
              Book
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search .."
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
        <PDFDownloadLink   className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center" document={<IssueBookPDF issueBooks={filteredIssueBooks} username={user.userName}/>}  fileName="bookIssueData.pdf">
  {({ loading }) => (loading ? "Loading..." : <><BsFileEarmarkPdf /> Download PDF</>)}
</PDFDownloadLink>
       
          <Link
            to="Issue"
            className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center"
          >
            <MdOutlineLibraryAdd /> Issue Book
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="divide-y-2 divide-gray-200 bg-gray-700 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">#</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Memeber Id
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Member Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Book Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Book Instance
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Issue Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium ">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-gray-200 text-center">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredIssueBooks.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4">
                  No records available.
                </td>
              </tr>
            ) : (
              filteredIssueBooks.map((issueBook, index) => {
                const currentDate = new Date();
                const issueDateObj = new Date(issueBook.dateOfIssue);
                const issueDate =
                  issueDateObj.getDate() +
                  "/" +
                  (issueDateObj.getMonth() + 1) +
                  "/" +
                  issueDateObj.getFullYear();
                const returnDate = new Date(issueBook.dateOfReturn);
                const isDue =
                  issueBook.isReturn === "No" && currentDate >= returnDate;
                const isReturned = issueBook.isReturn === "Yes";

                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {issueBook.member_Id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {issueBook.memberName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {issueBook.bookInstance.book.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {issueBook.bookInstance.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {issueDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {isDue ? (
                        <span className="bg-red-200 rounded-md text-xs text-red-900 p-1">
                          Due Return
                        </span>
                      ) : isReturned ? (
                        <span className="bg-orange-200 rounded-md text-xs text-orange-900 p-1">
                          Returned
                        </span>
                      ) : (
                        <span className="bg-green-200 text-xs rounded-md text-green-900 p-1">
                          Issued
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex">
                      <Link
                        to={`${issueBook.bookIssueId}/view`}
                        className="text-gray-500 border-[1px] border-gray-300 p-1 "

                        data-tip="View"
                      >
                        <FaRegEye />
                      </Link>
                      {!isReturned && (
                        <>
                        <button
                          className="text-white bg-red-500 p-1 rounded-sm ml-1"
                          onClick={() =>
                            handleReturnButtonClick(issueBook.bookIssueId)
                          }

                          data-tip="Return Book"
                        >
                          <PiKeyReturnLight />
                        </button>

                        <button
                          className="text-white bg-blue-500 p-1 rounded-sm ml-1"
                          data-tip="Send Reminder Mail"
                          onClick={()=>{
                            sendReminder(issueBook.bookIssueId)
                          }}
                        >
                          <IoMailUnreadOutline />
                        </button>
                       
                        </>
                      )}
                      {showReturnModelMap[issueBook.bookIssueId] && (
                        <ReturnBook
                          onClose={() => {
                            handleReturnModelClose(issueBook.bookIssueId);
                            fetchData();
                          }}
                          issueId={issueBook.bookIssueId}
                          bookTitle={issueBook.bookInstance.book.title}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
             <ReactTooltip />
          </tbody>
        </table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          {/* pagination  */}
        </ol>
      </div>
    </div>
  );
}

export default BookIssueLogs;
