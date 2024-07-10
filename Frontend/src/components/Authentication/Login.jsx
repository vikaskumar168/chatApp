import React, { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const showErrorToast = () => {
    toast.error("Something went wrong", {
      autoClose: 1500,
    });
  };

 

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      showErrorToast("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      toast.success("Login successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.error("Error response:", error.response); // Log the error response
      showErrorToast("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-0">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="login-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative mb-3">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        >
          {showPassword ? (
            <BiSolidHide className="text-xl" />
          ) : (
            <IoEyeOutline className="text-xl" />
          )}
        </button>
      </div>
      {/* <button
        className="w-full p-2 mb-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={submitHandler}
      >
        Login
      </button> */}
      <button
        className="w-full p-2 mb-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={submitHandler}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {/* {loading && <p className="text-bg-black mb-1">Logging in...</p>} */}
      <button
        className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </button>
    </div>
  );
};

export default Login;
