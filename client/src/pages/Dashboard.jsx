import React from "react";
import { DashChart } from "../components/charts/Charts";

function Dashboard() {
  return (
    <>
      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Dashboard</h2>
        <p className="text-[11px]">Admin / Dashboard</p>
      </div>
      <div className="flex flex-col m-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DashView />
        </div>
        <div className="mt-5 rounded-lg">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex justify-between p-2 mb-2">
              <h2 className="text-lg text-[#8c8b8b]">Report</h2>
              <div className="secondaryText">
                <span className="px-1">Today</span>
                <span className="px-1">Last Week</span>
                <span className="px-1">Last Month</span>
              </div>
            </div>
            <DashChart />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <TableView
                title="New Members"
                name="Name"
                planName="Plan"
                booksIssued="Total Books"
                endDate="End Date"
              />
            </div>
            <div className="w-full mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <TableView
                title="New Books"
                name="Name"
                planName="ISBN"
                booksIssued="Issue"
                endDate="Return"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

export const DashView = () => {
  // Sample data
  const data = [
    {
      title: "Logged in user",
      icon: "icon",
      value: 15,
    },
    {
      title: "Total Books",
      icon: "icon",
      value: 100,
    },
    {
      title: "Total Members",
      icon: "icon",
      value: 10,
    },
    {
      title: "Total Transactions",
      icon: "icon",
      value: 50,
    },
  ];
  return (
    <>
      {data.map((item, index) => (
        <article
          key={index}
          className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg w-full"
        >
          <div className="flex justify-between items-center">
            <span className="inline-block rounded bg-blue-600 p-2 text-white">
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </span>
            <div className="flex flex-col ml-2">
              {/* Title */}
              <h2 className="text-lg font-bold">{item.title}</h2>
              {/* Value */}
              <p className="text-gray-500">{item.value}</p>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

const TableView = (props) => {
  return (
    <>
      <div className="text-lg text-[#8c8b8b] mb-2">
        <h2>{props.title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {props.name}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {props.planName}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {props.booksIssued}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {props.endDate}
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="/#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Jane Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                04/11/1980
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Designer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $100,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="/#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gary Barlow
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Singer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                $20,000
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <a
                  href="/#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export { TableView };
