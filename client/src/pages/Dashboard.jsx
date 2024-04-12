import React, { useEffect } from "react";

import { useAuth } from "../context/Authetication";
import {
  BookCard,
  BookIssueCard,
  DueReturnCard,
  MemberCard,
  PaymentCard,
  UserCard,
} from "../components/cards";
import { CatalogerProtectedRoute } from "../auth/CatalogerProtectedRoute";
import { AdminProtectedRoute } from "../auth/AdminProtectedRoute";
import { LibrarianProtectedRoute } from "../auth/LibrarianProtectedRoute";
import { AccountantProtectedRoute } from "../auth/AccountantProtectedRoute";
import {
  BookIssueChart,
  MembersChart,
  TransactionCharts,
} from "../components/charts";
import { NewMembers, RecentBookTable, RecentTransactionTable, UsersTable } from "../components/tabels";

function Dashboard() {
  const auth = useAuth();

  return (
    <>
      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Dashboard</h2>
        <p className="text-[11px]">Admin / Dashboard</p>
      </div>
      <div className="flex flex-col m-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <AdminProtectedRoute>
            <UserCard />
            <BookCard />
            <MemberCard />
            <BookIssueCard />
            <DueReturnCard />
            <PaymentCard />
          </AdminProtectedRoute>

          <CatalogerProtectedRoute>
            <BookCard />
           
          </CatalogerProtectedRoute>

          <LibrarianProtectedRoute>
            <BookIssueCard />
            <DueReturnCard />
            <MemberCard />
          </LibrarianProtectedRoute>

          <AccountantProtectedRoute>
            <PaymentCard />
          </AccountantProtectedRoute>
        </div>
        <div className="mt-5 rounded-lg">
          <AdminProtectedRoute>
          <BookIssueChart />
            <MembersChart />
            <TransactionCharts />
          </AdminProtectedRoute>

          <CatalogerProtectedRoute></CatalogerProtectedRoute>

          <LibrarianProtectedRoute>
            <BookIssueChart />
            <MembersChart />
          </LibrarianProtectedRoute>

          <AccountantProtectedRoute>
            <TransactionCharts />
          </AccountantProtectedRoute>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="w-full mt-5 rounded-lg border border-gray-100 p-4 shadow-sm">
              <AdminProtectedRoute>
                <UsersTable/>
                <RecentBookTable/>
              </AdminProtectedRoute>

              <CatalogerProtectedRoute>
              <RecentBookTable/>
              </CatalogerProtectedRoute>

              <LibrarianProtectedRoute>
               <RecentBookTable/>
              </LibrarianProtectedRoute>

              <AccountantProtectedRoute>
              
              </AccountantProtectedRoute>
            </div>
            <div className="w-full mt-5 rounded-lg border border-gray-100  p-4 shadow-sm">
              <AdminProtectedRoute>
              <RecentTransactionTable/>
              </AdminProtectedRoute>

              <CatalogerProtectedRoute></CatalogerProtectedRoute>

              <LibrarianProtectedRoute>
                <NewMembers/>
              </LibrarianProtectedRoute>

              <AccountantProtectedRoute>
                   <RecentTransactionTable/>
              </AccountantProtectedRoute>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
