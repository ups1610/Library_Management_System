import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MemberAction from "../../action/MemberAction";
import { useAuth } from "../../context/Authetication";
import toast from "react-hot-toast";
import { debounce } from 'lodash';

const AddMember = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const { token, user } = useAuth();
  const [member, setMember] = useState({
    memberId:"",
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
      pincode: "",
    },
    permanentAddress: {
      landmark: "",
      address1: "",
      address2: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    initiatedBy: user.userId,
  });
  const [isUpdate, setIsUpdate] = useState(false);





  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const memberId = queryParams.get("memberId");
    if (memberId) {
      
      setIsUpdate(true);
      fetchMemberDetails(memberId);
    }
  }, [location.search]);

  const fetchMemberDetails = async (memberId) => {
    try {
      const response = await MemberAction.getMemberById(memberId, token);
      if (response.success) {
        setMember(response.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split(".");
    setMember((prevMember) => ({
      ...prevMember,
      [addressType]: {
        ...prevMember[addressType],
        [field]: value,
      },
    }));
  };

  const saveMember = async () => {
          console.log("Adding membersips");
    try {
      let response;
      if (isUpdate) {
      
        response = await MemberAction.updateMember(member,member.memberId, token);
      } else {
        response = await MemberAction.addNewMember(member, token);
      }
      if (response.success) {
        toast.success(isUpdate ? "Member updated successfully" : "Member added successfully");
        navigate(`/dashboard/member/${response.data.memberId}/manage`);
      } else {
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
        pincode: "",
      },
      permanentAddress: {
        landmark: "",
        address1: "",
        address2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
      },
    });
  };



  const debouncedSaveMember = debounce(saveMember,2000);

    return (
        <>
            <div className="">
            <h1 className="font-semibold text-gray-800 mb-4">{isUpdate ? "Update Member" : "Add New Member"}</h1>
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
                    type="number"
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
                    type="number"
                    name="permanentAddress.pincode"
                    value={member.permanentAddress.pincode}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
            </div>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
                onClick={debouncedSaveMember}
                className="py-2 px-10 border-2 bg-black  focus:outline-none rounded-md text-white font-normal text-sm"
            >
                Save
            </button>
            <button
                onClick={reset}
                className="py-2 px-10 border-2   focus:outline-none rounded-md text-black font-normal text-sm"
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