import { redirect } from "next/navigation";
import Input from "../input";
import SubmitBtn from "../submit-btn";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const usernameChangeHander = (e) => setUsername(e.target.value);
  const passwordChangeHander = (e) => setPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signin", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.status === "success") router.replace("/");
  };

  return (
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
    </form>
  );
};

export default SignIn;
