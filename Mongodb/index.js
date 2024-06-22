const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
mongoose
  .connect("mongodb://127.0.0.1:27017/mongdb")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.job_title ||
    !body.email
  ) {
    return res.status(400).json({ msg: "all filds are required" });
  } else {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      gender: body.gender,
      job_title: body.job_title,
      email: body.email,
    });
    return res.status(201).json({ msg: "success" });
  }
});
app.get("/api/users",async(req,res)=>{
    const users=await User.find({})
    return res.json(users)
})
app.get("/api/users/:id",async(req,res)=>{
    const id=req.params.id
    const user=await User.find({_id:id})
    return res.json(user)
})
app.listen(port, () => {
  console.log("Server Started");
});
