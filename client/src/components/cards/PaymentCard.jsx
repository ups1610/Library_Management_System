import React, { useEffect, useState } from 'react'
import { FaMoneyBillWave } from "react-icons/fa";
import { getTodayTransaction } from '../../action/TransactionAction';
import { useAuth } from '../../context/Authetication';

export const PaymentCard = () => {
    const [totalCollection,setTotal]=useState(0);


    const {token}=useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const response = await getTodayTransaction(token);
        if (response.success) {
          
            response.data.map((transaction)=>{
              setTotal(totalCollection+transaction.amount);
            })
        } else {
          console.error('Failed to fetch user data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <article
        
    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
  >
    <div className="flex justify-between items-center">
      <span className="inline-block rounded bg-blue-600 p-2 text-white">
      <FaMoneyBillWave />
      </span>
      <div className="flex flex-col ml-2">
        {/* Title */}
        <h2 className="text-lg font-bold">Today Collection</h2>
        {/* Value */}
        <p className="text-gray-500">{totalCollection}</p>
      </div>
    </div>
  </article>
  )
}
