import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import MemberAction from '../../action/MemberAction';
import UpdatePlan from './UpdatePlan';

function ViewMembershipPlan({ onClose }) {
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await MemberAction.getAllMemberPlans();
            setPlans(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    const deletePlan = (e, id) => {
        e.preventDefault();
        MemberAction.deletePlan(id).then((res) => {
            if (plans) {
                setPlans((prevElement) => {
                    return prevElement.filter((plan) => plan.id !== id)
                })
            }
        })
    }
    const editPlan = (id) => {
        const selected = plans.find((plan) => plan.id === id);
        setSelectedPlan(selected);
        setShowModal(true);
    };
    const updatePlan = (updatedPlan) => {
        MemberAction.updatePlan(updatedPlan, updatedPlan.id)
            .then((response) => {
                console.log(response);
                console.log("Member Updated Successfully....");
                setPlans((prevPlans) =>
                    prevPlans.map((plan) =>
                        plan.id === updatedPlan.id ? updatedPlan : plan
                    )
                )
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <h1 className="text-center text-xl font-bold text-slate-800 sm:text-2xl mb-6 mt-4">
                    Membership Plans Available
                </h1>

                <div className="overflow-x-auto min-w-full rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Membership Plan</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Duration</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        {!loading && plans && plans.length > 0 && (
                            <tbody className="divide-y divide-gray-200">
                                {plans.map((plan) => (
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{plan.planName}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{plan.price}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{plan.durationMonth}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                                                <button onClick={() => editPlan(plan.id)}
                                                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                                >
                                                    Edit
                                                </button>
                                                <button onClick={(e) => deletePlan(e, plan.id)}
                                                    className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                                                >
                                                    Delete
                                                </button>
                                            </span>
                                        </td>
                                    </tr>))}
                            </tbody>)}
                    </table>
                </div>
            </div>
            {showModal && <UpdatePlan onClose={() => setShowModal(false)} plan={selectedPlan} updatePlan={updatePlan} />}
        </div>
    )
}

export default ViewMembershipPlan