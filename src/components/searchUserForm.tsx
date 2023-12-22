"use client";
import { useState } from "react";
import SubmitBtn from "./submit-btn";
import SearchActivityItems from "./searchActivity";
import useHttp from "@/hooks/useHtttp";
import DateFilter from "./dateSearchFilter";
import Loading from "./loading";

const focusClass =
  "focus:-translate-y-1 focus:shadow-lg focus-within:bg-gray-light focus-within:placeholder:text-dark-c";
const normalClass =
  "bg-gray-transparent border-blue-400 transition placeholder:text-white rounded-xl block w-full text-dark-c";
const errorClass = "invalid:border-red-500 invalid:shadow-custom-red";

const SearchUserForm = () => {
  const [username, setUsername] = useState("");
  const [dateFilterOn, setDateFilterOn] = useState(false);
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });

  const { httpResponse, sendHttpRequest } = useHttp();
  let elements;

  const usernameChangeHndlr = (e: any) => setUsername(e.target.value);
  const checkBoxHndlr = (e: any) => setDateFilterOn(e.target.checked);

  const submitHanler = async (e: any) => {
    e.preventDefault();

    if (!username && !username.trim()) {
      return;
    }

    const data = {
      username,
      filter: { start: "", end: "" },
    };

    if (filterDate.start) data.filter.start = filterDate.start;
    if (filterDate.end) data.filter.end = filterDate.end;

    setUsername("");

    const option: RequestInit = {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    if (filterDate.start || filterDate.end) {
      sendHttpRequest(
        `/api/search-activity/${filterDate.start}/${filterDate.end}`,
        option
      );
    } else {
      sendHttpRequest(`/api/search-activity`, option);
    }
  };

  if (httpResponse.error) {
    elements = (
      <h2 className="text-center font-bold text-red-500">
        {httpResponse.error}
      </h2>
    );
  }

  if (httpResponse?.result?.status === "success") {
    const items = httpResponse?.result?.data.logs;
    const usernameServer = httpResponse?.result?.data?.username;

    elements = (
      <ul className="text-center">
        <h2 className="text-2xl my-3 underline italic text-red-500 font-bold">
          {usernameServer}
        </h2>
        <SearchActivityItems items={items} />;
      </ul>
    );
  }

  return (
    <div className="md:w-1/2 mx-auto">
      {httpResponse.loading && <Loading />}
      <form
        onSubmit={submitHanler}
        className="bg-blue-300 p-6 my-6 text-center rounded-2xl"
      >
        <h2 className="text-white text-2xl my-3">Search username:</h2>
        <span className="text-red-500 text-sm md:text-xl underline font-bold italic">
          NOTE: only admin can search for all users!
        </span>
        <div className="my-8 mx-auto w-4/5 relative">
          <input
            id="username"
            placeholder=" "
            type="text"
            onChange={usernameChangeHndlr}
            value={username}
            className={`${normalClass} ${focusClass} ${errorClass} input-form`}
          />
          <label
            htmlFor="username"
            className="label-form transition duration-300 absolute left-4 top-2 text-white"
          >
            username
          </label>
        </div>
        <div className="flex items-center text-white justify-center">
          <input type="checkbox" id="dateFilterOn" onChange={checkBoxHndlr} />
          <label htmlFor="dateFilterOn" className="ml-3 italic">
            Do you want to filtered Based on date?
          </label>
        </div>
        {dateFilterOn && (
          <DateFilter setFilterDate={setFilterDate} filterDate={filterDate} />
        )}
        <SubmitBtn text="Search" />
      </form>
      {!httpResponse.error && (
        <h3 className="text-center my-6 text-2xl">Search result for user: </h3>
      )}
      {elements}
    </div>
  );
};
export default SearchUserForm;
