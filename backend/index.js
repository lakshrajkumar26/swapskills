const http = require("http");
//create httpserver 

const socketio = require("socket.io")
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080
const CORS = require("cors");

const user = require("./models/User");
const db = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/UserRoutes');
const adminRoutes = require("./routes/adminRoutes");

app.use(CORS({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
     credentials: true,  
}))
app.use(express.json());
 



app.get("/", (req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRoutes);
app.use('/api/users',userRouters);
app.use('/api/admin',adminRoutes);




const server = http.createServer(app);
//with curent app

// Attach socket.io
const io = socketio(server,{
    cors:{
        origin: "*",
        methods :["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log(`New Client Conenccted ${socket.id}`)

    socket.on("disconnect",()=>{
        console.log(`socket discoennted ${socket.id}`)
    })
})

// app.listen( PORT , ()=>{
//     console.info(`Server is runnning at port ${PORT}` )
// })
//listen the server 
server.listen(PORT , () => {
    console.log(`Server is running at ${PORT}`);
})