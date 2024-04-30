import React, { useState } from "react";
import toast from "react-hot-toast";
import { sendMail } from "../../action/MemberAction";
import { responsive } from "@cloudinary/react";
import { useAuth } from "../../context/Authetication";
import { LuSubtitles } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";
export default function MailEditor({ onClose, id }) {
  const [mail, setMail] = useState({
    id: id,
    subject: "",
    body: "",
  });


const {token}=useAuth()
  const handleSend = () => {
    toast.promise(
      sendMail(mail,token),
      {
        loading: 'Sending Mail...',
        success: (response) => {
          if (response.success) {
            onClose();
            return "Mail sent Successfully";
          } else {
            throw new Error(response.data);
          }
        },
        error: (e) => {
          return e.message || "Something went wrong";
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="flex  flex-col gap-4 justify-center items-center h-screen fon-normal text-sm ">

        <div className="bg-white  p-4 ronded-sm    flex flex-col gap-4 w-full  m-2 md:w-1/2 h-auto"> 
          <div>
            <div className="flex gap-2  w-full border-[1px]  font-normal items-center px-2 py-2 ">

          <LuSubtitles className="text-gray-200" />  
          <input
          type="text"
      
          className="w-full border-0 focus:outline-none"
          required
          placeholder="Enter Subject"
          value={mail.subject}
          onChange={(e) =>
            setMail((prev) => ({ ...prev, subject: e.target.value }))
          }
        />
          </div>

          <textarea
          rows={7}
          className="border-[1px] p-2 w-full   mt-4 focus:outline-none "
          placeholder="Type Your message here..."
          value={mail.body}
          onChange={(e) =>
            setMail((prev) => ({ ...prev, body: e.target.value }))
          }
        />
          
          </div>

       

       
          <div className="flex flex-nowrap gap-2  mt-2">
          <button onClick={handleSend} className="flex items-center gap-2 bg-black px-2.5 py-2 text-white rounded-md"> <IoIosSend /><span> Send</span></button>
        <button onClick={onClose} className="text-red-700"> Close</button>
            </div>
      
      </div>
    </div>
    </div>
  );
}
