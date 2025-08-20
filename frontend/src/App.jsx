import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import Register from "./components/pages/Register";
import NavBar from "./components/NavBar";
import Layout from "./components/layout/Layout";
import DashBoard from "./components/pages/DashBoard";
import ProfilePage from "./components/pages/ProfilePage";
import API from "./api/axios";
import { useEffect } from "react";
import FindMatch from "./components/pages/FindMatch";
import ForgotPassword from "./components/pages/ForgotPassword";
import NotFound from "./components/pages/Page404";
import Socketio from "./components/layout/Socketio";
import Chat from "./components/pages/ChatPage"
import About from "./components/pages/AboutUs";

function App() {
 const [user, setUser] = useState(null);

// Fetch profile on initial load if token exists

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
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Router>
      {/* <NavBar/> */}
      
      <NavBar user={user} setUser={setUser}/>
      <Layout>
        <Routes>
        {/* <Route path="/chat" element={<Socketio/>} /> */}
          <Route path="*" element={<NotFound/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/login" element={<LoginPage  setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/findmatch" element={<FindMatch/>} />
           <Route path="/chat" element={<Chat/>} />
       
       <Route path="/forgotpassword" element={<ForgotPassword/>} />
       
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
