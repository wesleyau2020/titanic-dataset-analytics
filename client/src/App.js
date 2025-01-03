import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./dashboard/Dashboard";
import Analytics from "./analytics/Analytics";
import Clients from "./clients/Clients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/clients" element={<Clients />} />
    </Routes>
  );
}

export default App;
