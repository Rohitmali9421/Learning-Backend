const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./connection");
const router = require("./Routes/url");
const staticrouter = require("./Routes/staticRouter");
const userRoute = require("./Routes/User");
const URL = require("./Models/url");
//server
const app = express();
const port = 8000;

//views
app.set("view engine","ejs")
app.set("views ",path.resolve("./views"))

//connection
connectMongoDB("mongodb://127.0.0.1:27017/shortURL").then(() => {
  console.log("MomgoDB Connected");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Router
app.use("/url", router);
app.use("/user", userRoute);
app.use("/", staticrouter);
app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    { $push: { visitHistory: { timestamps: Date.now() } } }
  );

  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log("Server Started on port", port);
});
