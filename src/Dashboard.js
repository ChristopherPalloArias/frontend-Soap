import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h1>Bienvenido al Sistema SOAP</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Dashboard;
