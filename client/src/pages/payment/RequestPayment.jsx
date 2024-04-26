import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PaymentSuccess from '../../components/Membership/PaymentSuccess';
import { toast } from 'react-hot-toast';
export default function RequestPayment() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentID, setPaymentId] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8088/membershipService/getMembershipOrder?orderId=${orderId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setOrder(response.data);
            setLoading(false);
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            setLoading(false);
        }
    };

    const checkoutHandler = async (order, logo) => {
        console.log(order);
        const options = {
            key: "rzp_test_ohi0Hlve3YUNIK",
            amount: order.amount,
            currency: "INR",
            name: "Libsphere",
            description: "Membership",
            image: logo,
            order_id: order.orderId,
            handler: async function (response) {
                toast.promise(
                    // Axios call to validate membership order
                    axios.post(`http://localhost:8088/membershipService/validateMembershipOrder`, {
                        "orderId": response.razorpay_order_id,
                        "paymentId": response.razorpay_payment_id,
                        "signature": response.razorpay_signature
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                    {
                     
                        loading: 'Validating Payment...',
                       
                        success: () => {
                         
                            setPaymentId(response.razorpay_payment_id);
                            return 'Membership Activated successfully';
                        },
                       
                        error: (error) => {
                            console.error(error);
                            return 'Failed to validate payment.';
                        },
                    }
                );
            },
            prefill: {
                name: order.memberName,
                email: order.memberEmail,
                contact: order.memberMobile
            },
            notes: {},
            theme: {
                color: "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        razor.open();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>Order not found.</div>;
    }

    if (paymentID) {
        return <PaymentSuccess paymentId={paymentID} />;
    }

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
                    {order.memberName && <div className="text-gray-700 mb-2">{order.memberName}</div>}
                    {order.memberEmail && <div className="text-gray-700">{order.memberEmail}</div>}
                </div>
                {order.amount && (
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
                                <td className="py-4 text-gray-700">Membership </td>
                                <td className="py-4 text-gray-700">₹ {order.amount}</td>
                                <td className="py-4 text-gray-700">₹ {order.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {order.amount && (
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 mr-2">Total:</div>
                        <div className="text-gray-700 font-bold text-xl">₹ {order.amount}</div>
                    </div>
                )}
                {order.status === "Completed" ? (
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 font-bold text-xl">Payment already done</div>
                    </div>
                ) : (
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 font-bold text-xl">
                            <button className='px-4 py-2 bg-gray-800 text-white text-sm rounded-md font-normal' onClick={() => checkoutHandler(order, logo)}> Pay ₹ {order.amount} </button>
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
