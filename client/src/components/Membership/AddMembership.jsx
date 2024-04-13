import React, { useState } from 'react';
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';
import toast from "react-hot-toast";
function AddMembership({ selectedMember, onClose }) {
    const { token } = useAuth();
    const [membershipData, setMembershipData] = useState({
        memberId: selectedMember.memberId,
        startDate: new Date().toISOString().substr(0, 10),
        modeOfPayment: '',
        membershipPlanId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMembershipData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
     
             MemberAction.addMembership(selectedMember.memberId, membershipData, token)
                .then((response) => {

                    if(response.success){
                        console.log(response)
                        console.log("Membership Added Successfully....")
                        
                        onClose();
                    }else{
                            toast.error(response.data);
                    }
                  
                })

                .catch((err)=>{
                    console.lof(err);
                })
          
         
        } 


    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add Membership for {selectedMember.firstName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Member ID :
                        </label>
                        <input
                            type="text"
                            name="memberId"
                            value={selectedMember.memberId}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        />

                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Start Date :
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={membershipData.startDate}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Mode of Payment:
                        </label>
                        <select
                            name="modeOfPayment"
                            value={membershipData.modeOfPayment}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">Select Mode of Payment</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-semibold text-gray-600 mb-1">
                            Membership Plan Id :
                        </label>
                        <input
                            type="number"
                            name="membershipPlanId"
                            value={membershipData.membershipPlanId}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded">
                            Add Membership
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMembership;
