import { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('authToken'); 
      if (!token) {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    }, [navigate]);
  
    return null;
  }

export default MainRouter;
