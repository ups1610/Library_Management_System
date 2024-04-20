import React, { useEffect, useState } from "react";
import {
  getBooks,
  getMember,
  getBookInstances,
  issueBook 
} from "../../action/OperationsAction";
import { useAuth } from "../../context/Authetication";
import toast from "react-hot-toast";


import {useNavigate} from "react-router-dom";
export const IssueBook = () => {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const { token, user } = useAuth();
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    member: "",
    bookInstance: "",
    dateOfIssue: "",
    dateOfReturn: "",
    issueBy: user.userId
  });

  useEffect(() => {
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMember(token);
      if (response.success) {
        setMembers(response.data);
      } else {
        console.error("Failed to fetch members:", response.data);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await getBooks(token);
      if (response.success) {
        setBooks(response.data);
      } else {
        console.error("Failed to fetch books:", response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleBookChange = async (event) => {
    const selectedBookId = event.target.value;
    setSelectedBookId(selectedBookId);

    try {
      const response = await getBookInstances(selectedBookId, token);

      if (response.success) {
        console.log("++++++++++",response)
        setInstances(response.data);
        console.log("========="+instances.length)
      } else {
        console.error("Failed to fetch instances:", response.data);
      }
    } catch (error) {
      console.error("Error fetching instances:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
    name === "dateOfIssue" || name === "dateOfReturn"
      ? new Date(value).toISOString() // Convert the date to ISO string
      : value;
  setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await issueBook(formData, token);
      if (response.success) {

        toast.success("Book issued successfully:");
        navigate("/dashboard/operation/bookLog");
      } else {
        toast.error("Failed to issue book:", response.data);
      }
    } catch (error) {
      toast.error("Failed to issue book:", error.message);
      console.error("Error issuing book:", error);
    }
  };

  return (
    <div>
      <h1>Issue Book</h1>
      <div className="w-full mt-5 rounded-lg bg-white p-4 flex  flex-wrap shadow-sm border-t-2 border-black">
        <div className="max-w-md border-2  m-auto p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Member */}
            <div>
              <label
                htmlFor="member"
                className="block text-sm font-medium text-gray-700"
              >
                Member:
              </label>
              <select
                id="member"
                name="member"
                className="w-full p-1 border-2 focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
                value={formData.member}
                onChange={handleChange}
                required
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member.memberId} value={member.memberId}>
                    {member.memberId} - {member.memberName}
                  </option>
                ))}
              </select>
            </div>

            {/* Book */}
            <div>
              <label
                htmlFor="book"
                className="block text-sm font-medium text-gray-700"
              >
                Book:
              </label>
              <select
                id="book"
                name="bookInstance"
                className="w-full p-1 border-2 focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
                onChange={handleBookChange}
                required
              >
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Instance */}
            <div>
              <label
                htmlFor="bookInstance"
                className="block text-sm font-medium text-gray-700"
              >
                Book Instance:
              </label>
              <select
                id="bookInstance"
                name="bookInstance"
                className="w-full p-1 border-2 focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
                onChange={handleChange}
                required
              >
                <option value="">Select a book instance</option>
                {instances
                  .filter((instance) => instance.status === "Available")
                  .map((instance) => (
                    <option key={instance.id} value={instance.id}>
                      {instance.id} - {instance.imprint}
                    </option>
                  ))
    
                  }
              </select>
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
                id="dateOfIssue"
                name="dateOfIssue"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full p-1 border-2 focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
                required
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
                id="dateOfReturn"
                name="dateOfReturn"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full p-1 border-2 focus:border-0 focus:outline-none rounded-md text-gray-600 font-normal text-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="py-2 px-10 border-2 bg-black focus:border-0 focus:outline-none rounded-md text-white font-normal text-sm"
              >
                Issue
              </button>
            </div>
          </form>
        </div>

        <div className=" p-4 hidden md:inline">
          <div>
            {/* Member */}

          </div>

          <div>
            {/* Book */}
          </div>

        </div>
      </div>
    </div>
  );
};
