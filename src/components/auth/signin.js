import { redirect } from "next/navigation";
import Input from "../input";
import SubmitBtn from "../submit-btn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useHttp from "@/hooks/useHtttp";
import Loading from "../loading";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { httpResponse, sendHttpRequest } = useHttp();

  const usernameChangeHander = (e) => setUsername(e.target.value);
  const passwordChangeHander = (e) => setPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !username.trim() || !password || !password.trim()) return;

    const option = {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, password }),
    };

    sendHttpRequest(`/api/auth/signin`, option);
  };

  if (httpResponse.result?.status === "success") router.replace("/");

  return (
    <>
      {httpResponse.loading && <Loading />}
      <form onSubmit={submitHandler} className="my-6 text-center">
        <Input
          id="username"
          placeholder="Email"
          type="text"
          setInputChange={usernameChangeHander}
          value={username}
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          setInputChange={passwordChangeHander}
          value={password}
        />
        <SubmitBtn text="Login" />
        <h2 className="text-xl text-center font-bold text-red-500 p-3 bg-gray-50 bg-opacity-20 rounded-xl my-4">
          {httpResponse.error && httpResponse.error}
        </h2>
      </form>
    </>
  );
};

export default SignIn;
