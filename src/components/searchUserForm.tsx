"use client";
import { useState } from "react";
import Input from "./input";
import SubmitBtn from "./submit-btn";
import SearchActivityItems from "./searchActivity";
import useHttp from "@/hooks/useHtttp";

const SearchUserForm = () => {
  const [username, setUsername] = useState("");
  const { httpResponse, sendHttpRequest } = useHttp();
  let errorMessage = "";
  let usernameServer;
  let elements;

  const usernameChangeHndlr = (e: any) => setUsername(e.target.value);

  const submitHanler = async (e: any) => {
    e.preventDefault();

    try {
      const option: RequestInit = {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      };
      sendHttpRequest(`/api/search-activity`, option);
    } catch (error: any) {
      errorMessage = error.message;
    }
  };

  if (httpResponse?.result?.status === "success") {
    const items = httpResponse?.result?.data.logs;

    elements = (
      <ul className="text-center">
        <h2 className="text-2xl my-3 underline italic text-red-500 font-bold">
          {usernameServer}
        </h2>
        <SearchActivityItems items={items} />;
      </ul>
    );
  }
  if (httpResponse.error) {
    // elements = <h2>{httpResponse.error}</h2>;
  }

  return (
    <div>
      <form
        onSubmit={submitHanler}
        className="bg-blue-300 p-6 my-6 text-center"
      >
        <h2 className="text-white text-2xl my-3">Search username:</h2>
        <span className="text-red-500 text-sm md:text-xl underline font-bold italic">
          NOTE: only admin can search for all users!
        </span>
        <Input
          id="username"
          placeholder="Username"
          type="text"
          setInputChange={usernameChangeHndlr}
          value={username}
        />
        <SubmitBtn text="Search" />
      </form>

      {elements && (
        <h3 className="text-center my-6 text-2xl">Search result for user: </h3>
      )}
      {errorMessage === "" && elements}
      {errorMessage !== "" && errorMessage}
    </div>
  );
};
export default SearchUserForm;
