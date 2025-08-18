import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Common Navbar can go here if needed */}
      {children}

      {/* Global Toaster with custom styles */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(30, 41, 59, 0.85)", // glass dark
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            icon: "✅",
            style: {
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.9), rgba(22,163,74,0.9))",
              color: "white",
              fontWeight: "500",
              boxShadow: "0px 4px 15px rgba(34,197,94,0.4)",
            },
          },
          error: {
            icon: "❌",
            style: {
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,0.9))",
              color: "white",
              fontWeight: "500",
              boxShadow: "0px 4px 15px rgba(239,68,68,0.4)",
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
