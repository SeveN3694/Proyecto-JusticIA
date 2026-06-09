import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/abogado/Dashboard';
import IngresoCaso from './pages/abogado/IngresoCaso';
import EstrategiaLegal from './pages/abogado/EstrategiaLegal';
import DirectorioCasos from './pages/abogado/DirectorioCasos';
import Digitalizacion from './pages/admin/Digitalizacion';
import AgendaCalendario from './pages/abogado/AgendaCalendario';
import FinanzasTracking from './pages/abogado/FinanzasTracking';
import PortalCliente from './pages/cliente/PortalCliente';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas con Sidebar Global (Abogado / Admin) */}
        <Route element={<MainLayout />}>
          {/* Módulo Abogado */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ingreso-caso" element={<IngresoCaso />} />
          <Route path="/estrategia-legal" element={<EstrategiaLegal />} />
          <Route path="/directorio-casos" element={<DirectorioCasos />} />
          <Route path="/agenda" element={<AgendaCalendario />} />
          <Route path="/finanzas" element={<FinanzasTracking />} />
          
          {/* Módulo Operativo / Admin */}
          <Route path="/digitalizacion" element={<Digitalizacion />} />
        </Route>
        
        {/* Módulo Cliente */}
        <Route path="/portal-cliente" element={<PortalCliente />} />
      </Routes>
    </Router>
  );
}

export default App;