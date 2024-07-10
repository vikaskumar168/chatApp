import React, { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function postDetails(pics) {
    if (!pics) {
      return toast.error("Please Select an Image");
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      return toast.error("Please Select a JPEG or PNG Image");
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "chatapp");
    data.append("cloud_name", "dbagil612");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 10 seconds timeout

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbagil612/image/upload",
        {
          method: "POST",
          body: data,
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const result = await res.json();
      setPicture(result.url.toString());
      console.log(result.url.toString());
      setLoading(false);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request timed out");
        toast.error("Request timed out");
      } else {
        console.log(error);
        toast.error("Image upload failed");
      }
      setLoading(false);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
        "https://chatapp-backend-ox47.onrender.com/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );

      toast.success("User Registration is successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <form onSubmit={submitHandler}>
        <div className="mb-1">
          <label
            htmlFor="signup-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="signup-name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative mb-1">
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="signup-password"
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
        <div className="relative mb-1">
          <label
            htmlFor="signup-cpassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="signup-cpassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            {showPassword ? (
              <BiSolidHide className="text-xl" />
            ) : (
              <IoEyeOutline className="text-xl" />
            )}
          </button>
        </div>
        <div className="mb-1">
          <label
            htmlFor="signup-file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="signup-file"
            onChange={(e) => postDetails(e.target.files[0])}
            className="w-full p-2 mb-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading && <p>Uploading...</p>}
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
