import React from 'react';
import { X } from 'lucide-react'

function ViewMembership({ membershipDetails, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-lg">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="flow-root">
                    <h1 className="text-lg leading-6 font-semibold text-indigo-700 mb-3 text-center">MEMBERSHIP DETAILS</h1>
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Member ID :</dt>
                            <dd className="text-gray-700 sm:col-span-2">{membershipDetails.memberId}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Membership ID :</dt>
                            <dd className="text-gray-700 sm:col-span-2">{membershipDetails.membershipId}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Member Name :</dt>
                            <dd className="text-gray-700 sm:col-span-2">{membershipDetails.memberName}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Start Date :</dt>
                            <dd className="text-gray-700 sm:col-span-2">{membershipDetails.startDate}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">End Date :</dt>
                            <dd className="text-gray-700 sm:col-span-2">{membershipDetails.endDate}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Status :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {membershipDetails.status}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Plan :</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {membershipDetails.plan}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default ViewMembership;
