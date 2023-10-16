import formatDate from "@/utils/formatDate";
import { LogItem } from "@/utils/globalInterfaces";
import React from "react";

interface MyComponentProps {
  items: LogItem[];
}

const SearchActivityItems: React.FC<MyComponentProps> = ({ items }) => {
  return items.map((el) => {
    const enterDate = new Date(el.enter);
    const exitDate = el.exit ? new Date(el.exit) : null;

    return (
      <li
        key={Math.random()}
        className="grid md:grid-cols-2 gap-3 justify-between my-1 odd:bg-indigo-400 even:bg-indigo-100 odd:text-white p-3 rounded-2xl"
      >
        <h3 className="row-start-2 sm:row-start-1">
          <span>خروج : </span>
          <span>{exitDate && formatDate(exitDate)}</span>
        </h3>
        <h3 className="md:col-start-2">
          <span> ورود : </span>
          <span>{formatDate(enterDate)}</span>
        </h3>
      </li>
    );
  });
};

export default SearchActivityItems;
