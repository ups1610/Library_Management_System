import React from "react";

export const IssueBook = () => {
  return (
    <div>
    <h1> Issue Book</h1>
    <div className="w-full mt-5 rounded-lg bg-white p-4 shadow-sm  border-t-2 border-black">
    
      <div className="max-w-md ">
        <form className="space-y-4">
          {/* Member */}
          <div>
            <label
              htmlFor="member"
              className="block text-sm font-medium text-gray-700"
            >
              Member:
            </label>
            <input
              list="members"
              id="member"
              name="member"
              autoComplete="off"
              className="w-full p-1 border-2  focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
            />
            <datalist id="members">
              <option value="John Doe" />
              <option value="Jane Smith" />
              {/* Add more member options as needed */}
            </datalist>
          </div>

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
              className="w-full p-1 border-2  focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
            />
            <datalist id="books">
              <option value="Book 1" />
              <option value="Book 2" />
              {/* Add more book options as needed */}
            </datalist>
          </div>

          {/* Issue Date */}
          <div>
            <label
              htmlFor="issueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Issue Date:
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              className="w-full p-1 border-2  focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
            />
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
              className="w-full p-1 border-2  focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className=" py-2  px-10 border-2  bg-black focus:border-0 focus:outline-none rounded-md text-white font-normal text-sm"
            >
             Issue
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};
