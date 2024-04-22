import { useState } from "react";
import Logo from "../../assets/logo";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRemember] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Lembrar-me:', rememberMe);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-200 text-black">
      <Logo />
      <div className="flex flex-col w-5/12">
        <form action="login" className="flex flex-col">
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
              className=" mr-2"
              value={rememberMe}
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