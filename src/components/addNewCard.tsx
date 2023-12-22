"use client";

import { useState } from "react";
import Input from "./input";
import SubmitBtn from "./submit-btn";
import useHttp from "@/hooks/useHtttp";
import Loading from "./loading";

const AddNewCard = () => {
  const [username, setUsername] = useState("");
  const [UID, setUID] = useState("");
  const { httpResponse, sendHttpRequest } = useHttp();

  const usernameChangeHndlr = (e: any) => setUsername(e.target.value);
  const uidChangeHndlr = (e: any) => setUID(e.target.value);

  const SubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!UID || !UID.trim() || !username || !username.trim()) return;

    const data = {
      uid: UID,
      username,
    };

    const option: RequestInit = {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "applicaion/json" },
      body: JSON.stringify(data),
    };

    sendHttpRequest(`/api/register-new-user`, option);
  };

  console.log(httpResponse);

  return (
    <>
      {httpResponse.loading && <Loading />}
      <form
        onSubmit={SubmitHandler}
        className="w-1/2 bg-blue-300 p-2 rounded-lg my-6 mx-auto"
      >
        <h1 className="text-white text-xl mt-3 font-bold uppercase">
          Set new Card
        </h1>
        <div className="form-row pb-3">
          <Input
            id="username"
            placeholder="Username"
            type="text"
            setInputChange={usernameChangeHndlr}
            value={username}
          />
          <Input
            id="uid"
            placeholder="UID"
            type="text"
            setInputChange={uidChangeHndlr}
            value={UID}
          />
          <SubmitBtn text="Add card" />
        </div>
      </form>
      {httpResponse.result?.message && (
        <h2 className="p-3 text-xl text-center font-bold">
          {httpResponse.result?.message}
        </h2>
      )}
    </>
  );
};

export default AddNewCard;
