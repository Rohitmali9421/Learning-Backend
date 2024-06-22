const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

async function handleGetUserByID(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id); // Changed to findById for simplicity
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

async function handleCreateUser(req, res) {
  const { first_name, last_name, gender, job_title, email } = req.body;

  if (!first_name || !last_name || !gender || !job_title || !email) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = new User({ first_name, last_name, gender, job_title, email });
    await newUser.save();
    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateUser,
};
