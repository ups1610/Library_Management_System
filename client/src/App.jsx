import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared";
import Landing, { Dashboard, Books, Author, Bookshelf, Genre } from "./pages";
import { InfoView } from "./components";

import AutheticationProvider from "./context/Authetication";
import ProtectedRoute from "./auth/ProtectedRoute";
function App() {
  return (
      <AutheticationProvider>

    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="catalog/books" element={<Books/>}/>
          <Route path="catalog/author" element={<Author/>}/>
          <Route path="catalog/bookshelf" element={<Bookshelf/>}/>
          <Route path="catalog/genre" element={<Genre/>}/>
          <Route path="view" element={<InfoView/>}/>
        </Route>
        </Route>
      </Routes>
    </Router>
   
    </AutheticationProvider>
  );
}

export default App;
