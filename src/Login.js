import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

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
            const response = await fetch('http://localhost:3000/soap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                },
                body: xml,
            });

            const text = await response.text();
            console.log(text);
            if (text.includes('Login Successfully')) {
                setMessage('Login Successful');
                localStorage.setItem('authenticated', 'true');
                navigate('/dashboard');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Error connecting to the server');
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
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Login;
