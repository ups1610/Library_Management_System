import React, { useEffect, useState } from "react";
import MemberAction from "../../action/MemberAction";
import { X } from 'lucide-react'

const AddMember = ({onClose}) => {
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
    }
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

  const saveMember = (e) => {
    e.preventDefault();
    MemberAction.addNewMember(member)
      .then((response) => {
        console.log(response);
        console.log("Member Added Successfully....")
        setMember((prevMembers) => [...prevMembers, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
      onClose();
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="flex max-w-2xl mx-auto shadow border-b bg-white max-h-full overflow-y-scroll">
      <div className="px-8 py-8">
      <div className="flex justify-end">
        <button onClick={onClose}>
         <X />
        </button>
        </div>

        <div className="font-thin text-2xl tracking-wider">
          <h1>Add New Member</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={member.firstName}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Family Name
          </label>
          <input
            type="text"
            name="familyName"
            value={member.familyName}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={member.mobile}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>

        {/* Current Address */}
        <div className="font-thin text-lg mt-6">Current Address</div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Landmark
          </label>
          <input
            type="text"
            name="currentAddress.landmark"
            value={member.currentAddress.landmark}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          
          
        </div>
        <label className="block text-gray-600 text-sm font-normal">
            Address Line 1
          </label>
        <input
            type="text"
            name="currentAddress.address1"
            value={member.currentAddress.address1}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            Address Line 2
          </label>
        <input
            type="text"
            name="currentAddress.address2"
            value={member.currentAddress.address2}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            City
          </label>
        <input
            type="text"
            name="currentAddress.city"
            value={member.currentAddress.city}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            District
          </label>
        <input
            type="text"
            name="currentAddress.district"
            value={member.currentAddress.district}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            State
          </label>
        <input
            type="text"
            name="currentAddress.state"
            value={member.currentAddress.state}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            Pincode
          </label>
        <input
            type="text"
            name="currentAddress.pincode"
            value={member.currentAddress.pincode}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />

        {/* Permanent Address */}
        <div className="font-thin text-lg mt-6">Permanent Address</div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Landmark
          </label>
          <input
            type="text"
            name="permanentAddress.landmark"
            value={member.permanentAddress.landmark}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
        </div>
        <label className="block text-gray-600 text-sm font-normal">
            Address Line 1
          </label>
        <input
            type="text"
            name="permanentAddress.address1"
            value={member.permanentAddress.address1}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            Address Line 2
          </label>
        <input
            type="text"
            name="permanentAddress.address2"
            value={member.permanentAddress.address2}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            City
          </label>
        <input
            type="text"
            name="permanentAddress.city"
            value={member.permanentAddress.city}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            District
          </label>
        <input
            type="text"
            name="permanentAddress.district"
            value={member.permanentAddress.district}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            State
          </label>
        <input
            type="text"
            name="permanentAddress.state"
            value={member.permanentAddress.state}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <label className="block text-gray-600 text-sm font-normal">
            Pincode
          </label>
        <input
            type="text"
            name="permanentAddress.pincode"
            value={member.permanentAddress.pincode}
            onChange={handleAddressChange}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveMember}
            className="rounded text-white font-semibold bg-indigo-500 hover:bg-indigo-900 py-2 px-6"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-gray-500 hover:bg-gray-800 py-2 px-6"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddMember;