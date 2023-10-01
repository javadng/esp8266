"use client";
import { useState } from "react";
import SignIn from "../../components/auth/signin";
import SignUP from "../../components/auth/signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginState = () => setIsLogin((prevState: boolean) => !prevState);

  return (
    <div className=" py-6 text-black">
      <div className="max-w-lg mx-auto bg-blue-400 p-6 rounded-xl">
        {isLogin && <SignIn />}
        {!isLogin && <SignUP />}
        <h3 className="text-center p-3 text-white">
          Do you already have an account ?
          <span
            className="underline inline-block mx-1.5 cursor-pointer"
            onClick={changeLoginState}
          >
            {isLogin && "login"}
            {!isLogin && "signup"}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default AuthPage;
