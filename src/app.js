const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require("./routes/authRouter")
const musicRouter = require("./routes/musicRouter")
const cookieParser = require("cookie-parser")

async function connectDB() 
{
    await mongoose.connect(process.env.MONGO_URI);
}

app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{res.send("Hello World")});
app.use("/api/auth",authRouter)
app.use("/api/music",musicRouter)


module.exports = {app,connectDB};