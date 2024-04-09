import React, { useState } from "react";

function ReturnBook({ onClose }) {
  const [isFineWaived, setIsFineWaived] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="flex justify-center items-center h-screen">
        <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
          <button
            onClick={onClose}
            type="button"
            className="absolute -right-0 -top-0 font-bold p-4 text-gray-400"
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
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Book */}
            <div>
              <label
                htmlFor="book"
                className="block text-sm font-medium text-gray-700"
              >
                Book:
              </label>
              <input
                list="books"
                id="book"
                name="book"
                autoComplete="off"
                className="w-full p-1 border-2 border-gray-500 rounded-md text-gray-600 font-normal text-sm"
              />
              <datalist id="books">
                <option value="Book 1" />
                <option value="Book 2" />
                {/* Add more book options as needed */}
              </datalist>
            </div>

            {/* Return Date */}
            <div>
              <label
                htmlFor="returnDate"
                className="block text-sm font-medium text-gray-700"
              >
                Return Date:
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                defaultValue={todayDate}
                className="w-full p-1 border-2 border-gray-500 rounded-md text-gray-600 font-normal text-sm"
              />
            </div>

            {/* Fine */}
            <div>
              <label
                htmlFor="fine"
                className="block text-sm font-medium text-gray-700"
              >
                Fine:
              </label>
              <select
                id="fine"
                name="fine"
                className="w-full p-1 border-2 border-gray-500 rounded-md text-gray-600 font-normal text-sm"
              >
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                {/* Add more fine options as needed */}
              </select>
            </div>

            {/* Fine Waive-off */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fineWaiver"
                name="fineWaiver"
                checked={isFineWaived}
                onChange={(e) => setIsFineWaived(e.target.checked)}
                className="h-4 w-4 text-gray-700 rounded focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor="fineWaiver"
                className="ml-2 block text-sm text-gray-900"
              >
                Waive off fine
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="py-2 px-10 border-2 bg-black focus:border-0 focus:outline-none rounded-md text-white font-normal text-sm"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReturnBook;
