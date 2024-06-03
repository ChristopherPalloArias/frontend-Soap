import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
    return (
        <Router> {/* Configura el Router para manejar la navegación */}
            <Routes> {/* Define las rutas de la aplicación */}
                {/* Ruta para la página de login */}
                <Route path="/" element={<Login />} />
                {/* Ruta para el dashboard, protegida por PrivateRoute */}
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            </Routes>
        </Router>
    );
}

// Componente para rutas privadas que requieren autenticación
function PrivateRoute({ component: Component, ...rest }) {
    // Verifica si el usuario está autenticado
    return localStorage.getItem('authenticated') ? (
        <Component {...rest} /> // Renderiza el componente si está autenticado
    ) : (
        <Navigate to="/" /> // Redirige a la página de login si no está autenticado
    );
}

export default App; // Exporta el componente App como el valor por defecto del módulo