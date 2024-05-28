import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
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
        } else {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}

export default Login;
