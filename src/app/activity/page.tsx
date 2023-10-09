"use client";

import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";

interface Item {
  enter: String;
  formatedDate: String;
  exit: String;
}

const separatedItems: { [key: string]: Item[] } = {};

const ActivityPage = () => {
  const [allActivity, setAllActivity] = useState([]);

  useEffect(() => {
    fetch("/api/get-activity")
      .then((res) => res.json())
      .then((data) => {
        setAllActivity(data.data);
      });
  }, [setAllActivity]);

  console.log(allActivity);

  let elements;

  if (allActivity.length) {
    elements = allActivity.map((item: any) => (
      <div
        key={item.uid}
        className="shadow-lg my-6 w-3/4 mx-auto rounded-3xl bg-indigo-50 p-3 flex flex-col justify-evenly items-center"
      >
        <h2 className="text-start self-start ml-10">
          <span className="italic">Username : </span>
          <span className="font-bold">{item.username}</span>
        </h2>
        <ul className="grid grid-col-1">
          {item.userLogins.length &&
            item.userLogins.map((item: any) => {
              const enterDate = new Date(item.enter);
              const exitDate = item.exit ? new Date(item.exit) : null;
              return (
                <li
                  key={item._id}
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
        </ul>
      </div>
    ));
  }

  return <div>{elements}</div>;
};

export default ActivityPage;
