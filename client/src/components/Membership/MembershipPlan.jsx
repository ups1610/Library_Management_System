import React, { useState } from 'react';
import { X } from 'lucide-react';
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';
import toast from "react-hot-toast";
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
    
             MemberAction.addNewPlan(plan,token)
            .then((resp)=>{
                    if(resp.success){
                        onClose();
                       
                    }else{
                            toast.error(resp.data);
                    }
            })
            .catch((err)=>{
                    console.log(err);
            })

            
          
     
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative max-w-xl rounded-lg h-auto bg-gray-100 p-6 shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X size={24}/>
                    </button>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-xl font-bold text-slate-800 sm:text-3xl">
                            Add New Membership Plan
                        </h1>

                        <form
                            className="mb-0 mt-6 border-2 space-y-4 rounded-lg p-4  sm:p-6 lg:p-8"
                        >
                            <div>
                                <label className="block text-gray-600 text-base font-medium">
                                    Membership Plan Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="planName"
                                        value={plan.planName}
                                        onChange={handleChange}
                                        className="w-full h-10 border-gray-200 rounded-md p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-base font-medium">
                                    Description
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="description"
                                        value={plan.description}
                                        onChange={handleChange}
                                        className="w-full h-20 rounded-md border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-base font-medium">
                                    Price
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={plan.price}
                                        onChange={handleChange}
                                        className="w-full h-10 rounded-md border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-base font-medium">
                                    Duration (in months)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="durationMonth"
                                        value={plan.durationMonth}
                                        onChange={handleChange}
                                        className="w-full h-10 rounded-md border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={savePlan}
                                className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
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


