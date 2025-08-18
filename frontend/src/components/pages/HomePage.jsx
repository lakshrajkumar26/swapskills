import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      {/* Navbar */}
      {/* <nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-blue-500 rounded-full"></div>
          <span className="text-white font-semibold text-lg">SwapSkills</span>
        </div>
        <div className="flex space-x-4">
          <a href="/login" className="text-gray-300 hover:text-white">
            Login
          </a>
          <a
            href="/register"
            className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow"
          >
            Sign Up
          </a>
        </div>
      </nav> */}

      {/* Background Blurs */}
      <div className="absolute top-24 left-16 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-16 right-16 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-30"></div>

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-slide-in">
            Learn & Teach with <span className="text-blue-400">SwapSkills</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            A community-driven platform where people exchange skills. Share what
            you know and learn something new every day.
          </p>

          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg shadow-md transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-6 bg-gray-900/60 backdrop-blur-md rounded-t-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why SwapSkills?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 bg-gray-800/80 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Skill Exchange
            </h3>
            <p className="text-gray-300">
              Teach your expertise and learn something new in return.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-6 bg-gray-800/80 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Community First
            </h3>
            <p className="text-gray-300">
              Connect with like-minded learners and creators.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-6 bg-gray-800/80 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Free Learning
            </h3>
            <p className="text-gray-300">
              No cost, just passion for learning and sharing knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-900">
        © {new Date().getFullYear()} SwapSkills — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
