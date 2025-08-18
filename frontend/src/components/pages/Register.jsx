import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
  };

  const handleSubmit = async (e) => {
         e.preventDefault();

    if(formData.password !== formData.confirmPassword){
        toast.error("Password do not match!");
        return; //stop from sub,mit
    }
    const {confirmPassword, ...dataWithoutConfirmPass} = formData   // destr trick to exclude 
 
    try {
      const res = await API.post("/api/auth/register", dataWithoutConfirmPass);
      console.log(res.data);

      setMessage(res.data.message);
      toast.success(res.data.message || "User Registered Successfully");
      Navigate("/login");
    } catch (err) {
         if(err.response && err.response.data){
            toast.error(err.response.error || "Registation Failed")
         }
         else{
            toast.error("Somewthing wents Wrong!")
         }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          {/* logo placeholder */}
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <span className="text-white font-semibold text-lg">
            Vaid PR Blogs
          </span>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-800 transition">
          🌙
        </button>
      </nav>

      {/* Background Blurs */}
      <div className="absolute top-32 left-20 w-72 h-72 bg-blue-800 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-800 rounded-full blur-3xl opacity-30"></div>

      {/* Center Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-2 animate-pop-in-out">
              Create Your Account
            </h2>
            <p className="text-gray-400 mb-6">Sign up to join the community</p>

            {/* Username */}
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 pb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              className="w-full px-3 py-2 mb-4 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 pb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email address"
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
              className="w-full px-3 py-2 mb-4 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Confirm Password */}
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 pb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 mb-6 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow-md transition"
            >
              Sign Up
            </button>

            {/* Footer */}
            <p className="mt-6 text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
