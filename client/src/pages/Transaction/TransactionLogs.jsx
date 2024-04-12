import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { CiFilter } from "react-icons/ci";
import { MdFilterAltOff } from "react-icons/md";

import { useAuth } from "../../context/Authetication";
import { getAllTransaction } from "../../action/TransactionAction";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionPDF from "../../utils/pdf/Transaction";
import { BsFileEarmarkPdf } from "react-icons/bs";
// import Filter from "../../components/transaction/Filter";

function TransactionLogs() {
  const [transactions, setTransactions] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModel, setFilterModel] = useState(false);
  const { token,user } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getAllTransaction(token);
      if (response.success) {
        setTransactions(response.data);
        setOriginalTransactions(response.data);
      } else {
        console.error("Failed to fetch transactions:", response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  const applyFilters = async (filters) => {
    setLoading(true);
    try {
      let filteredTransactions = originalTransactions.filter((transaction) => {
        let passFilter = true;
        if (filters.memberName && !transaction.member.includes(filters.memberName)) {
          passFilter = false;
        }
        if (filters.fromDate && filters.toDate) {
          const transactionDate = new Date(transaction.date);
          const fromDate = new Date(filters.fromDate);
          const toDate = new Date(filters.toDate);
          if (!(transactionDate >= fromDate && transactionDate <= toDate)) {
            passFilter = false;
          }
        }
        if (filters.narration && !transaction.narration.includes(filters.narration)) {
          passFilter = false;
        }
        if (filters.mode && transaction.mode !== filters.mode) {
          passFilter = false;
        }
        return passFilter;
      });
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
  
   
    const filteredTransactions = originalTransactions.filter((transaction) => {
    
      const transactionValues = Object.values(transaction).map(value =>
        typeof value === 'string' ? value.toLowerCase() : value
      );
  
  
      return transactionValues.some(value =>
        typeof value === 'string' && value.includes(searchValue)
      );
    });
  
 
    setTransactions(filteredTransactions);
  };
  

  const resetFilters = () => {
    setTransactions(originalTransactions);
    setFilterModel(false);
  };

  return (
    <div className="md:w-full w-screen mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center"
            onClick={() => setFilterModel(true)}
          >
            <CiFilter /> Filter
          </button>
          {filterModel && <Filter onClose={() => setFilterModel(false)} applyFilters={applyFilters} resetFilters={resetFilters} />}

          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">
              Book
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search Transaction"
              className="border-2 px-2 w-full rounded-md border-gray-200 py-2 pe-2 sm:text-sm"
              onChange={handleSearch}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button type="button" className="text-gray-600 hover:text-gray-700">
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
        <PDFDownloadLink   className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center" document={<TransactionPDF transactions={transactions} username={user.userName}/>}  fileName="transactions.pdf">
  {({ loading }) => (loading ? "Loading..." : <><BsFileEarmarkPdf /> Download PDF</>)}
</PDFDownloadLink>
        </div>
      </div>

      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="divide-y-2 divide-gray-200">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">#</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Transaction Id</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Member Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mode</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Amount</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Narration</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Initiated By</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-gray-200 text-center">
            {loading ? (
              <tr>
                <td colSpan="8" className="py-4">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4">
                  No records available.
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={transaction.transactionId}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index+1}</td>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">{transaction.transactionId}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.date}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.member}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.mode}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.amount}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.narration}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.initiatedBy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">{/* Pagination */}</ol>
      </div>
    </div>
  );
}

function Filter({ onClose, applyFilters, resetFilters }) {
  const [filters, setFilters] = useState({
    memberName: "",
    fromDate: "",
    toDate: "",
    narration: "",
    initiatedBy: "",
    mode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="flex justify-center items-center h-screen">
        <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
          <button
            onClick={onClose}
            type="button"
            className="absolute -end-0 -top-0 font-bold p-4 text-gray-400"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <form className="w-[400px]  mt-5 mx-auto" onSubmit={handleSubmit}>
            {/* Member Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="memberName"
                value={filters.memberName}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="memberName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Member Name
              </label>
            </div>

            {/* From Date */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="fromDate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                From Date
              </label>
            </div>

            {/* To Date */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="toDate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                To Date
              </label>
            </div>

            {/* Narration */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="narration"
                value={filters.narration}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="narration"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Narration
              </label>
            </div>

            {/* Initiated By */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="initiatedBy"
                value={filters.initiatedBy}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="initiatedBy"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Initiated By
              </label>
            </div>

            {/* Mode */}
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="mode"
                value={filters.mode}
                onChange={handleInputChange}
                className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="">Mode</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
              <label
                htmlFor="mode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mode
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex nowrap">
            <button
              type="submit"
              className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center"  >
             <CiFilter /> Apply
            </button>

            {/* Reset Filter Button */}
            <button
              type="button"
              className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center" onClick={resetFilters}
            >
             <MdFilterAltOff /> Reset 
            </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransactionLogs;
