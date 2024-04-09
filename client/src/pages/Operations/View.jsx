import React from 'react'

export const View = () => {
    return (
        <div>
        <div className="w-full mt-5 rounded-lg  border border-gray-100 bg-white p-4 shadow-sm">
        
        <h2 className="text-lg mb-4">Book Issue Information:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className='text-md font-medium'>Book Name:</span><small className='text-sm'>  CONTABILIDAD GENERAL</small></p>
            <p><span className='text-md font-medium'>Author:</span><small className='text-sm'>Rama</small></p>
            <p><span className='text-md font-medium'>Genre:</span> <small className='text-sm'>devotional</small></p>
            <p><span className='text-md font-medium'>Status:</span>Issued</p>
           
          </div>
 
          <div>
            <p> <span className='text-md font-medium'>Book Id:</span>  <small className='text-sm'>1</small></p>
          
            <p>  <span className='text-md font-medium'>Issue Date:</span> <small className='text-sm'>26 Mar 2024</small></p>
            <p><span className='text-md font-medium'>Return Date</span>  <small className='text-sm'>26 Mar 2024</small></p>
            <p><span className='text-md font-medium'>Fine Amount:</span>  <small className='text-sm'>0.00</small></p>
            <p><span className='text-md font-medium'>Payment Mode:</span>  <small className='text-sm'>Cash</small></p>
          </div>
        </div>
      </div>


      <div className="w-full mt-6 rounded-lg  border border-gray-100 bg-white p-4 shadow-sm">
        
        <h2 className="text-lg  mb-4">Book History:</h2>
        
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
             Member Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Member Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
            Operation
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm whitespace-nowrap">John Doe</td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">24/05/1995</td>
            <td className="px-6 py-4 text-sm  whitespace-nowrap">Web Developer</td>
            <td className="px-6 py-4 text-sm  whitespace-nowrap">$120,000</td>
          </tr>
          
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
      </div>
      </div>
    );
  };
