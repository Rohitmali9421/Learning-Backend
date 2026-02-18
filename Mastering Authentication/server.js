import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(PORT,()=>{
    console.log("Server Started");
})