import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authetication";
import { getTodayTransaction } from "../../action/TransactionAction";

export const RecentTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTodayTransaction(token);
        if (response.success) {
          setTransactions(response.data);
        } else {
          console.log("Failed to fetch transactions:", response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="text-lg bg-white p-6 rounded-md mb-2 mt-4">
      <span className="flex justify-between">
        <h2> Today Transactions </h2>{" "}
        <Link to="/dashboard/transactions" className="text-xs float-right mt-4 text-blue-700">
          {" "}
          See All
        </Link>
      </span>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-xs">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-xs">No transactions for today.</p>
        ) : (
          <table className="min-w-full mt-6 border-0 divide-y-2 divide-gray-200 bg-white text-sm align-center">
            <thead className="text-gray-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Transaction ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Member Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Narration
                </th>
              </tr>
            </thead>
            <tbody className=" border-0 divide-y divide-gray-200 text-center">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {transaction.transactionId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {transaction.memberName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {transaction.amount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {transaction.narration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <hr></hr>
      </div>
    </div>
  );
};
