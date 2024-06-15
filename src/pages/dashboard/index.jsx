import Modal from "@/components/modal/modal";
import { useState } from "react";
import DefaultView from "@/components/defaultView/defaultView";
import Calendar from "@/components/calendar/calendar";

function Dashboard() {
	const [isOpen, setModalIsOpen] = useState(false);

	const logout = () => {
		localStorage.removeItem("access_token");
		setModalIsOpen(false);
		window.location.href = "/login";
	};

	return (
		<DefaultView>
			<div className="flex flex-col items-center justify-center h-full w-screen bg-orange-50">
				{/* <h1 className="text-2xl">Dashboard</h1> */}
				{/* <button onClick={() => setModalIsOpen(true)}>Logout</button> */}
				<Calendar />
				{/* <Modal
					isOpen={isOpen}
					setModalIsOpen={() => setModalIsOpen(!isOpen)}
					textModal="Logout feito com sucesso!"
					buttonSuccess="Fechar"
					successFunction={() => logout()}
				/> */}
			</div>
		</DefaultView>
	);
}

export default Dashboard;
