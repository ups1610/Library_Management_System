import React, { useEffect, useState } from "react";
import MemberAction from "../../action/MemberAction";
import { X } from 'lucide-react'

const UpdateMember = ({onClose, member, updateMember}) => {
    const [updatedMember, setUpdatedMember] = useState(member);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split('.');
    setUpdatedMember(prevState => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(updatedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="flex max-w-2xl mx-auto shadow border-b bg-white max-h-full overflow-y-scroll">
      <div className="px-8 py-8">
      <div className="flex justify-end">
        <button onClick={onClose}>
         <X />
        </button>
        </div>

        <div className="font-thin text-2xl tracking-wider">
          <h1 className="text-left">Update Member</h1>
        </div>
        <div className="text-left items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={updatedMember.firstName}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-left block text-gray-600 text-sm font-normal">
            Family Name
          </label>
          <input
            type="text"
            name="familyName"
            value={updatedMember.familyName}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="text-left items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={updatedMember.mobile}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="text-left items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={updatedMember.email}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>

        {/* Current Address */}
        <div className="text-left font-thin text-lg mt-6">Current Address</div>
        <div className="text-left items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Landmark
          </label>
          <input
            type="text"
            name="currentAddress.landmark"
            value={updatedMember.currentAddress.landmark}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          
          
        </div>
        <label className="text-left block text-gray-600 text-sm font-normal">
            Address Line 1
          </label>
        <input
            type="text"
            name="currentAddress.address1"
            value={updatedMember.currentAddress.address1}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            Address Line 2
          </label>
        <input
            type="text"
            name="currentAddress.address2"
            value={updatedMember.currentAddress.address2}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            City
          </label>
        <input
            type="text"
            name="currentAddress.city"
            value={updatedMember.currentAddress.city}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            District
          </label>
        <input
            type="text"
            name="currentAddress.district"
            value={updatedMember.currentAddress.district}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            State
          </label>
        <input
            type="text"
            name="currentAddress.state"
            value={updatedMember.currentAddress.state}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            Pincode
          </label>
        <input
            type="text"
            name="currentAddress.pincode"
            value={updatedMember.currentAddress.pincode}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />

        {/* Permanent Address */}
        <div className="text-left font-thin text-lg mt-6">Permanent Address</div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-left block text-gray-600 text-sm font-normal">
            Landmark
          </label>
          <input
            type="text"
            name="permanentAddress.landmark"
            value={updatedMember.permanentAddress.landmark}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <label className="text-left block text-gray-600 text-sm font-normal">
            Address Line 1
          </label>
        <input
            type="text"
            name="permanentAddress.address1"
            value={updatedMember.permanentAddress.address1}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            Address Line 2
          </label>
        <input
            type="text"
            name="permanentAddress.address2"
            value={updatedMember.permanentAddress.address2}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            City
          </label>
        <input
            type="text"
            name="permanentAddress.city"
            value={updatedMember.permanentAddress.city}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            District
          </label>
        <input
            type="text"
            name="permanentAddress.district"
            value={updatedMember.permanentAddress.district}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            State
          </label>
        <input
            type="text"
            name="permanentAddress.state"
            value={updatedMember.permanentAddress.state}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="text-left block text-gray-600 text-sm font-normal">
            Pincode
          </label>
        <input
            type="text"
            name="permanentAddress.pincode"
            value={updatedMember.permanentAddress.pincode}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />

        <div className="text-left items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={handleSubmit}
            className="rounded text-white font-semibold bg-indigo-500 hover:bg-indigo-900 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="rounded text-white font-semibold bg-gray-500 hover:bg-gray-800 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpdateMember;