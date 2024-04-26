import React, { useEffect, useState } from "react";

import {
  HiOutlineAcademicCap,
  HiOutlineCalculator,
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineCog,
  HiOutlineDocumentAdd,
  HiOutlineExclamation,
  HiOutlineLogin,
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTemplate,
  HiOutlineUpload,
  HiOutlineUser,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/Authetication";
import MemberAction from "../../action/MemberAction";
import toast from "react-hot-toast";
import AddMembership from "../Membership/AddMembership";
import { getIssueBookByMember } from "../../action/OperationsAction";
import { FaRegEye } from "react-icons/fa";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

export default function MemberInfoPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [membership, setMembership] = useState(null);
  const [haveMemebrship, sethaveMemebrship] = useState(false);
  const { token } = useAuth();

  const fetchMember = () => {
    MemberAction.getMemberById(id, token).then((response) => {
      setLoading(false);
      if (response.success) {
        console.log(response);
        setMember(response.data);
      } else {
        setMember(null);
      }
    });

    MemberAction.getMemberMembership(id, token).then((response) => {
      if (response.success) {
        console.log(response);
        setMembership(response.data);
        sethaveMemebrship(true);
      } else {
      }
    });
  };

  useEffect(() => {
    fetchMember();
    setLoading(false);
  }, [haveMemebrship]);

  const toggleStatus = () => {
    MemberAction.toggleMemberShipStatus(membership.membershipId, token).then(
      (response) => {
        if (response.success) {
          console.log(response);
          setMembership(response.data);
          sethaveMemebrship(true);
        } else {
          toast.error("Failed to change Membership Status");
        }
      }
    );
  };

  if (loading) return <p className="text-xs">Loading</p>;
  if (!member) return <p className="text-xs"> No record Found</p>;

  return (
    <div className="mb-3 rounded-md w-full">
      {membership === null && <MembershipAlert member={member} />}
   
      {membership &&  membership.status=="pending" && <MembershipDueAlert/>}
      <div className="p-2">
        <div className="bg-white p-2 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-2 sm:mb-0">
            <h5 className="text-lg font-semibold text-blue-gray-800">Member</h5>
            <p className="text-sm text-blue-gray-600 mt-1">
              [ {member.firstName} {member.familyName}]
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full h-full">
        <div className="sm:w-1/4 flex flex-col gap-4">
          <div className="w-full p-2 bg-white border rounded-md shadow-md sm:w-2.5/3">
            <Options member={member} />
          </div>
        </div>
        <div className="sm:w-3/4">
          <div className="flex flex-col gap-4 sm:pl-2">
            <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0">
              <MemberDetails
                member={member}
                membership={membership}
                toggleStatus={toggleStatus}
              />
            </div>
            <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0">
              <Tabs member={member} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Options({ member }) {
  return (
    <table className="table table-auto w-full">
      <thead>
        <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
          Options
        </caption>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="w-full text-sm gap-3 flex flex-row">
            <Link
              className={`flex items-center p-2 rounded-lg group`}
              to={`/dashboard/member/save?memberId=${member.memberId}`}
            >
              <span className="">
                <HiOutlineUpload />
              </span>
              <span className="ms-3">Update Details</span>
            </Link>
          </td>
        </tr>
        <tr className="border-b text-sm font-normal"></tr>
      </tbody>
    </table>
  );
}

function MemberDetails({ member, membership, toggleStatus }) {
  return (
    <table className="w-full table-auto">
      <thead>
        <caption className="text-lg inline font-semibold mb-2">Detail</caption>
      </thead>
      <tbody className="text-sm">
        <tr className="border-b border-gray-100">
          <td className="w-1/4 p-2">Member Id</td>
          <td>: {member.memberId}</td>
        </tr>
        <tr className="border-b border-gray-100">
          <td className="w-1/4 p-2">Name</td>
          <td className="font-medium">
            : {member.firstName} {member.familyName}{" "}
          </td>
        </tr>
        <tr className="border-b border-gray-100">
          <td className="w-1/4 p-2">Membership Id</td>
          <td className="w-1/4">
            : {membership ? membership.membershipId : "No Membership"}
          </td>
        </tr>
        <tr className="border-b border-gray-100">
          <td className="p-2 w-1/4">Membership Start Date</td>
          <td className="w-1/4">
            :{" "}
            {membership
              ? new Date(membership.startDate).toLocaleDateString()
              : "No Membership"}
          </td>
        </tr>
        <tr className="border-b border-gray-100">
          <td className="w-1/4">Membership End Date</td>
          <td className="w-1/4">
            :{" "}
            {membership
              ? new Date(membership.endDate).toLocaleDateString()
              : "No Membership"}
          </td>
        </tr>
        <tr className="border-b border-gray-100">
          <td className="w-1/4 p-2">Status</td>
          <td className="w-1/4">
            {membership === null ? (
              <span className="bg-orange-700 px-2 rounded-sm text-white">
                No Membership
              </span>
            ) : membership.status === "active" ? (
              <div className="flex nowrap gap-2 items-center">
                <span className="bg-green-700 px-2 rounded-sm text-white">
                  Active
                </span>
                <button onClick={toggleStatus} className="text-lg text-red-700">
                  <BsToggle2Off />
                </button>
              </div>
            ) : membership.status === "pending" ? (
              <div className="flex nowrap gap-2 items-center">
                <span className="px-2 rounded-sm text-red-700">
                  Pending Payment..
                </span>
              </div>
            ) : (
              <div className="flex nowrap gap-2 items-center">
                <span className="bg-red-700 px-2 rounded-sm text-white">
                  Block
                </span>
                <button onClick={toggleStatus} className="text-green-700">
                  <BsToggle2On />
                </button>
              </div>
            )}
          </td>
        </tr>
        <tr className="border-b border-gray-100 ">
          <td className="w-1/4 p-2">Phone No</td>
          <td>: {member.mobile}</td>
        </tr>
        <tr className="border-b border-gray-100 ">
          <td className="w-1/4 p-2">Email</td>
          <td>: {member.email}</td>
        </tr>
        <tr className="border-b border-gray-100 ">
          <td className="w-1/4 p-2">Current Address</td>
          <td>
            : {member.currentAddress.landmark} {member.currentAddress.address1}{" "}
            {member.currentAddress.address2} {member.currentAddress.city}{" "}
            {member.currentAddress.district} {member.currentAddress.state} -
            {member.currentAddress.pincode}{" "}
          </td>
        </tr>
        <tr className="border-b border-gray-100 ">
          <td className="w-1/4 p-2">Permanent Address</td>
          <td className="w-full">
            : {member.permanentAddress.landmark}{" "}
            {member.permanentAddress.address1}{" "}
            {member.permanentAddress.address2} {member.permanentAddress.city}{" "}
            {member.permanentAddress.district} {member.permanentAddress.state} -
            {member.permanentAddress.pincode}{" "}
          </td>
        </tr>
        <tr className="border-b border-gray-100 ">
          <td className="w-1/4 p-2">Membership Plan</td>
          <td>{membership ? membership.plan : "No Membership"}</td>
        </tr>
      </tbody>
    </table>
  );
}

function MembershipAlert({ member, Callback }) {
  const [addMembership, setAddMembership] = useState(false);

  return (
    <div className="bg-red-50 border border-red-400 rounded text-red-800 text-sm p-4 flex items-start">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full">
        <p>
          This member does not currently hold an active membership. Without a
          membership, members are unable to issue books. Please consider
          obtaining a membership to access library services.
        </p>
        <button
          className="border-red-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
          onClick={() => setAddMembership(true)}
        >
          Add Membership
        </button>

        {addMembership && (
          <AddMembership
            selectedMember={member}
            onClose={() => {
              setAddMembership(false);
            }}
          />
        )}
      </div>
      <div></div>
    </div>
  );
}




function MembershipDueAlert() {
  const [addMembership, setAddMembership] = useState(false);

  return (
    <div className="bg-yellow-50 border border-yellow-400 rounded text-red-800 text-sm p-4 flex items-start">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full">
        <p>
          Membership Fee is due. Ask member to pay using link received on registerd mail.
        </p>
        {/* <button
          className="border-red-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
          onClick={() => setAddMembership(true)}
        >
          Add Membership
        </button> */}

        
      </div>
      <div></div>
    </div>
  );
}

function Tabs({ member }) {
  const [activeTab, setActiveTab] = useState("BookIssue");
  const memberID = member.memberId;
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log("-----", memberID);
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={activeTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          <option value="BookIssue">Book Issue</option>
          <option value="Transaction">Transaction</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <a
              href="#"
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                activeTab === "BookIssue"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("BookIssue")}
              aria-current={activeTab === "BookIssue" ? "page" : undefined}
            >
              Book Issue
            </a>
            <a
              href="#"
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium ${
                activeTab === "Transaction"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("Transaction")}
              aria-current={activeTab === "Transaction" ? "page" : undefined}
            >
              Transaction
            </a>
          </nav>
        </div>
      </div>

      {/* Content for each tab */}
      {activeTab === "BookIssue" && <LibraryRecord member={member.memberId} />}
      {activeTab === "Transaction" && (
        <TransactionRecord member={member.memberId} />
      )}
    </div>
  );
}

const LibraryRecord = ({ member }) => {
  const [loading, setLoading] = useState(true);
  const [issueBooks, setIssueBooks] = useState([]);
  const { token } = useAuth();
  const fetchIssueBooks = () => {
    getIssueBookByMember(member, token)
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.success) {
          setIssueBooks(response.data);
        } else {
          setIssueBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setIssueBooks([]);
      });
  };

  useEffect(() => {
    fetchIssueBooks();
  }, []);

  if (loading) return <p className="text-xs">Loading...</p>;
  if (issueBooks.length === 0) return <p className="text-xs">No Book Issue</p>;

  return (
    <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="divide-y-2 divide-gray-200">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium">#</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">
            Book Title
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">
            Book Instance
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">
            Issue Date
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Status</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y-2 divide-gray-200 text-center">
        {issueBooks.map((issueBook, index) => {
          const currentDate = new Date();
          const issueDateObj = new Date(issueBook.dateOfIssue);
          const issueDate = `${issueDateObj.getDate()}/${
            issueDateObj.getMonth() + 1
          }/${issueDateObj.getFullYear()}`;
          const returnDate = new Date(issueBook.dateOfReturn);
          const isDue =
            issueBook.isReturn === "No" && currentDate >= returnDate;
          const isReturned = issueBook.isReturn === "Yes";

          return (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {issueBook.bookInstance.book.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {issueBook.bookInstance.id} {issueBook.bookInstance.imprint}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {issueDate}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {isDue ? (
                  <span className="bg-red-200 rounded-md text-xs text-red-900 p-1">
                    Due Return
                  </span>
                ) : isReturned ? (
                  <span className="bg-orange-200 rounded-md text-xs text-orange-900 p-1">
                    Returned
                  </span>
                ) : (
                  <span className="bg-green-200 text-xs rounded-md text-green-900 p-1">
                    Issued
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <Link
                  to={`/dashboard/operation/bookLog/${issueBook.bookIssueId}/view`}
                  className="text-gray-500 flex items-center nowrap gap-1 "
                >
                  <FaRegEye /> View
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
function TransactionRecord({ member }) {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();

  const fetchTransactions = () => {
    MemberAction.getMemberTransactions(member, token)
      .then((response) => {
        setLoading(false);
        if (response.success) {
          setTransactions(response.data);
        } else {
          setTransactions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <p className="text-xs">Loading...</p>;
  if (transactions.length === 0)
    return <p className="text-xs">No Transactions</p>;

  return (
    <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="divide-y-2 divide-gray-200">
        <tr>
          <th className="whitespace-nowrap px-4 py-2 font-medium">#</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">
            Transaction Id
          </th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">referenceId</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Date</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Amount</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Narration</th>
          <th className="whitespace-nowrap px-4 py-2 font-medium">Mode</th>

        </tr>
      </thead>

      <tbody className="divide-y-2 divide-gray-200 text-center">
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.transactionId}
            </td>

            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.referenceId}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.date}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.amount}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.narration}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {transaction.mode}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
