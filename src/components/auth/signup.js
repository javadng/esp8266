import { useState } from "react";
import Input from "../input";
import SubmitBtn from "../submit-btn";
import useHttp from "@/hooks/useHtttp";
import Loading from "../loading";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { httpResponse, sendHttpRequest } = useHttp();

  const nameChangeHander = (e) => setName(e.target.value);
  const usernameChangeHander = (e) => setUsername(e.target.value);
  const emailChangeHander = (e) => setEmail(e.target.value);
  const passwordChangeHander = (e) => setPassword(e.target.value);
  const passwordConfirmChangeHndl = (e) => setPasswordConfirm(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      username,
      name,
      email,
      password,
      passwordConfirm,
    };

    if (
      !username ||
      !username.trim() ||
      !name ||
      !name.trim() ||
      !email ||
      !email.trim() ||
      !password ||
      !password.trim() ||
      !passwordConfirm ||
      !passwordConfirm.trim()
    )
      return;

    const option = {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    };

    sendHttpRequest(`/api/auth/signup`, option);
  };

  console.log(httpResponse);

  return (
    <>
      {httpResponse.loading && <Loading />}
      <form onSubmit={submitHandler} className="my-6 text-center">
        <Input
          id="name"
          placeholder="Full Name"
          type="text"
          setInputChange={nameChangeHander}
          value={name}
        />
        <Input
          id="username"
          placeholder="username"
          type="text"
          setInputChange={usernameChangeHander}
          value={username}
        />
        {/* <Input id="phone" placeholder="Phone Number" type="text" /> */}
        <Input
          id="email"
          placeholder="Email"
          type="email"
          setInputChange={emailChangeHander}
          value={email}
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          setInputChange={passwordChangeHander}
          value={password}
        />
        <Input
          id="passwordConfirm"
          placeholder="Password confirm"
          type="password"
          setInputChange={passwordConfirmChangeHndl}
          value={passwordConfirm}
        />
        <SubmitBtn text="Sign up" />
        <h2 className="text-xl text-center font-bold text-red-500 p-3 bg-gray-50 bg-opacity-20 rounded-xl my-4">
          {httpResponse.error && httpResponse.error}
          {/* {httpResponse.error && httpResponse.result.message} */}
        </h2>
      </form>
    </>
  );
};

export default SignUp;
