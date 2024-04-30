import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getEmailConfigurations, setEmailConfigurations } from "../../action/EmailAction";

import { useAuth } from "../../context/Authetication";

function EmailConfiguration() {
  const [emailConfig, setEmailConfig] = useState({
    host: "",
    port: "",
    userName: "",
    pass: "",
  });

  const {token}=useAuth();
  useEffect(() => {

  
      getEmailConfigurations(token)
      .then((response) => {
        if(response.success){
          setEmailConfig(response.data);
        }
      
      })
      .catch((error) => {
        console.error("Error fetching email configuration data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    toast.promise(
      setEmailConfigurations(emailConfig, token),
      {
        loading: "Saving Changes...",
        success: (response) => {
          if (response.success) {
            return "Changes saved successfully!";
          } else {
            throw new Error(response.data);
          }
        },
        error: (err) => {
          return err.getMessage || "Failed to save changes. Please try again.";
        }
      }
    );
  };


  return (
    <div>
      <h1 className="text-lg">Email Configuration</h1>

      <div className="flex flex-wrap flex-col-reverse md:flex-row gap-2 justify-around m-4">
        <div className="bg-white px-5 py-6 w-full md:w-[48%]">
          <h3>Tip:</h3>
          <table className="bg-blue-200 m-2 border-l border-l-2 border-solid border-blue-500 w-full p-4 rounded-sm">
            <thead>
           
                <h5 className="text-md">Gmail Setting:</h5>
            
            </thead>
            <tbody className="text-xs">
              <tr className="border-b mt-2 hover:bg-gray-50">
                <td className="py-2 px-1">Mail Server</td>
                <td className="py-2">smtp.gmail.com</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-1">SMTP Port</td>
                <td className="py-2">587</td>
              </tr>
            </tbody>
          </table>
          <span className="text-sm text-red-700 italic">
            <b>Q.</b> How to generate app password for Gmail?
          </span>
          <div>
            <span className="text-green-700 text-sm">Solution</span>
            <p className="text-xs">
              <li>- Enable 2-step verification in Gmail settings.</li>
              <li>- Navigate to "Security" &rarr; "App Passwords".</li>
              <li>- Generate an App Password and use it for authentication.</li>
            </p>
          </div>
        </div>
        <div className="bg-white px-5 py-6 w-full md:w-[48%]">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-sm font-normal">
                  Mail Server <span className="text-red-500">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    name="host"
                    value={emailConfig.host}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full md:w-2/3 p-1.5 mt-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-sm font-normal">
                  SMTP Port <span className="text-red-500">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    name="port"
                    value={emailConfig.port}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full md:w-2/3 p-1.5 mt-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-sm font-normal">
                  User Name <span className="text-red-500">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    name="userName"
                    value={emailConfig.userName}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full md:w-2/3 p-1.5 mt-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-sm font-normal">
                  Password <span className="text-red-500">*</span>
                </td>
                <td>
                  <input
                    type="password"
                    name="pass"
                    value={emailConfig.pass}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full md:w-2/3 p-1.5 mt-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={saveChanges}
            className="mt-6 bg-black text-white px-4 text-sm py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfiguration;
