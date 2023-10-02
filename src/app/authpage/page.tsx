"use client";

import { useState } from "react";
import SignIn from "../../components/auth/signin";
import SignUp from "../../components/auth/signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginState = () => setIsLogin((prevState: Boolean) => !prevState);

  return (
    <div>
      <div className="max-w-xl mx-auto bg-blue-400 p-8 my-6 rounded-2xl">
        {isLogin && <SignIn />}
        {!isLogin && <SignUp />}

        {isLogin && (
          <h3 className="text-white text-center">
            {"Don't have an account?"}{" "}
            <span
              className="underline italic cursor-pointer"
              onClick={changeLoginState}
            >
              Sign up
            </span>
          </h3>
        )}
        {!isLogin && (
          <h3 className="text-white text-center">
            Do you already have an account?{" "}
            <span
              className="underline italic cursor-pointer"
              onClick={changeLoginState}
            >
              Login
            </span>
          </h3>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
