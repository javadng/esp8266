import formatDate from "@/utils/formatDate";
import { UserLogItem } from "@/utils/globalInterfaces";

import React from "react";

interface MyComponentProps {
  items: UserLogItem[];
}

const TodaysActivityItems: React.FC<MyComponentProps> = ({ items }) => {
  return items.map((el) => (
    <div
      key={Math.random()}
      className="shadow-lg my-6 w-3/4 mx-auto rounded-3xl bg-indigo-50 p-3 flex flex-col justify-evenly items-center"
    >
      <h2 className="text-start self-start ml-10">
        <span className="italic">Username : </span>
        <span className="font-bold">{el.username}</span>
      </h2>
      <ul className="grid grid-col-1">
        {el.logs.length > 0 &&
          el.logs.map((item) => {
            const enterDate = new Date(item.enter);
            const exitDate = item.exit ? new Date(item.exit) : null;
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
          })}
        {el.logs.length <= 0 && (
          <span className="block underline italic text-red-400">
            No logs Yet
          </span>
        )}
      </ul>
    </div>
  ));
};

export default TodaysActivityItems;
