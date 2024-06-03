import Modal from "@/components/modal/modal";
import { useState } from "react";
import DefaultView from "@/components/defaultView/defaultView";

function Dashboard() {
	const [isOpen, setModalIsOpen] = useState(false);

	const logout = () => {
		localStorage.removeItem("access_token");
		setModalIsOpen(false);
		window.location.href = "/login";
	};

	return (
		<DefaultView>
			<div className="flex flex-col items-center justify-center h-screen w-screen bg-orange-50">
				<h1 className="text-2xl">Dashboard</h1>
				<button onClick={() => setModalIsOpen(true)}>Logout</button>
				<Modal
					isOpen={isOpen}
					setModalIsOpen={() => setModalIsOpen(!isOpen)}
					textModal="Logout feito com sucesso!"
					buttonSuccess="Fechar"
					successFunction={() => logout()}
				/>
			</div>
		</DefaultView>
	);
}

export default Dashboard;
