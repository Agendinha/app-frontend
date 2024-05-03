import { useState } from "react";
import Logo from "../../assets/logo";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Login() {
	const [nomeCompleto, setNomeCompleto] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassowrd, setConfirmPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [userType, setUserType] = useState("Cliente");
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
			const response = await fetch(
				"https://api.agendinha.online/api/v1/register/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ nomeCompleto, email, password, phone, userType}),
				}
			);

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
		<div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-200 text-black">
			<Logo />
			<div className="flex flex-col w-5/12">
				<form className="flex flex-col" onSubmit={handleRegister}>
				<div className="flex flex-col relative p-2">
						<label
							htmlFor="nomeCompleto"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Nome completo
						</label>
						<input
							id="nomeCompleto"
							className="bg-white p-3 mb-2 rounded-md text-black"
							type="text"
							placeholder="John doe"
							value={nomeCompleto}
							onChange={(e) => setNomeCompleto(e.target.value)}
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
					<div className="flex flex-col relative p-2">
						<label
							htmlFor="phone"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Telefone
						</label>
						<input
							id="phone"
							className="bg-white p-3 mb-2 rounded-md text-black"
							type="text"
							placeholder="35987654321"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="flex flex-col relative p-2">
						<label
							htmlFor="userType"
							className="absolute left-4 top-0 text-sm text-black"
						>
							Tipo de usuário
						</label>
						<select
							id="userType"
							className="bg-white p-3 mb-2 rounded-md text-black"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="Cliente">Cliente</option>
							<option value="Parceiro">Parceiro</option>
						</select>
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
