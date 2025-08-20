const http = require("http");
//create httpserver 

const socketio = require("socket.io")
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080
const CORS = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const user = require("./models/User");
const db = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/userRoutes');
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const allowedOrigin =["http://localhost:5173",process.env.FRONTEND_URL]
app.use(helmet());
app.use(morgan("dev")); 


app.use(CORS({
    origin:allowedOrigin,
    methods:["GET","POST","PUT"],
     credentials: true,  
}))
app.use(express.json());
 



app.get("/", (req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRoutes);
app.use('/api/users',userRouters);
app.use('/api/admin',adminRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


const server = http.createServer(app);
//with curent app

// Attach socket.io
const io = socketio(server,{
    cors:{
        origin: "http://localhost:5173",
        methods :["GET","POST","PUT"]
    }
});

// io.on("connection",(socket)=>{
//     console.log(`New Client Conenccted ${socket.id}`)
   
//       //when user from froentend "do Welcome" ,and the data 
//       socket.emit("welcome","naya user aaya h")
//    //aab frontend m .on"welcome" ,(data)=>{con.log(data)}

//     //to others 
//     socket.broadcast.emit("others",`${socket.id} : username has joined and he dont know bacasuse broadcast.emit`)

//     //for real time logic / Join a chat room
//   socket.on("joinRoom", (chatId) => {
//     socket.join(chatId);
//     console.log(`User joined chat ${chatId}`);
//   });

//   // When a user sends message
//   socket.on("sendMessage", (msg) => {
//     // broadcast to everyone in the chat room
//     io.to(msg.chat).emit("receiveMessage", msg);
//   });

//     socket.on("disconnect",()=>{
//         console.log(`socket discoennted ${socket.id}`)
//     })
// })

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Welcome just for testing
  socket.emit("welcome", "🎉 You are connected to the server");

  // Join chat room
  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Handle new message
  socket.on("sendMessage", (msg) => {
    console.log("📩 Message received:", msg);
    // use msg.chatId instead of msg.chat
    io.to(msg.chatId).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});


server.listen(PORT , () => {
    console.log(`Server is running at ${PORT}`);
})