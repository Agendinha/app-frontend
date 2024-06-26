import { useState } from "react";
import Logo from "../../assets/logo";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { config } from '@/config';

export default function Login() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassowrd, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleRegister = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if(password !== confirmPassowrd){
				swal("Ops!", "As senhas não coincidem!", "error");
				setIsLoading(false);
				return;
			}
			const response = await fetch(`${config.apiUrl}/v1/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, email, password, usertype:"cliente"}),
					redirect: 'follow'
				}
			);

			if (response.redirected) {
                const redirectedResponse = await fetch(response.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password, usertype: "cliente" })
                });

                if (redirectedResponse.ok) {
                    swal("Sucesso", "Conta criada com sucesso!", "success");
                    return navigate("/login");
                } else {
                    throw new Error('Redirected request failed');
                }
            }

			if (response.ok) {
				swal("Sucesso", "Conta criada com sucesso!", "success");

				return navigate("/login");
			} else {
				console.error("Falha no registro.");

				swal(
					"Ops!",
					"Algo deu errado, tente novamente mais tarde!",
					"error"
				);
			}
		} catch (error) {
			console.error("Erro ao enviar requisição de registro:", error);
			swal(
				"Ops!",
				"Algo deu errado, tente novamente mais tarde!",
				"error"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-50 text-black">
			<Logo />
			<div className="flex flex-col w-5/12">
				<form className="flex flex-col" onSubmit={handleRegister}>
				<div className="flex flex-col relative p-2">
						<label
							htmlFor="username"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Nome e Sobrenome
						</label>
						<input
							id="username"
							className="bg-white p-3 mb-2 rounded-md text-black"
							type="text"
							placeholder="John Doe"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-col relative p-2">
						<label
							htmlFor="email"
							className="absolute left-4 top-0 text-sm text-black"
						>
							E-mail
						</label>
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
						<label
							htmlFor="password"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Senha
						</label>
						<input
							id="password"
							className="bg-white p-3 mb-2 rounded-md text-black"
							type="password"
							placeholder="********"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col relative p-2">
						<label
							htmlFor="confirmPassword"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Confirmar senha
						</label>
						<input
							id="confirmPassword"
							className="bg-white p-3 mb-2 rounded-md text-black"
							type="password"
							placeholder="********"
							value={confirmPassowrd}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col p-2 justify-center">
						<button
							className="bg-orange-400 p-3 mb-2 rounded-md text-white"
							type="submit"
							onClick={handleRegister}
							disabled={isLoading}
						>
							<div className="flex justify-center">
								{isLoading ? (
									<Loader2 className="animate-spin h-6 w-6 text-white" />
								) : (
									"Criar conta"
								)}
							</div>
						</button>
						<p className="text-center">
							Já possui uma conta?{" "}
							<a href="/login">Clique aqui</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
