import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared";
import Landing, { Dashboard, Books, Author, Bookshelf, Genre} from "./pages";
import { InfoView } from "./components";
import Users from "./pages/Users/Users";
import AuthenticationProvider from "./context";
import ProtectedRoute from "./auth/ProtectedRoute";
import MemberTable from "./components/tabels/MemberTable";
import View from "./pages/Users/View";

import {View as BookView} from "./pages/Operations/View";
import  BookIssueLogs  from "./pages/Operations/BookIssueLogs";
import { IssueBook } from "./pages/Operations/IssueBook";
import TransactionLogs from "./pages/Transaction/TransactionLogs";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="catalog/books"  element={<Books/>}/>
          <Route path="catalog/author" element={<Author/>}/>
          <Route path="catalog/bookshelf" element={<Bookshelf/>}/>
          <Route path="catalog/genre" element={<Genre/>}/>
          <Route path="users/manage" element={<Users/>}/>
          <Route path="users/manage/:id/view" element={<View />} />

          <Route path="operation/BookLog" element={<BookIssueLogs/>} />
          <Route path="operation/BookLog/Issue" element={<IssueBook/>} />
          <Route path="operation/BookLog/:id/view" element={<BookView/>} />
          <Route path="member" element={<MemberTable/>}/>

          <Route path="transactions" element={<TransactionLogs/>} />
          <Route path="view" element={<InfoView/>}/>
        </Route>
        </Route>
      </Routes>
      </AuthenticationProvider>
    </Router>
   

  );
}

export default App;
