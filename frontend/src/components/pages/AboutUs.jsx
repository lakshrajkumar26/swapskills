import React from "react";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiExpress, SiSocketdotio, SiTailwindcss } from "react-icons/si";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-5xl text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-blue-400">SwapSkills</span></h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          SwapSkills is a peer-to-peer platform that allows users to <span className="font-semibold">exchange skills</span>, 
          learn from each other, and collaborate. Instead of paying for courses, users swap their knowledge —
          for example, someone who knows Web Development can teach it in exchange for learning Digital Marketing.
        </p>
      </section>

      {/* Why SwapSkills */}
      <section className="max-w-5xl py-12 px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4">💡 Why SwapSkills?</h2>
          <p className="text-gray-300">
            Traditional learning can be expensive and one-sided. SwapSkills makes it <span className="text-blue-400">collaborative</span>:
            connect with peers, trade your strengths, and grow together without barriers.
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4">🌍 Who Benefits?</h2>
          <p className="text-gray-300">
            Students, professionals, or hobbyists who want to gain new skills while sharing their own expertise.
            A true <span className="text-blue-400">community-driven learning ecosystem</span>.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-5xl py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">🚀 How SwapSkills Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">1️⃣ Create Profile</h3>
            <p className="text-gray-400">List the skills you have & the skills you want to learn.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">2️⃣ Match</h3>
            <p className="text-gray-400">The system matches you with people who want your skill & vice versa.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">3️⃣ Chat & Connect</h3>
            <p className="text-gray-400">Built-in chat lets you schedule swaps and share resources in real-time.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">4️⃣ Learn & Grow</h3>
            <p className="text-gray-400">Teach what you know, learn what you want — completely free.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">⚙️ Tech Stack</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 text-4xl text-blue-400">
          <div className="flex flex-col items-center"><FaReact /><span className="text-sm mt-2">React</span></div>
          <div className="flex flex-col items-center"><SiTailwindcss /><span className="text-sm mt-2">Tailwind</span></div>
          <div className="flex flex-col items-center"><SiExpress /><span className="text-sm mt-2">Express</span></div>
          <div className="flex flex-col items-center"><FaNodeJs /><span className="text-sm mt-2">Node.js</span></div>
          <div className="flex flex-col items-center"><SiMongodb /><span className="text-sm mt-2">MongoDB</span></div>
          <div className="flex flex-col items-center"><SiSocketdotio /><span className="text-sm mt-2">Socket.IO</span></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-gray-500 text-sm">
        Built with ❤️ by <span className="text-blue-400 font-semibold">Laksh Raj Kumar</span>
      </footer>
    </div>
  );
};

export default About;
