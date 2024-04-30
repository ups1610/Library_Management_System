import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared";
import Landing, { Dashboard, Books, Author, Bookshelf, Genre} from "./pages";
import InfoView  from "./components/view/InfoView";
import Users from "./pages/Users/Users";
import AuthenticationProvider from "./context";
import ProtectedRoute from "./auth/ProtectedRoute";

import View from "./pages/Users/View";

import {View as BookView} from "./pages/Operations/View";
import  BookIssueLogs  from "./pages/Operations/BookIssueLogs";
import { IssueBook } from "./pages/Operations/IssueBook";
import ViewMembershipPlan from "./components/Membership/ViewMembershipPlan";

import AddMember from "./components/Membership/AddMember";
import TransactionLogs from "./pages/Transaction/TransactionLogs";
import MemberInfoPage from "./components/view/MemberInfoPage";
import Members from "./pages/Membership/Members";
import { CatalogerProtectedRoute } from "./auth/CatalogerProtectedRoute";
import { AdminProtectedRoute } from "./auth/AdminProtectedRoute";
import { LibrarianProtectedRoute } from "./auth/LibrarianProtectedRoute";
import { AccountantProtectedRoute } from "./auth/AccountantProtectedRoute";
import { BarcodePrint } from "./pages/BarcodePrint";
import RequestPayment from "./pages/payment/RequestPayment";
import EmailConfiguration from "./pages/Settings/EmailConfiguration";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
      <Routes>

        <Route index path="/" element={<Landing />} />
        <Route path="/membership/pay/:orderId" element={<RequestPayment />} />

        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="catalog/books"  element={ <CatalogerProtectedRoute> <Books/></CatalogerProtectedRoute>}/>
          <Route path="catalog/author" element={<CatalogerProtectedRoute> <Author/>  </CatalogerProtectedRoute> }/>
          <Route path="catalog/bookshelf" element={<CatalogerProtectedRoute><Bookshelf/></CatalogerProtectedRoute> }/>
          <Route path="catalog/genre" element={ <CatalogerProtectedRoute><Genre/></CatalogerProtectedRoute>}/>
          <Route path="catalog/barcode" element={ <CatalogerProtectedRoute><BarcodePrint/></CatalogerProtectedRoute>}/>
          <Route path="users/manage/:id/view" element={<AdminProtectedRoute> <View /></AdminProtectedRoute> } />
          <Route path="users/manage" element={<AdminProtectedRoute> <Users/></AdminProtectedRoute> } />
          <Route path="operation/BookLog" element={  <LibrarianProtectedRoute><BookIssueLogs/></LibrarianProtectedRoute> } />
          <Route path="operation/BookLog/Issue" element={<LibrarianProtectedRoute><IssueBook/></LibrarianProtectedRoute> } />
          <Route path="operation/BookLog/:id/view" element={<LibrarianProtectedRoute><BookView/></LibrarianProtectedRoute>} />
          
          <Route path="member/" element={<LibrarianProtectedRoute><Members/></LibrarianProtectedRoute> } />
          <Route path="member/:id/manage" element={<LibrarianProtectedRoute><MemberInfoPage/></LibrarianProtectedRoute> } />
          <Route path="member/save" element={ <LibrarianProtectedRoute><AddMember/></LibrarianProtectedRoute>} />
          <Route path="member/membership" element={<LibrarianProtectedRoute><ViewMembershipPlan/></LibrarianProtectedRoute> } />

          <Route path="transactions" element={<AccountantProtectedRoute><TransactionLogs/></AccountantProtectedRoute> } />
          <Route path="catalog/:name/view/:id" element={<CatalogerProtectedRoute><InfoView/></CatalogerProtectedRoute>}/>



          <Route path="setting/emailConfiguration"  element={ <AdminProtectedRoute> <EmailConfiguration/></AdminProtectedRoute>}/>
        </Route>
        </Route>
      </Routes>
      </AuthenticationProvider>
    </Router>
   

  );
}

export default App;
