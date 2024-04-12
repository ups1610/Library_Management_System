import React, { useEffect, useState } from 'react';
import { IoMdBookmarks } from 'react-icons/io';
import { useAuth } from '../../context/Authetication';
import { getAllIssueBook } from '../../action/OperationsAction';



export const BookIssueCard = () => {
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await getAllIssueBook(token);
        if (response.success) {

          const issuedBooks = response.data.filter(book => book.isReturn === 'No');
          setTotalIssuedBooks(issuedBooks.length);
        } else {
          console.error('Failed to fetch issued books:', response.data);
        }
      } catch (error) {
        console.error('Error fetching issued books:', error);
      }
    };

    fetchIssuedBooks();
  }, [token]);

  return (
    <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full">
      <div className="flex justify-between items-center">
        <span className="inline-block rounded bg-blue-600 p-2 text-white">
          <IoMdBookmarks />
        </span>
        <div className="flex flex-col ml-2">
          {/* Title */}
          <h2 className="text-lg font-bold">Total Books Issued</h2>
          {/* Value */}
          <p className="text-gray-500">{totalIssuedBooks}</p>
        </div>
      </div>
    </article>
  );
};
