"use client";

import React from "react";

interface MyComponentProps {
  setFilterDate: (newFilter: { start: string; end: string }) => void;
  filterDate: { start: string; end: string };
}

const DateFilter: React.FC<MyComponentProps> = ({
  setFilterDate,
  filterDate,
}) => {
  const startDateHandler = (e: any) =>
    setFilterDate({ start: e.target.value, end: filterDate.end });

  const endDateHandler = (e: any) =>
    setFilterDate({ start: filterDate.start, end: e.target.value });

  return (
    <div className="grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-5">
      <div className="my-3 md:col-start-1 flex flex-col">
        <span className="text-xl text-white my-2">Start from: </span>
        <input
          onChange={startDateHandler}
          value={filterDate.start}
          type="date"
          name="start"
          id="start"
          lang="fa"
        />
      </div>
      <div className="my-3 md:col-start-2 flex flex-col">
        <span className="text-xl text-white my-2">Until (optional): </span>
        <input
          onChange={endDateHandler}
          value={filterDate.end}
          type="date"
          name="end"
          id="end"
        />
      </div>
    </div>
  );
};

export default DateFilter;
