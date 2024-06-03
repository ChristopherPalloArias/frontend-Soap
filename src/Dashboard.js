import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
    const navigate = useNavigate(); // Hook de React Router para manejar la navegación programática
    //redirigir al usuario a diferentes rutas dentro de la aplicación sin necesidad de utilizar enlaces

    // Maneja el evento de cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('authenticated'); // Elimina el estado de autenticación del almacenamiento local
        navigate('/'); // Navega a la página de inicio (login)
    };

    return (
        <div className="dashboard">
            <h1>Bienvenido al Sistema SOAP</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button> {/* Botón para cerrar sesión */}
        </div>
    );
}

export default Dashboard; // Exporta el componente Dashboard como el valor por defecto del módulo
