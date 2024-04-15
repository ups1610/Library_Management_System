import React, { useEffect, useState } from 'react'
import { FaBook } from "react-icons/fa";
import { useAuth } from '../../context/Authetication';
import { fetchBooks } from '../../action/CatalogAction';
export const BookCard = () => {
  const [books, setBooks] = useState(0);
  const {token} = useAuth()

  useEffect(()=>{
    const fetchData = async() =>{
        const booksData = await fetchBooks(token)
        if(booksData.length > 0)
          setBooks(booksData.length)
    }
    fetchData()
  },[])

  return (
    <article   
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded-full bg-blue-600 p-2 text-white">
      <FaBook size={24} />
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="font-medium text-right">Books Inventory</h2>
        {/* Value */}
        <p className="text-gray-500 font-bold text-xl text-right">{books}</p>
      </div>
    </div>
  </article>
  )
}
