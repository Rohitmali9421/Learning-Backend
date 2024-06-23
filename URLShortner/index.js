const express = require("express");
const { connectMongoDB } = require("./connection");
const router = require("./Routes/url");
const URL = require("./Models/url");
//server
const app = express();
const port = 8000;

//connection
connectMongoDB("mongodb://127.0.0.1:27017/shortURL").then(() => {
  console.log("MomgoDB Connected");
});

//middlewares
app.use(express.json());

//Router
app.use("/url", router);
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    { $push: { visitHistory: { timestamps: Date.now() } } }
  );
  console.log(entry)
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log("Server Started on port", port);
});
