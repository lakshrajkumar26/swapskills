const mongoose = require('mongoose');

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("Connection Established with DB")
})
db.on("disconnected",()=>{
    console.log("Disconnected with DB")
})
db.on("error",(err)=>{
    console.log("Error occurred with DB ",err)
});

module.exports = db;