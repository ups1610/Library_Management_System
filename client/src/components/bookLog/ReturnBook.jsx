import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authetication";
import { calculateFine, returnBook } from "../../action/OperationsAction";
import toast from "react-hot-toast"
function ReturnBook({ onClose, issueId, bookTitle }) {
  const [isFineWaived, setIsFineWaived] = useState(false);
  const [fine, setFine] = useState(0);
  const { token, user } = useAuth();


  const fetchData=async()=>{
    const response=  await calculateFine(issueId, token)
    console.log(response);
       if (response.success) {
         setFine(response.data);
       } else {
           toast.error(response.data);
       }
  }

  useEffect(() => {
    fetchData();
  
   
    
  }, [issueId, token]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const returnData = {
      bookIssue: issueId,
      date: new Date().toISOString(),
      fine: fine,
      waveOffFine: isFineWaived,
      mode: "cash", 
      collectBy: user.userId, 
    };

  
      const response =returnBook(returnData, token);
      if (response.success) {
        console.log("Book returned successfully:", response.data);
        onClose(); 
      } else {
        toast.error(response.data);
      }
   
  };

  const todayDate = new Date().toISOString().split("T")[0];

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

          <div className="mt-3 mb-5">
          <h3> {bookTitle}</h3>

          <h4>  {fine !== 0 && (  <>Fine:  {fine}   </>  )}</h4>
          
          <form className="space-y-4" onSubmit={handleFormSubmit}>
           

           

           

            {/* Fine Waive-off */}
            {fine !== 0 && (
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
            )}

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="py-2 px-4 border-2 bg-black focus:border-0 focus:outline-none rounded-md text-white font-normal text-sm"
              >
                Return
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnBook;
