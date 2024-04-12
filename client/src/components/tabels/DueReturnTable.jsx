import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authetication";
import { getAllIssueBook } from "../../action/OperationsAction";

export const DueReturnTable = () => {
  const [dueReturn, setDueReturn] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await getAllIssueBook(token);
        if (response.success) {
          const today = new Date();
          const returnBooks = response.data.filter(book => {
            const returnDate = new Date(book.dateOfReturn);
            return book.isReturn === "No" && today >= returnDate;
          });
          setDueReturn(returnBooks);
        } else {
          console.error("Failed to fetch issued books:", response.data);
        }
      } catch (error) {
        console.error("Error fetching issued books:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchIssuedBooks();
  }, [token]);

  return (
    <div className="text-lg bg-white p-6 rounded-md mb-2 mt-4">
      <span className="flex justify-between">
        <h2> Due Book Return </h2>{" "}
        <Link to="/dashboard/operation/bookLog" className="text-xs float-right mt-4 text-blue-700">
          {" "}
          See All
        </Link>
      </span>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-xs">Loading...</p>
        ) : (
          dueReturn.length === 0 ? 
          <p className="text-xs">No Due</p> 
          : (
          <table className="min-w-full mt-6 border-0 divide-y-2 divide-gray-200 bg-white text-sm align-center">
            <thead className="text-gray-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Instance</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Title</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Member Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Return Date</th>
              </tr>
            </thead>
            <tbody className=" border-0 divide-y divide-gray-200 text-center">
              {
                dueReturn.map((issueBook, index) => {
                  const returnDateObj = new Date(issueBook.dateOfReturn);
                  const returnDate =
                    returnDateObj.getDate() +
                    "/" +
                    (returnDateObj.getMonth() + 1) +
                    "/" +
                    returnDateObj.getFullYear();
                  return (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{issueBook.bookInstance.id}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{issueBook.bookInstance.book.title}</td>
                      <td className="whitespace-nowrap px-4 py-2">{issueBook.memberName}</td>
                      <td className="whitespace-nowrap px-4 py-2">{returnDate}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        ))}
        <hr></hr>
      </div>
    </div>
  );
};
