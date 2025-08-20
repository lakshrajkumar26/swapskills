import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";


const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const res = await axios.post(
    //     "http://localhost:8080/api/auth/login",
    //     formData,
    //     {}
    //   );

    const res = await API.post("/api/auth/login",formData)
      setMessage(res.data.message);
     toast.success(res.data.message || "Login successful!");
      console.log(res.data);
       localStorage.setItem("token",res.data.token)
      Navigate("/dashboard")

      setUser(res.data.user) //this will go up to parents to app -> app -> Navbar
       
    } catch (err) {
        
        if (err.response && err.response.data) {
      toast.error(err.response.data.error || "Login failed");
      
        }
        else{
             toast.error("Something went wrong!");
        }
        
    }

    
  };

  return (
    <>
      {/* background */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
        {/* navbar */}

        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
          <div className="flex items-center space-x-2">
            {/* logo placeholder */}
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="text-white font-semibold text-lg">
              Vaid PR Blogs
            </span>
          </div>
          {/* <button className="p-2 rounded-lg hover:bg-gray-800 transition">
            🌙
          </button> */}
        </nav>

        {/* Background Blurs */}
        <div className="absolute top-32 left-20 w-72 h-72 bg-blue-800 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-800 rounded-full blur-3xl opacity-30"></div>

        {/* Center Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex-grow flex items-center justify-center px-4">
            <div
              className=" w-full max-w-md 
                      p-8 space-y-6 
                     bg-gray-900/80 
                 backdrop-blur-lg 
                       rounded-2xl 
                         shadow-xl dark:shadow-2xl 
                      border  dark:border-gray-700/50 
                         form-container 
                     animate-fade-in-up"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to Vaid PR Blogs
              </h2>
              <p className="text-gray-400 mb-6">
                Log in to continue with blogs
              </p>

              {/* Email */}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 pb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email address"
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Password */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 pb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 mb-6 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Login Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow-md transition"
                type="submit"
              >
                Log in
              </button>

              {/* Footer */}
              <p className="mt-6 text-sm text-gray-400 text-center">
                Not a member yet?{" "}
                <Link to="/register" className="text-blue-400 hover:underline">
                  Sign Up
                </Link>
                <Link to="/forgotpassword" className="p-5 hover:underline text-blue-400">forgot password</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
