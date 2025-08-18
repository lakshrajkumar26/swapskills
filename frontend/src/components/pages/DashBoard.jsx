import React from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

 const Navigate = useNavigate();

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10 relative overflow-hidden">
      
      {/* Background glowing circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-30"></div>

      {/* Dashboard Content */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Welcome Section */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Welcome back to SwapSkills 🚀
        </h1>
        <p className="text-center text-gray-400 mt-2">
          Connect, share, and learn new skills every day.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaExchangeAlt className="text-purple-400 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">10</h3>
            <p className="text-gray-300">Skills Shared</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserGraduate className="text-blue-400 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">5</h3>
            <p className="text-gray-300">Skills Learned</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers className="text-green-400 text-4xl mb-3" />
            <h3 className="text-xl font-semibold">8</h3>
            <p className="text-gray-300">Matches Found</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Recent Activity</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              🎨 You shared your **UI/UX Design** skill with Priya.
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              💻 You learned **React Basics** from John.
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
              📚 Matched with Alex for **Public Speaking** swap.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:scale-105 transition transform"
          onClick={()=> Navigate('/findmatch')}
          >
             Skills Swap
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
