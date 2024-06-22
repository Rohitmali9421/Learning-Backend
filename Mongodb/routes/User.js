const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateUser,
} = require("../controllers/User");

const router = express.Router();

router.get("/", handleGetAllUsers);
router.post("/", handleCreateUser);
router.get("/:id", handleGetUserByID);

module.exports = router;
