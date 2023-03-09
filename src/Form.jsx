import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import userGenerator from "./helpers/userGenerator";
import customDateRanges, { defaultInputRanges } from "./helpers/customDateRanges";

export default function Form({ handleFormSubmission }) {
  const today = new Date();
  const [numUsers, setNumUsers] = useState(1000);
  const [numEvents, setNumEvents] = useState(8);
  const [error, setError] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(Date.now() + 604800000),
      endDate: new Date(),
      key: "selection",
    }
  ]);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };

  useEffect(() => {
    console.log(selectedDateRange[0].startDate.toISOString());
    console.log(selectedDateRange[0].endDate.toISOString());
  }, [selectedDateRange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let userTokens = userGenerator(numUsers);
    let minDate = selectedDateRange[0].startDate.toISOString();
    let maxDate = selectedDateRange[0].endDate.toISOString();
    if (numUsers * numEvents > 500000){
        setError("Amount exceeds maximum number of events allowed. Limit: 500,000");
        setNumUsers(1000)
        setNumEvents(8)
      return;
    }
    handleFormSubmission(userTokens, numEvents, minDate, maxDate);
    setError("");
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Enter Number of UserTokens to Generate
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="numUsers"
          type="text"
          placeholder="1000"
          pattern="[0-9]*"
          value={numUsers}
          onChange={(event) => setNumUsers(parseInt(event.target.value) || 0)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Enter Number of Events per User
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="numEvents"
          type="text"
          placeholder="8"
          pattern="[0-9]*"
          value={numEvents}
          onChange={(event) => setNumEvents(parseInt(event.target.value) || 0)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="date-range"
        >
          Date Range
        </label>
        <DateRangePicker
          ranges={selectedDateRange}
          onChange={handleDateRangeChange}
          maxDate={today}
          minDate={new Date(new Date().setDate(today.getDate() - 60))}
          staticRanges={customDateRanges()}
          inputRanges={[]}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
          Customize Event Types
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="4"
          placeholder="Enter Event Names as Comma Separated List"
        />
      </div>
      <div className="flex items-center justify-between">
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
