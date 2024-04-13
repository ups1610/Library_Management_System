import React, { useState } from "react";
import MemberAction from "../../action/MemberAction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authetication";
import toast from "react-hot-toast"
const AddMember = () => {
    const navigate = useNavigate();
    const { token,user } = useAuth();
    const [member, setMember] = useState({
        firstName: "",
        familyName: "",
        mobile: "",
        email: "",
        currentAddress: {
            landmark: "",
            address1: "",
            address2: "",
            city: "",
            district: "",
            state: "",
            pincode: ""
        },
        permanentAddress: {
            landmark: "",
            address1: "",
            address2: "",
            city: "",
            district: "",
            state: "",
            pincode: ""
        },
        initiatedBy:user.userId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const [addressType, field] = name.split('.');
        setMember(prevState => ({
            ...prevState,
            [addressType]: {
                ...prevState[addressType],
                [field]: value
            }
        }));
    };

    const saveMember = async (e) => {
        e.preventDefault();
        try {
            const response= await MemberAction.addNewMember(member, token);

            if(response.success){
                setMember({
                    firstName: "",
                    familyName: "",
                    mobile: "",
                    email: "",
                    currentAddress: {
                        landmark: "",
                        address1: "",
                        address2: "",
                        city: "",
                        district: "",
                        state: "",
                        pincode: ""
                    },
                    permanentAddress: {
                        landmark: "",
                        address1: "",
                        address2: "",
                        city: "",
                        district: "",
                        state: "",
                        pincode: ""
                    }
                });
                navigate("/dashboard/member/MemberTable");
            }else{
                    toast.error(response.data);
            }

           
        } catch (error) {
            console.log(error);
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setMember({
            firstName: "",
            familyName: "",
            mobile: "",
            email: "",
            currentAddress: {
                landmark: "",
                address1: "",
                address2: "",
                city: "",
                district: "",
                state: "",
                pincode: ""
            },
            permanentAddress: {
                landmark: "",
                address1: "",
                address2: "",
                city: "",
                district: "",
                state: "",
                pincode: ""
            }
        });
    };

    return (
        <>
            <div className="">
    <h1 className="font-semibold text-gray-800 mb-4">Add New Member</h1>
    <div className="w-full flex flex-col bg-white rounded-md shadow-md p-4">
        <div className="font-thin text-lg mb-2">Personal Details</div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={member.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Last Name</label>
                <input
                    type="text"
                    name="familyName"
                    value={member.familyName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Mobile</label>
                <input
                    type="number"
                    name="mobile"
                    value={member.mobile}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={member.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
        </div>
        <div className="font-thin text-lg mt-6">Current Address</div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Landmark</label>
                <input
                    type="text"
                    name="currentAddress.landmark"
                    value={member.currentAddress.landmark}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Address Line 1</label>
                <input
                    type="text"
                    name="currentAddress.address1"
                    value={member.currentAddress.address1}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Address Line 2</label>
                <input
                    type="text"
                    name="currentAddress.address2"
                    value={member.currentAddress.address2}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">City</label>
                <input
                    type="text"
                    name="currentAddress.city"
                    value={member.currentAddress.city}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">District</label>
                <input
                    type="text"
                    name="currentAddress.district"
                    value={member.currentAddress.district}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">State</label>
                <input
                    type="text"
                    name="currentAddress.state"
                    value={member.currentAddress.state}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Pincode</label>
                <input
                    type="text"
                    name="currentAddress.pincode"
                    value={member.currentAddress.pincode}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
        </div>
        <div className="font-thin text-lg mt-6">Permanent Address</div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Landmark</label>
                <input
                    type="text"
                    name="permanentAddress.landmark"
                    value={member.permanentAddress.landmark}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Address Line 1</label>
                <input
                    type="text"
                    name="permanentAddress.address1"
                    value={member.permanentAddress.address1}
                    onChange={handleAddressChange} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Address Line 2</label>
                <input
                    type="text"
                    name="permanentAddress.address2"
                    value={member.permanentAddress.address2}
                    onChange={handleAddressChange} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">City</label>
                <input
                    type="text"
                    name="permanentAddress.city"
                    value={member.permanentAddress.city}
                    onChange={handleAddressChange} 
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">District</label>
                <input
                    type="text"
                    name="permanentAddress.district"
                    value={member.permanentAddress.district}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">State</label>
                <input
                    type="text"
                    name="permanentAddress.state"
                    value={member.permanentAddress.state}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Pincode</label>
                <input
                    type="text"
                    name="permanentAddress.pincode"
                    value={member.permanentAddress.pincode}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
                onClick={saveMember}
                className="rounded text-white font-semibold bg-green-600 hover:bg-indigo-900 py-2 px-6"
            >
                Save
            </button>
            <button
                onClick={reset}
                className="rounded text-white font-semibold bg-red-600 hover:bg-gray-800 py-2 px-6"
            >
                Clear
            </button>
        </div>
    </div>
</div>

        </>
    );
};

export default AddMember;