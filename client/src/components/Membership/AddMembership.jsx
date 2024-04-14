import React, { useState } from 'react';
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';

function AddMembership({ selectedMember, onClose, fetchMembershipStatus }) {
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
        try {
            await MemberAction.addMembership(selectedMember.memberId, membershipData, token)
                .then((response) => {
                    console.log(response)
                    console.log("Membership Added Successfully....")
                })
            await fetchMembershipStatus();
            onClose();
        } catch (error) {
            console.error('Error adding membership:', error);
        }
    };

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
                        <button type="submit" className="px-4 py-2 bg-black text-white font-semibold rounded">
                            Add Membership
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMembership;
