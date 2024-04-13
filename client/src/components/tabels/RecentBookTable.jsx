import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/Authetication";
import { fetchBooks } from "../../action/CatalogAction";


export const RecentBookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { token } = useAuth();

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async () => {
    try {
      const response = await fetchBooks(token);
      setBooks(response.slice(0, 5));
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false); 
    }
  };

  return (
    <div className="text-lg bg-white p-6 rounded-md mb-2 mt-4">
      <span className="flex justify-between">
        <h2>Book List </h2>{" "}
        <Link to="/dashboard/member/MemberTable/add">
          <small className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center border-gray-500 ">
            Add New Book
          </small>
        </Link>
      </span>
      <div className="overflow-x-auto">
        {loading ? ( 
          <p className="text-xs">Loading...</p>
        ) : books.length === 0 ? ( 
          <p className="text-xs">No books available</p>
        ) : (
          <table className="min-w-full mt-6 border-0 divide-y-2 divide-gray-200 bg-white text-sm align-center">
            <thead className="text-gray-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  ISBN
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Title
                </th>
               
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="border-0 divide-y divide-gray-200 text-center">
              {books.map(book => (
                <tr key={book.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {book.ISBN}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                    {book.title}
                  </td>
                 
                  <td className="whitespace-nowrap px-4 py-2 ">
                    <Link to={`catalog/book/view/${book.id}`} className="flex nowrap gap-1 text-blue-500">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <hr></hr>
        <Link to="catalog/books" className="text-xs float-right mt-4 text-blue-700">
          See All
        </Link>
      </div>
    </div>
  );
};
