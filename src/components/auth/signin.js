import Input from "./input";
import SubmitBtn from "./submit-btn";
import { useState } from "react";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHander = (e) => setUsername(e.target.value);
  const passwordChangeHander = (e) => setPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
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
