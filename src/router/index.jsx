import { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Login from '../pages/Login/login';
import Register from '../pages/Register/register';

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} Component={Home}/>
        <Route path="/login" element={<Login />} Component={Login}/>
        <Route path="/register" element={<Register />} Component={Register}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('access_token'); 
      if (!token) {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    }, [navigate]);
  
    return null;
  }

export default MainRouter;
