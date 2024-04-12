import React, { useEffect, useState } from 'react'
import MemberAction from '../../action/MemberAction';
import UpdateMember from '../modals/UpdateMember';
import AddMembership from '../modals/AddMembership';
import { Link } from 'react-router-dom';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useAuth } from '../../context/Authetication';

function MemberTable() {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchMembershipStatus, 60000);
        return () => clearInterval(intervalId);
    }, [searchQuery]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (searchQuery) {
                const response = await MemberAction.getMemberById(searchQuery, token);
                if (response.data) {
                    setMembers([response.data]);
                    updateMembershipStatus([response.data]); 
                } else {
                    setMembers([]); 
                }
            } else {
                const response = await MemberAction.getAllMembers(token);
                setMembers(response.data);
                updateMembershipStatus(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };


    const deleteMember = (e, id) => {
        e.preventDefault();
        MemberAction.deleteMember(id, token).then((res) => {
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
    const updateMember = (updatedMember) => {
        MemberAction.updateMember(updatedMember, updatedMember.memberId, token)
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
    const updateMembershipStatus = async (members) => {
        const statusMap = {};
        for (const member of members) {
            try {
                const response = await MemberAction.getMemberMembership(member.memberId, token);
                statusMap[member.memberId] = response.data ? "Active" : "Not Active";
            } catch (error) {
                statusMap[member.memberId] = "Not Active";
            }
        }
        setMembershipStatus(statusMap);
    };
    const fetchMembershipStatus = async () => {
        if (members) {
            const updatedStatusMap = { ...membershipStatus };
            for (const member of members) {
                try {
                    const response = await MemberAction.getMemberMembership(member.memberId, token);
                    updatedStatusMap[member.memberId] = response.data ? "Active" : "Not Active";
                } catch (error) {
                    updatedStatusMap[member.memberId] = "Not Active";
                }
            }
            setMembershipStatus(updatedStatusMap);
        }
    };
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery)
    };
    return (
        <div>
            <div className="md:w-full w-screen mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                            <option value="all">All</option>
                        </select>
                        <div className="relative w-full">
                            <label htmlFor="search" className="sr-only">
                                Member
                            </label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search for Member ID"
                                className="border-2 px-2 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                <button
                                    type="button"
                                    className="text-gray-600 hover:text-gray-700"
                                >
                                    <span className="sr-only">Search</span>
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
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end">
                        <button className="border-2 text-sm px-2 py-1.5 mr-2 rounded-lg flex items-center">
                            <AiOutlineFilePdf /> Download Pdf
                        </button>
                        <Link
                            to="add"
                            className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center"
                        >
                            <MdOutlineLibraryAdd />Add Member
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-t-lg">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="divide-y-2 divide-gray-200 bg-slate-900">
                        <tr>

                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                #
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Member ID
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                First Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Last Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Mobile
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Email ID
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Membership Status
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/* key={member.memberId} */}

                    <tbody className="bg-white">
                        {loading ? (<tr>
                            <td colSpan="8" className="py-4">
                                Loading...
                            </td>
                        </tr>) : searchQuery && members.length === 0 ? (<tr>
                            <td colSpan="8" className="py-4">
                                No records available.
                            </td>
                        </tr>) : (members.map((member, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {index + 1}
                                </td>
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
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <button
                                        className={`rounded-full px-3 py-1 text-sm ${membershipStatus[member.memberId] === "Active"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {membershipStatus[member.memberId] || "Loading..."}
                                    </button>
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
                                        <Link to={`${member.memberId}/info`} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-indigo-500 hover:text-indigo-800 focus:relative">
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
                                        </Link>
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
                            </tr>)))}
                    </tbody>
                </table>
            </div>
            {showModalUpdate && <UpdateMember onClose={() => setShowModalUpdate(false)} member={selectedMember} updateMember={updateMember} />}
            {showModalAdd && <AddMembership selectedMember={selectedMember} onClose={() => setShowModalAdd(false)} fetchMembershipStatus={fetchMembershipStatus} />}
        </div>

    )
}

export default MemberTable