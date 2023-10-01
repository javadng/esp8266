import { useState } from "react";
import Input from "./input";
import SubmitBtn from "./submit-btn";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const nameChangeHander = (e) => setName(e.target.value);
  const usernameChangeHander = (e) => setUsername(e.target.value);
  const emailChangeHander = (e) => setEmail(e.target.value);
  const passwordChangeHander = (e) => setPassword(e.target.value);
  const passwordConfirmChangeHndl = (e) => setPasswordConfirm(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      username,
      name,
      email,
      password,
      passwordConfirm,
    };
  };

  return (
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
    </form>
  );
};

export default SignUp;
