import DefaultView from "@/components/defaultView/defaultView";
import Calendar from "@/components/calendar/calendar";

function Dashboard() {

	return (
		<DefaultView>
			<div className="flex flex-col items-center justify-center h-full w-screen bg-orange-50 ">
				<Calendar />
			</div>
		</DefaultView>
	);
}

export default Dashboard;
