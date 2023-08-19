import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ date, onDateChange, startDate, endDate }) => {
  return (
    <DatePicker
      showIcon
      selected={date}
      onChange={onDateChange}
      placeholderText="Click to select a date range"
      startDate={startDate}
      endDate={endDate}
      selectsRange
      // locale="en-GB"
      showYearDropdown
      showMonthDropdown
      className="date-picker-input"
      dateFormat="dd MMMM yyyy"
      // customStyles={{
      //   dateInput: {
      //     borderWidth: 0,
      //     borderBottomWidth: 1,
      //     borderBottomColor: "#00c5fb",
      //   },
      //   dateText: {
      //     color: "red",
      //     justifyContent: "flex-start",
      //   },
      // }}
    />
  );
};

export default DateRangePicker;
