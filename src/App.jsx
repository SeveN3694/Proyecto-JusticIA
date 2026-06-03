import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AbogadoDashboard from './pages/abogado/Dashboard';
import ClientePortal from './pages/cliente/PortalCliente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/abogado/dashboard" element={<AbogadoDashboard />} />
        <Route path="/cliente/portal" element={<ClientePortal />} />
      </Routes>
    </Router>
  );
}

export default App;