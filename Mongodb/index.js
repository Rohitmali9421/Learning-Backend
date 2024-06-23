const express = require("express");
const { connectMongoDB } = require("./connection");
const {logReqRes}=require("./middlerwares")
const userRouter = require("./routes/User");

const app = express();
const port = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/mongdb");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"))

// Routes
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server Started on port", port);
});
