import { useState } from "react";
import Logo from "../../assets/logo";
// import {Navigate} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.agendinha.online/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Login bem-sucedido!');


        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);

        return navigate('/');

      } else {

        console.error('Falha no login.');
      }
    } catch (error) {
      console.error('Erro ao enviar requisição de login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-200 text-black">
      <Logo />
      <div className="flex flex-col w-5/12">
        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="flex flex-col relative p-2">
            <label htmlFor="email" className="absolute left-4 top-0 text-sm text-black">E-mail</label>
            <input
              id="email"
              className="bg-white p-3 mb-2 rounded-md text-black"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative p-2">
            <label htmlFor="password" className="absolute left-4 top-0 text-sm text-black">Senha</label>
            <input
              id="password"
              className="bg-white p-3 mb-2 rounded-md text-black"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row p-2">
            <input
              id="remember"
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRemember(!rememberMe)}
            />
            <label htmlFor="remember" className="text-sm">Lembrar-me</label>
          </div>
          <div className="flex flex-col p-2">
            <button
              className="bg-orange-500 p-3 mb-2 rounded-md text-white"
              type="submit"
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}