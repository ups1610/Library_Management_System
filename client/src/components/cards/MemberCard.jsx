import React from 'react'
import { IoIosPeople } from "react-icons/io";
export const MemberCard = () => {
  return (
    <article
        
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded bg-blue-600 p-2 text-white">
      <IoIosPeople />
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="text-lg font-bold">Total Members</h2>
        {/* Value */}
        <p className="text-gray-500">133</p>
      </div>
    </div>
  </article>
  )
}
