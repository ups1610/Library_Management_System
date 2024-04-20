import React, { useState } from 'react'
import { useAuth } from '../context/Authetication';


function LoginModel({onClose}) {

  const auth=useAuth();
  console.log(auth)
  const [userName,setUser]=useState("");
  const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);


  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoading(true);
    
    auth.signUp(userName,password);

    setLoading(false)
  }



  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50'>
        <div className="flex justify-center items-center h-screen">
            <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
              <button onClick={onClose}
                type="button"
                className="absolute -end-0 -top-0 font-bold p-4 text-gray-400 "
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

              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">LibSphere</h1>

              <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Please sign in to continue using LibShpere - A Simple Library Management System
              </p>

              <form action="#" className="mb-0 mt-6 bg-slate-900 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                <p className="text-center text-white text-lg font-medium">Sign in to your account</p>

                <div>
                  <label htmlFor="Username" className="sr-only">UserName</label>

                  <div className="relative">
                    <input
                      type="text"
                      className="text-black w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Username"
                      value={userName}
                      onChange={(e)=>setUser(e.target.value)}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">Password</label>

                  <div className="relative">
                    <input
                      type="password"
                      className="text-black w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter Password"
                        value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
               
                  className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Sign in
                </button>

              
              </form>
            </div>
          </div>
    </div>
  )
}

export default LoginModel