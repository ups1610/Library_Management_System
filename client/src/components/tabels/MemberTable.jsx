import React, { useEffect, useState } from 'react'
import MemberAction from '../../action/MemberAction';
import AddMember from '../modals/AddMember';
import UpdateMember from '../modals/UpdateMember';
import AddMembership from '../modals/AddMembership';
import ViewMembership from '../modals/ViewMembership';
import NoMembership from '../modals/NoMembership';
import MembershipPlan from '../modals/MembershipPlan';
import ViewMembershipPlan from '../modals/ViewMembershipPlan';

function MemberTable() {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalNo, setShowModalNo] = useState(false);
    const [showModalPlan, setShowModalPlan] = useState(false);
    const [showModalViewPlan, setShowModalViewPlan] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [membershipDetails, setMembershipDetails] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await MemberAction.getAllMembers();
            setMembers(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const deleteMember = (e, id) => {
        e.preventDefault();
        MemberAction.deleteMember(id).then((res) => {
            if (members) {
                setMembers((prevElement) => {
                    return prevElement.filter((member) => member.memberId !== id)
                })
            }
        })
    }
    const editMember = (id) => {
        const selected = members.find((member) => member.memberId === id);
        setSelectedMember(selected);
        setShowModalUpdate(true);
    };
    const updateMemberList = async () => {
        await fetchData();
    };
    const updateMember = (updatedMember) => {
        MemberAction.updateMember(updatedMember, updatedMember.memberId)
            .then((response) => {
                console.log(response);
                console.log("Member Updated Successfully....");
                setMembers((prevMembers) =>
                    prevMembers.map((member) =>
                        member.memberId === updatedMember.memberId ? updatedMember : member
                    )
                )
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleAddMembership = (id) => {
        const selected = members.find((member) => member.memberId === id);
        setSelectedMember(selected);
        setShowModalAdd(true);
    };
    const handleViewMembership = async (id) => {
        const selected = members.find((member) => member.memberId === id);
        setSelectedMember(selected);
        try {
            const response = await MemberAction.getMemberMembership(id);
            console.log(response.data)

            setMembershipDetails(response.data);
            setShowModalView(true);

        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Member have'nt taken membership ") {
                console.log("This member does not have a membership.");
                setShowModalNo(true);
            } else {
                console.error("An error occurred:", error);
            }
        }
    };
    return (
        <div className="container my-6 mx-auto">
            <div className="flex justify-between items-center h-12">
                <div>
                    <button onClick={() => setShowModal(true)} className="rounded bg-slate-800 text-white px-6 py-2 font-semibold">Add Member</button>
                    {showModal && <AddMember onClose={() => setShowModal(false)} updateMemberList={updateMemberList} />}
                </div>
                <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                    <button onClick={() => setShowModalPlan(true)}
                        className="inline-block px-4 py-2 bg-slate-800 text-sm font-medium text-white  focus:relative"
                    >
                        Add Membership plans
                    </button>
                    {showModalPlan && <MembershipPlan onClose={() => setShowModalPlan(false)} />}
                    <button onClick={() => setShowModalViewPlan(true)}
                        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                    >
                        View
                    </button>
                    {showModalViewPlan && <ViewMembershipPlan onClose={() => setShowModalViewPlan(false)} />}
                </span>
            </div>


            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="text-left font-medium text-white uppercase tracking-wider py-3 px-6">ID</th>
                            <th className="text-left font-medium text-white uppercase tracking-wider py-3 px-6">First Name</th>
                            <th className="text-left font-medium text-white uppercase tracking-wider py-3 px-6">Last Name</th>
                            <th className="text-left font-medium text-white uppercase tracking-wider py-3 px-6">Mobile</th>
                            <th className="text-left font-medium text-white uppercase tracking-wider py-3 px-6">Email ID</th>
                            <th className="text-center font-medium text-white uppercase tracking-wider py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    {/* key={member.memberId} */}
                    {!loading && (
                        <tbody className="bg-white">
                            {members.map((member) => (
                                <tr>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{member.memberId}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{member.firstName}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{member.familyName}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{member.mobile}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{member.email}</div>
                                    </td>
                                    <td className="text-right px-6 py-4 whitespace-nowrap">
                                        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                            <button onClick={() => editMember(member.memberId)} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-indigo-500 hover:text-indigo-800 focus:relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                                Edit
                                            </button>
                                            <button onClick={() => handleViewMembership(member.memberId)} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-indigo-500 hover:text-indigo-800 focus:relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                View
                                            </button>
                                            <button onClick={(e) => deleteMember(e, member.memberId)} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-indigo-500 hover:text-indigo-800 focus:relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                            <button onClick={() => handleAddMembership(member.memberId)} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-indigo-500 hover:text-indigo-800 focus:relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>

                                                Add Membership
                                            </button>
                                        </div>
                                    </td>
                                </tr>))}
                        </tbody>)}
                </table>
            </div>
            {showModalUpdate && <UpdateMember onClose={() => setShowModalUpdate(false)} member={selectedMember} updateMember={updateMember} />}
            {showModalAdd && <AddMembership selectedMember={selectedMember} onClose={() => setShowModalAdd(false)} />}
            {showModalView && <ViewMembership membershipDetails={membershipDetails} onClose={() => setShowModalView(false)} />}
            {showModalNo && <NoMembership onClose={() => setShowModalNo(false)} />}
        </div>
    )
}

export default MemberTable