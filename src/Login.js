import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    // Estados para almacenar el nombre de usuario, la contraseña y los mensajes de respuesta
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook de React Router para la navegación programática
    //redirigir al usuario a diferentes rutas dentro de la aplicación sin necesidad de utilizar enlaces 

    // Maneja el envío del formulario de inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Crea el mensaje SOAP con las credenciales del usuario
        const xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="http://example.com/login">
                <soapenv:Header/>
                <soapenv:Body>
                    <log:login>
                        <log:username>${username}</log:username>
                        <log:password>${password}</log:password>
                    </log:login>
                </soapenv:Body>
            </soapenv:Envelope>
        `;

        try {
            // Realiza una solicitud POST al servidor SOAP
            const response = await fetch('http://localhost:3000/soap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                },
                body: xml,
            });

            const text = await response.text(); // Obtiene la respuesta en texto
            console.log(text); // Imprime la respuesta en la consola para depuración
            if (text.includes('Login Successfully')) {
                setMessage('Login Successful'); // Actualiza el mensaje de estado
                localStorage.setItem('authenticated', 'true'); // Guarda el estado de autenticación en localStorage
                navigate('/dashboard'); // Navega al dashboard si el inicio de sesión es exitoso
            } else {
                setMessage('Invalid credentials'); // Actualiza el mensaje de estado si las credenciales son inválidas
            }
        } catch (error) {
            setMessage('Error connecting to the server'); // Actualiza el mensaje de estado si hay un error en la conexión
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Login SOAP</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button type="submit">Login</button>
                </form>
                <p>{message}</p> {/* Muestra el mensaje de estado */}
            </div>
        </div>
    );
}

export default Login;
