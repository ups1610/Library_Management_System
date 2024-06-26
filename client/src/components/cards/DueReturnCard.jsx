import React, { useEffect, useState } from 'react'
import { TbCalendarDue } from "react-icons/tb";
import { useAuth } from '../../context/Authetication';
import { getAllIssueBook } from '../../action/OperationsAction';
export const DueReturnCard = () => {

  const [dueReturn, setDueRetrun] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await getAllIssueBook(token);
        if (response.success) {
          const today = new Date();
          const returnBooks = response.data.filter(book => {

            const returnDate = new Date(book.dateOfReturn);
           return  book.isReturn === "No" && today>=returnDate

          }).length;
          setDueRetrun(returnBooks);
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
    <article
        
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded-full bg-blue-600 p-2 text-white">
      <TbCalendarDue size={24}/>
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="text-right font-medium">Total Due Return</h2>
        {/* Value */}
        <p className="text-gray-500 text-right text-xl font-bold">{dueReturn}</p>
      </div>
    </div>
  </article>
  )
}
