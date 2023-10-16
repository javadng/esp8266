"use client";

import { useState } from "react";
import Input from "./input";
import SubmitBtn from "./submit-btn";

const AddNewCard = () => {
  const [username, setUsername] = useState("");
  const [UID, setUID] = useState("");

  const usernameChangeHndlr = (e: any) => setUsername(e.target.value);
  const uidChangeHndlr = (e: any) => setUID(e.target.value);

  const SubmitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      uid: UID,
      username,
    };

    const res = await fetch("/api/register-new-user", {
      method: "POST",
      headers: { "Content-Type": "applicaion/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log(result);
  };

  return (
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
  );
};

export default AddNewCard;
