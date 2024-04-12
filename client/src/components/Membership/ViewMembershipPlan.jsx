import React, { useEffect, useState } from 'react'
import MemberAction from '../../action/MemberAction';
import UpdatePlan from './UpdatePlan';
import { AiOutlineFilePdf } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import MembershipPlan from './MembershipPlan';
import { useAuth } from '../../context/Authetication';

function ViewMembershipPlan() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModall, setShowModall] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (searchQuery) {
                const response = await MemberAction.getMemberPlanById(searchQuery, token);
                console.log(response)
                if (response.data) {
                    setPlans([response.data]);
                } else {
                    setPlans([]); 
                }
            } else {
                const response = await MemberAction.getAllMemberPlans(token);
                setPlans(response.data);
                
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    const deletePlan = (e, id) => {
        e.preventDefault();
        MemberAction.deletePlan(id, token).then((res) => {
            if (plans) {
                setPlans((prevElement) => {
                    return prevElement.filter((plan) => plan.id !== id)
                })
            }
        })
    }
    const editPlan = (id) => {
        const selected = plans.find((plan) => plan.id === id);
        setSelectedPlan(selected);
        setShowModal(true);
    };
    const updatePlanList = async () => {
        await fetchData();
    };
    const updatePlan = (updatedPlan) => {
        MemberAction.updatePlan(updatedPlan, updatedPlan.id, token)
            .then((response) => {
                console.log(response);
                console.log("Member Updated Successfully....");
                setPlans((prevPlans) =>
                    prevPlans.map((plan) =>
                        plan.id === updatedPlan.id ? updatedPlan : plan
                    )
                )
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery)
    };

    return (

        <div>
            <div className=" md:w-full w-screen w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-5">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                            <option value="">All</option>
                        </select>
                        <div className="relative w-full">
                            <label htmlFor="search" className="sr-only">
                                Membership Plan
                            </label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search for Membership Plan ID"
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
                        <button onClick={() => setShowModall(true)} className="border-2 text-sm px-2 py-1.5 rounded-lg flex items-center">
                            <MdOutlineLibraryAdd /> Add Membership
                        </button>
                        {showModall && <MembershipPlan onClose={() => setShowModall(false)} updatePlanList={updatePlanList} />}
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-t-lg">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="divide-y-2 divide-gray-200 bg-slate-900">
                        <tr>
                        <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                #
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Membership Plan Id
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Membership Plan Name
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Description
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Price
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Duration
                            </th>
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    
                        <tbody className="divide-y divide-gray-200">
                            { loading?(  <tr>
                <td colSpan="8" className="py-4">
                  Loading...
                </td>
              </tr>):plans.length===0?(
                 <tr>
                 <td colSpan="8" className="py-4">
                   No records available.
                 </td>
               </tr>
              ):( plans.map((plan, index) => (
                                <tr  key={index}>
                                    
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index+1}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{plan.id}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{plan.planName}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{plan.description}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$ {plan.price}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{plan.durationMonth} months</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                                            <button onClick={() => editPlan(plan.id)}
                                                className="inline-block px-4 py-2 text-sm font-medium bg-green-500 text-white focus:relative"
                                            >
                                                Edit
                                            </button>
                                            <button onClick={(e) => deletePlan(e, plan.id)}
                                                className="inline-block px-4 py-2 text-sm font-medium bg-red-500 text-white focus:relative"
                                            >
                                                Delete
                                            </button>
                                        </span>
                                    </td>
                                </tr>)))}
                        </tbody>

                </table>
            </div>
            {showModal && <UpdatePlan onClose={() => setShowModal(false)} plan={selectedPlan} updatePlan={updatePlan} />}
        </div>

    )
}

export default ViewMembershipPlan