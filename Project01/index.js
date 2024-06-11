const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/userdata")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobtitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});
const User = mongoose.model("user", userSchema);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const updatedUser = { ...users[index], ...req.body };
      users[index] = updatedUser;
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", message: "Failed to update user data" });
          }
          return res.json({ status: "success", user: updatedUser });
        }
      );
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", message: "Failed to delete user" });
          }
          return res.json({ status: "success" });
        }
      );
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to add user" });
    }
    return res.json({
      status: "success",
      id: users.length,
    });
  });
});

app.listen(8000, () => {
  console.log("server started");
});
