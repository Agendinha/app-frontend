import React from "react";

const HourList = ({ hours, values, updateValues }) => {
  const handleButtonClick = (index) => {
    const newValue = prompt(`Digite seu compromisso para ${hours[index]}:`, values[index]);
    if (newValue !== null) {
      const newValues = [...values];
      newValues[index] = newValue;
      updateValues(newValues);
    }
  };

  const clearValue = (index) => {
    const newValues = [...values];
    newValues[index] = '';
    updateValues(newValues);
  };

  return (
    <div className="flex flex-col text-sm md:text-xl md:w-5/12 h-3/4 m-4 justify-between">
      {hours.map((hour, index) => (
        <div key={index} className="flex flex-row justify-between bg-white mx-2 p-3 border-2 rounded-2xl items-center">
          <span className="w-2/12">{hour}</span>
          {values[index] === '' ? (
            <div className="text-white rounded-xl w-8/12 h-1/4 md:mr-10">
              <button
                className="bg-white hover:bg-orange-600 text-white rounded-xl w-full py-1"
                onClick={() => handleButtonClick(index)}
              >
                +
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center w-8/12">
              <span className="h-1/4 mr-2 text-black w-10/12 py-1">{values[index]}</span>
              <button
                className="bg-white text-black text-sm rounded-full w-2/12 py-1 px-2 items-center justify-center"
                onClick={() => clearValue(index)}
              >
                X
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HourList;