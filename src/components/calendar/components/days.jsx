
import HourList from "./hoursList.jsx";

export default function Days() {
  const morningHours = [
    "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00"
  ];

  const afternoonHours = [
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  return (
    <div className="flex flex-col text-xl w-3/4 h-3/4 justify-center items-center">

      <div className="flex h-full w-4/12 justify-center content-center  bg-white rounded-full p-2 border-2">Segunda</div>
      <div className="flex flex-row text-xl w-full h-full justify-center">
        <HourList hours={morningHours} />
        <HourList hours={afternoonHours} />
      </div>
    </div>
  );
}
