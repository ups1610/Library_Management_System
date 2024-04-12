import React, { useState } from 'react';
import { X } from 'lucide-react';
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';

function MembershipPlan({ onClose, updatePlanList }) {
    const { token } = useAuth();
    const [plan, setPlan] = useState({
        planName: '',
        description: '',
        price: '',
        durationMonth: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const savePlan = async (e) => {
        e.preventDefault();
        try {
            await MemberAction.addNewPlan(plan,token);
            onClose();
            updatePlanList();
        } catch (error) {
            console.error('Error adding new plan:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
                            Add New Membership Plan
                        </h1>

                        <form
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        >
                            <div>
                                <label className="block text-gray-600 text-base font-normal">
                                    Membership Plan Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="planName"
                                        value={plan.planName}
                                        onChange={handleChange}
                                        className="w-full h-8 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-base font-normal">
                                    Description
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="description"
                                        value={plan.description}
                                        onChange={handleChange}
                                        className="w-full  border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-base font-normal">
                                    Price
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={plan.price}
                                        onChange={handleChange}
                                        className="w-full h-8 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-base font-normal">
                                    Duration (in months)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="durationMonth"
                                        value={plan.durationMonth}
                                        onChange={handleChange}
                                        className="w-full h-8 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={savePlan}
                                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipPlan;


