
import React, { useRef } from 'react'
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import { FaPrint } from "react-icons/fa";

const pageStyle=`
  @page{
    size: 20mm 20mm
  };
  @media all{
    .pageBreak {
      display: none
    }
  };

  @media print{
    .pageBreak {
      page-break-before:always;
    }
  }
`


export const BarcodeGenrator = ({bookInstance}) => {
  const ref=useRef();
  return (
    <div id="barcode" className='w-full flex  flex-col items-center bg-white justify-center'>
      <div>
      <Barcode  width={3} height={40} value={bookInstance} ref={ref}/>
      </div>
      

      <div>
      <ReactToPrint
            trigger={()=>    <button  className='bg-gray-800 text-sm text-white px-2 py-2.5 rounded-md flex no-wrap gap-1 items-center'> <FaPrint /> <span>Print Barcode</span></button>}
            content={()=>ref.current}
            pageStyle={pageStyle}
        />
      </div>
       
       
     
    </div>
  )
}

