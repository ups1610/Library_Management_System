import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared";
import Landing, { Dashboard, Books, Author, Bookshelf, Genre} from "./pages";
import { InfoView } from "./components";

import AuthenticationProvider from "./context";
import ProtectedRoute from "./auth/ProtectedRoute";
import MemberTable from "./components/tabels/MemberTable";
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
          <Route path="member" element={<MemberTable/>}/>
          <Route path="view" element={<InfoView/>}/>
        </Route>
        </Route>
      </Routes>
      </AuthenticationProvider>
    </Router>
   

  );
}

export default App;
