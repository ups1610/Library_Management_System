import React from 'react';
import logo from "../../assets/logo.png";
import { useParams } from 'react-router-dom';
import axios from 'axios'
export default function RequestPayment() {
    const { amount, name, id, narration, email } = useParams();
        console.log(amount,name)
    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
                        <div className="text-gray-700 font-semibold text-lg">LibSphere</div>
                    </div>
                    <div className="text-gray-700">
                        <div className="font-bold text-xl mb-2">INVOICE</div>
                        <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                    {name && <div className="text-gray-700 mb-2">{name}</div>}
                    {email && <div className="text-gray-700">{email}</div>}
                </div>
                {narration && amount && (
                    <table className="w-full text-left mb-8">
                        <thead>
                            <tr>
                                <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-4 text-gray-700">{narration}</td>
                                <td className="py-4 text-gray-700">₹ {amount}</td>
                                <td className="py-4 text-gray-700">₹ {amount}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {amount && (
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 mr-2">Total:</div>
                        <div className="text-gray-700 font-bold text-xl">₹ {amount}</div>
                    </div>
                )}
                {amount && (
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 font-bold text-xl">
                            <button className='px-4 py-2 bg-gray-800 text-white text-sm rounded-md font-normal'  onClick={checkoutHandler}> Pay ₹ {amount} </button>
                        </div>
                    </div>
                )}
                <div className="border-t-2 border-gray-300 pt-8 mb-8">
                    <div className="text-gray-700 mb-2">Payment made to Libshere is non-refundable.</div>
                    <div className="text-gray-700 mb-2">Do not share your bank details with anyone.</div>
                </div>
            </div>
        </div>
    );
}



const checkoutHandler= async()=>{


    // razorpay.key_id =rzp_test_ohi0Hlve3YUNIK
    // razorpay.key_secret=HKDFPlAbQeiUqARUF9oHEILV

    const options = {
        key: "rzp_test_ohi0Hlve3YUNIK", 
        amount: "123", 
        currency: "INR",
        name: "Acme Corp", 
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: "order_O2LFzzZV5NZZ9s", 
        handler: function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        prefill: { 
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000" 
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
  
    razor.open();
      
    


}