import React from 'react';
import './Datepicker.css'; // Import your CSS file for styling

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Datepicker = () => {
  const currentDate = getCurrentDate();

  return (
    <input type="date" className="datepicker-input" defaultValue={currentDate} />
  );
}

export default Datepicker;
