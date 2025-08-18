import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person, Logout } from "@mui/icons-material";
import API from "../api/axios";

const Navbar = ( {user,setUser }) => {
  const navigate = useNavigate();

  // Fetch profile if token exists
  useEffect(() => {

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-blue-400">
        SwapSkills
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

       {user && ( <Link to="/dashboard" className="hover:text-blue-400">
          DashBoard
        </Link>)}

        {!user && (
          <>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" className="flex items-center gap-1 hover:text-blue-400">
              <Person /> {user.username}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-red-400 transition"
            >
              <Logout /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
