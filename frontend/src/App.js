// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OasisPage from './pages/OasisPage';
import Sobre from './pages/SobrePage';
import PetsPage from './pages/PetsPage';
import MeusDadosPage from './pages/MeusDadosPage';
import AgendamentoPage from './pages/AgendamentoPage';
import GerentePage from './pages/GerentePage'; // import novo

// Componente que protege rotas privadas
function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [userLogado, setUserLogado] = useState(null);

  // Após login bem-sucedido
  function onLoginSuccess(user) {
    console.log('Login efetuado com sucesso!', user);
    setUserLogado(user);
  }

  function handleLogout() {
    setUserLogado(null);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
        <Route path="/sobre" element={<Sobre />} />

        {/* Rota para Gerente, só para user com role 'gerente' */}
        <Route
          path="/gerente"
          element={
            userLogado?.role === 'gerente' ? (
              <GerentePage user={userLogado} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Rota stage — redireciona admin para gerente */}
        <Route
          path="/stage"
          element={
            !userLogado ? (
              <Navigate to="/login" replace />
            ) : userLogado.role === 'gerente' ? (
              <Navigate to="/gerente" replace />
            ) : (
              <OasisPage user={userLogado} onLogout={handleLogout} />
            )
          }
        />

        {/* Rota protegida para Pets */}
        <Route
          path="/pets"
          element={
            <PrivateRoute user={userLogado}>
              <PetsPage user={userLogado} />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para Meus Dados */}
        <Route
          path="/meusdados"
          element={
            <PrivateRoute user={userLogado}>
              <MeusDadosPage user={userLogado} />
            </PrivateRoute>
          }
        />

        {/* Rota protegida para Agendamento */}
        <Route
          path="/agendamento"
          element={
            <PrivateRoute user={userLogado}>
              <AgendamentoPage user={userLogado} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
