import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authetication";
import {
  getBookInstanceIssueHistory,
  getParticularIssueBook,
  getParticularReturnBook,
} from "../../action/OperationsAction";
import { Link, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

export const View = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [bookIssueData, setBookIssueData] = useState(null);
  const [bookHistory, setBookHistory] = useState([]);
  const [bookReturn, setBookReturn] = useState(null);
  useEffect(() => {
    const fetchBookIssueData = async () => {
      try {
        const response = await getParticularIssueBook(id, token);
        if (response.success) {
          console.log(response);
          setBookIssueData(response.data);

          const bookInstanceId = response.data.bookInstance.id;
          const issueId = response.data.bookIssueId;
          const historyResponse = await getBookInstanceIssueHistory(
            bookInstanceId,
            token
          );
          if (historyResponse.success) {
            console.log(historyResponse);
            setBookHistory(historyResponse.data);
          } else {
            console.error(
              "Failed to fetch book history:",
              historyResponse.data
            );
          }
          const isReturn = response.data.isReturn;

          if (isReturn === "Yes") {
            const ReturnResponse = await getParticularReturnBook(
              issueId,
              token
            );
            if (ReturnResponse.success) {
              console.log(ReturnResponse);
              setBookReturn(ReturnResponse.data);
            } else {
              console.error(
                "Failed to fetch book history:",
                historyResponse.data
              );
            }
          }
        } else {
          console.error("Failed to fetch book issue data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching book issue data:", error);
      }
    };

    fetchBookIssueData();
  }, [id, token]);

  if (!bookIssueData) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const issueDateObj = new Date(bookIssueData.dateOfIssue);
  const issueDate = issueDateObj.toLocaleDateString();
  const returnDateObj = new Date(bookIssueData.dateOfReturn);
  const returnDate = returnDateObj.toLocaleDateString();

  const isDue = bookIssueData.isReturn === "No" && currentDate >= returnDateObj;
  const isReturned = bookIssueData.isReturn === "Yes";

  return (
    <div>
      <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-lg mb-4">Book Issue Information:</h2>
        <div className="grid grid-cols-2 gap-4">

        <div  className="">
            <p  className="m-2">
              <span className="text-sm font-medium">Book Name:</span>
              <small className="text-xs">
               
                {bookIssueData.bookInstance.book.title}
              </small>
            </p>
          <p  className="m-2">
               <span className="text-sm font-medium">Author:</span>
              <small className="text-xs">
              
                {bookIssueData.bookInstance.book.authorName}
              </small>
            </p>
          <p  className="m-2">
               <span className="text-sm font-medium">ISBN:</span>
              <small className="text-xs">
                {" "}
                {bookIssueData.bookInstance.book.ISBN}
              </small>
            </p>
          <p  className="m-2">
               <span className="text-sm font-medium">Genre:</span>
              {bookIssueData.bookInstance.book.genre.map((item, index) => (
                <small className="text-sm" key={index}>
                  {item}
                </small>
              ))}
            </p>
          <p  className="m-2">
               <span className="text-sm font-medium">Status:</span>
              {isDue ? (
                <span className="rounded-md text-red-700 p-1">Due Return</span>
              ) : isReturned ? (
                <span className=" rounded-md text-orange-700 p-1">
                  Returned
                </span>
              ) : (
                <span className=" rounded-md text-green-700 p-1">Issued</span>
              )}
            </p>
          </div>
          <div>
          <p  className="m-2">
            
               <span className="text-sm font-medium">Book Id:</span>{" "}
              <small className="text-xs">{bookIssueData.bookInstance.id}</small>
            </p>
          <p  className="m-2">
           
               <span className="text-sm font-medium">Issue Date:</span>
              <small className="text-xs">{issueDate}</small>
            </p>
          <p  className="m-2">
               <span className="text-sm font-medium">Return Date</span>
              <small className="text-xs">{returnDate}</small>
            </p>
            {bookReturn !== null && (
              <>
              <p  className="m-2">
                   <span className="text-sm font-medium">Return On:</span>
                  <small className="text-xs">{ new Date(bookReturn.date).toLocaleDateString()}</small>
                </p>
                {
                  bookReturn.fine!==null && (
                    <>

                  <p  className="m-2">
                     <span className="text-sm font-medium">Fine Amount:</span>
                    <small className="text-xs">{bookReturn.fine.amount}</small>
                  </p>
                <p  className="m-2">
                     <span className="text-sm font-medium">isWaveOff:</span>
                    <small className="text-xs">{bookReturn.fine.isWaveOff}</small>
                  </p>
                  </>
                  )
                }
              
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg  border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-lg  mb-4">Book History:</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200  ">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Member Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Member Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y-2 divide-gray-200 ">
              {bookHistory.map((issueBook, index) => {
                const currentDate = new Date();
                const issueDateObj = new Date(issueBook.dateOfIssue);
                const issueDate =
                  issueDateObj.getDate() +
                  "/" +
                  issueDateObj.getMonth() +
                  1 +
                  "/" +
                  issueDateObj.getFullYear();
                const returnDate = new Date(issueBook.dateOfReturn);

                const isDue =
                  issueBook.isReturn === "No" && currentDate >= returnDate;
                const isReturned = issueBook.isReturn === "Yes";

                return (
                  <tr key={index} className="text-sm">
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
                      {issueDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {isDue ? (
                        <span className=" rounded-md text-red-900  text-xs p-1">
                          Due Return
                        </span>
                      ) : isReturned ? (
                        <span className=" rounded-md text-orange-900 text-xs p-1">
                          Returned
                        </span>
                      ) : (
                        <span className=" rounded-md text-green-900  text-xs p-1">
                          Issued
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex">
                      <Link
                        to={`../operation/bookLog/${issueBook.bookIssueId}/view`}
                        className="text-gray-400 bg-gray-200 p-1 rounded-sm"
                      >
                        <FaRegEye />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
