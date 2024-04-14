import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberAction from '../../action/MemberAction';
import { useAuth } from '../../context/Authetication';
import UpdateMember from '../Membership/UpdateMember';
import AddMembership from '../Membership/AddMembership';

function MemberInfoPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const [memberInfo, setMemberInfo] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [membershipInfo, setMembershipInfo] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState({});

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const memberResponse = await MemberAction.getMemberById(id, token);
                console.log(memberResponse.data)
                setMemberInfo(memberResponse.data);
                if (memberResponse.data && memberResponse.data.memberId) {
                    const membershipResponse = await MemberAction.getMemberMembership(id, token);
                    console.log(membershipResponse.data)
                    setMembershipInfo(membershipResponse.data);
                }
            } catch (error) {
                console.error('Error fetching member info:', error);
            }
        };

        fetchMemberInfo();
    }, [id]);
    const editMember = () => {
        setSelectedMember(memberInfo);
        setShowModalUpdate(true);
    };

    const updateMember = (updatedMember) => {
        MemberAction.updateMember(updatedMember, updatedMember.memberId, token)
            .then((response) => {
                console.log(response);
                console.log("Member Updated Successfully....");
                setMemberInfo(updatedMember);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleAddMembership = (id) => {
        setSelectedMember(memberInfo);
        setShowModalAdd(true);
    };
    const fetchMembershipStatus = async () => {
        if (Array.isArray(memberInfo)) {
            const updatedStatusMap = { ...membershipStatus };
            for (const member of memberInfo) {
                try {
                    const response = await MemberAction.getMemberMembership(member.memberId, token);
                    updatedStatusMap[member.memberId] = response.data ? "Active" : "Not Active";
                } catch (error) {
                    updatedStatusMap[member.memberId] = "Not Active";
                }
            }
            setMembershipStatus(updatedStatusMap);
        } else if (memberInfo && memberInfo.memberId) {
            try {
                const response = await MemberAction.getMemberMembership(memberInfo.memberId, token);
                setMembershipInfo(response.data);
                const updatedStatusMap = { [memberInfo.memberId]: response.data ? "Active" : "Not Active" };
                setMembershipStatus(updatedStatusMap);
            } catch (error) {
                console.error('Error fetching membership status : ', error);
            }
        }
    };
    
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="h-96 rounded-lg bg-white">
                    {memberInfo && (
                        <div>
                            <h2 className="text-left mb-4 font-semibold mt-4 px-4">Member Information</h2>
                            <div className="flow-root">
                                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Member ID</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{memberInfo.memberId}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Member Name</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{memberInfo.firstName} {memberInfo.familyName}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Phone Number</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{memberInfo.mobile}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Email</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{memberInfo.email}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Address</dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {memberInfo.currentAddress?.address1}, {memberInfo.currentAddress?.address2}, <br></br>{memberInfo.currentAddress?.city} , {memberInfo.currentAddress?.state},<br></br> {memberInfo.currentAddress?.pincode}
                                        </dd>
                                    </div>
                                </dl>

                            </div>
                            <div className="px-4 mt-6">
                                <button onClick={() => editMember(memberInfo.memberId)} className="px-4 py-2 bg-indigo-600 text-white rounded">
                                    Update Member Details
                                </button>
                                {showModalUpdate && <UpdateMember onClose={() => setShowModalUpdate(false)} member={selectedMember} updateMember={updateMember} />}
                            </div>

                        </div>
                    )}
                </div>
                <div className="h-96 rounded-lg bg-white">
                    {membershipInfo && (
                        <div>
                            <div className="bg-white rounded-lg">
                            <h2 className="text-left mb-4 font-semibold mt-4 px-4">Membership Information</h2>
                            <div className="flow-root">
                                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Member ID</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{membershipInfo.memberId}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Membership ID</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{membershipInfo.membershipId}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Member Name</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{membershipInfo.memberName}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Start Date</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{membershipInfo.startDate}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">End Date</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{membershipInfo.endDate}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Status</dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                        <button
                                            className="rounded-full px-3 py-1 text-sm bg-green-500 text-white"
                                                    
                                                    
                                                
                                        >
                                            {membershipInfo.status}
                                        </button>
                                           
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900 px-4">Plan</dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {membershipInfo.plan}
                                        </dd>
                                    </div>
                                </dl>

                            </div>

                        </div>
                        </div>
                    )}


                    {!membershipInfo && (
                         <div>
                         <div className="bg-white rounded-lg">
                         <h2 className="text-left mb-4 font-semibold mt-4 px-4">Membership Information</h2>
                         <div role="alert" className="rounded border-s-4 mx-2 border-red-500 bg-red-50 p-4">
  <div className="flex items-center gap-2 text-red-800">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>

    <strong className="block font-medium"> Something went wrong </strong>
  </div>

  <p className="mt-2 text-sm text-red-700">
  This Member does not have an active membership.<br></br> Please take any membership plan soon.<br></br>To add membership, please click the button below.<br></br>Thank you !
  </p>
</div>
                         <div className="px-4 mt-40">
                                <button onClick={() => handleAddMembership(memberInfo.memberId)} className="px-4 py-2 bg-indigo-600 text-white rounded">
                                    Add Membership
                                </button>
                                {showModalAdd && <AddMembership selectedMember={selectedMember} onClose={() => setShowModalAdd(false)} fetchMembershipStatus={fetchMembershipStatus} />}
                            </div>

                     </div>
                     </div>
                    )}
                </div>
            </div>



            {/* Display membership info */}

        </div>
    );
}

export default MemberInfoPage;
