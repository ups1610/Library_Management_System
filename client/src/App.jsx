import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
