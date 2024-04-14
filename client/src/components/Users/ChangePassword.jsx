import React, { useState } from "react";
import { changePassword } from "../../action/UserAction"; 
import toast from "react-hot-toast"; 
import { useAuth } from "../../context/Authetication";


function ChangePassword({ onClose, id }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const {token}=useAuth();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

 
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }


    changePassword(id, password,token)
      .then((response) => {
        if (response.success) {
          toast.success("Password changed successfully");
          onClose();
        } else {
          toast.error("Failed to change password");
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        toast.error("Failed to change password. Please try again later.");
      });
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
          <h2>Change Password</h2>

          <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="confirmPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>
            <button
              type="submit"
              className="ml-2 text-white  bg-gray-900 border-gray-900 border-2   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  w-full sm:w-auto px-2 py-1 text-md text-center "
            >
              Save
            </button>

            <button
              type="reset"
              className="ml-2 text-gray-900 border-gray-900 border-2   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  w-full sm:w-auto px-2 py-1 text-md text-center "
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
