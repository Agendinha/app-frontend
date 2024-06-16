import React, { useState } from 'react';
import HourList from './hoursList.jsx';

export default function Days() {


const morningHours = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
const afternoonHours = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const schedule = daysOfWeek.reduce((acc, day) => {
  acc[day] = {
    morning: morningHours,
    afternoon: afternoonHours
  };
  return acc;
}, {});

  const initialCommitments = {};
  Object.keys(schedule).forEach(day => {
    initialCommitments[day] = {
      morning: Array(schedule[day].morning.length).fill(''),
      afternoon: Array(schedule[day].afternoon.length).fill('')
    };
  });

  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [commitments, setCommitments] = useState(initialCommitments);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const updateCommitments = (period, newValues) => {
    setCommitments((prevCommitments) => ({
      ...prevCommitments,
      [selectedDay]: {
        ...prevCommitments[selectedDay],
        [period]: newValues
      }
    }));
  };
  

  return (
    <div className="flex flex-col md:text-xl w-full h-3/4 justify-center items-center">
      
      <div className="flex h-full md:w-3/12 justify-center content-center bg-white rounded-full p-2 border-2">
        <select
          value={selectedDay}
          onChange={handleDayChange}
          className="bg-white w-full p-2 rounded-full text-center md:text-xl"
        >
          {Object.keys(schedule).map((day) => (
            <option key={day} value={day} className="text-sm">
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row text-xl w-full h-full justify-center">
        <HourList
          hours={schedule[selectedDay].morning}
          values={commitments[selectedDay].morning}
          updateValues={(newValues) => updateCommitments('morning', newValues)}
        />
        <HourList
          hours={schedule[selectedDay].afternoon}
          values={commitments[selectedDay].afternoon}
          updateValues={(newValues) => updateCommitments('afternoon', newValues)}
        />
      </div>
    </div>
  );
}