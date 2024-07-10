import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/background2.jpg";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full max-w-md p-3 bg-white border border-gray-300 rounded-lg box-border">
        <h1 className="text-center text-3xl">Welcome to Chat App</h1>
      </div>
      <div
        className={`w-full max-w-md border border-gray-300 rounded-lg overflow-hidden mx-auto mt-2 p-5 box-border bg-white transition-all duration-300 ${
          isLogin ? "h-auto" : "h-auto"
        }`}
      >
        <div className="text-center mb-0">
          <button
            className={`rounded-full py-2 px-5 mr-4 ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            } border-none cursor-pointer`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`rounded-full py-2 px-5 ml-4 ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            } border-none cursor-pointer`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <>
            <Login />
            <div className="text-center">
              <p>
                Not registered?{" "}
                <span
                  className="text-blue-500 cursor-pointer underline"
                  onClick={toggleView}
                >
                  Create an account
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <div className="text-center">
              <p>
                Already registered?{" "}
                <span
                  className="text-blue-500 cursor-pointer underline"
                  onClick={toggleView}
                >
                  Login
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
