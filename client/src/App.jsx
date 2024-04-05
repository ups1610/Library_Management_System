import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared";
import Landing, { Dashboard, Catalog } from "./pages";
import AddBookForm from "./components/modals/PopupForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="catalog" element={<Catalog/>}/>
          <Route path="form" element={<AddBookForm/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
