import React, { useState } from "react";

const HourList = ({ hours }) => {
  const [values, setValues] = useState(Array(hours.length).fill(''));

  const handleButtonClick = (index) => {
    const newValue = prompt(`Digite seu compromisso para ${hours[index]}:`, values[index]);
    if (newValue !== null) {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);
    }
    };
    const clearValue = (index) => {
      const newValue = values[index] = '';
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);
    };
    

  return (
    <div className="flex flex-col text-xl w-5/12 h-3/4 m-4 justify-between">
      {hours.map((hour, index) => (
        <div key={index} className="flex flex-row justify-between bg-white mx-2 p-3 border-2 rounded-2xl items-center">
          <span className="w-2/12">{hour}</span>
          {values[index] === '' &&
            <div className="text-white rounded-xl w-8/12 h-1/4">
            <button
              className="bg-white hover:bg-orange-600 text-white rounded-xl w-full py-1"
              onClick={() => handleButtonClick(index)}
            >
              +
            </button>
          </div>}
          {values[index] && (
            <div className="flex flex-row items-center justify-center w-8/12">
              <span className="mr-2 text-black w-10/12">{values[index]}</span>
              <button 
              className="bg-white text-black text-sm rounded-full w-2/12 py-1 px-2 items-center justify-center"
              onClick={() => clearValue(index)}
              >X</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default HourList;

// export default function Hours() {
//   return (
//   <div className="flex flex-row bg-white text-xl w-3/4 h-3/4 justify-center ">
//   <div className="flex flex-col bg-white text-xl w-3/4 h-3/4 justify-center p-2 ">
//   <div className="p-2 border-2">07:30</div>
//   <div className="p-2 border-2">08:00</div>
//   <div className="p-2 border-2">08:30</div>
//   <div className="p-2 border-2">09:00</div>
//   <div className="p-2 border-2">09:30</div>
//   <div className="p-2 border-2">10:00</div>
//   <div className="p-2 border-2">10:30</div>
//   <div className="p-2 border-2">11:00</div>
//   <div className="p-2 border-2">11:30</div>
//   <div className="p-2 border-2">12:00</div>
//   </div>
//   <div className="flex flex-col bg-white text-xl w-3/4 h-3/4 justify-center p-2">
//   <div className="p-2 border-2">13:00</div>
//   <div className="p-2 border-2">13:30</div>
//   <div className="p-2 border-2">14:00</div>
//   <div className="p-2 border-2">14:30</div>
//   <div className="p-2 border-2">15:00</div>
//   <div className="p-2 border-2">15:30</div>
//   <div className="p-2 border-2">16:00</div>
//   <div className="p-2 border-2">16:30</div>
//   <div className="p-2 border-2">17:00</div>
//   <div className="p-2 border-2">17:30</div>
//   </div>
//   </div>
  
//   );
//   }
  
//   Me ajude a abstrair esta função