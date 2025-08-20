import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Avatar,
//   Typography,
//   Chip,
//   Box,
//   Button,
// } from "@mui/material";
const NotFound =() =>{
  const navigate = useNavigate();

  return (<>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex-col flex items-center justify-between px-6 py-4 bg-gray-900">
      <h1 className=" text-9xl font-extrabold">404</h1>
      <h2 className="mt-4 text-4xl font-bold">Age Not Found</h2>
      <p className="mt-2 text-lg text-gray-200">
        Oops! It seems the age you’re looking for doesn’t exist.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:scale-105 transition-transform"
      >
        🔙 Go Home
      </Button>
    </div>
    </>
  );
}
export default  NotFound;
