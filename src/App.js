import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            </Routes>
        </Router>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    return localStorage.getItem('authenticated') ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" />
    );
}

export default App;
