import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText={"dd/mm/yyyy"}
      filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
      showYearDropdown
      scrollableYearDropdown
    />
  );
};

export default DatePickerComponent;
