const express = require("express");
const {connectMongo} =require("./connection")
const {logReqRes} =require("./middlerwares")
const userRouter=require("./routes/user")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(8000, () => {
  console.log("server started");
});
