import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [response, setResponse] = useState();

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login setResponse={setResponse} />} />
          <Route path="/dashboard" element={<Dashboard data={response} />} />
        </Routes>
    </div>
  );
}

export default App;
