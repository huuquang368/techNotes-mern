const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc get all user
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean(); // not return password
  if (!users?.length) {
    return res.status(400).json({ message: "No user found" });
  }
  res.status(200).json(users);
});

// @desc create user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  // check valid input
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "Missing required field" });
  }
  // check for duplicate
  const duplicatedUser = await User.findOne({ username }).lean().exec();
  if (duplicatedUser) {
    return res.status(409).json({ message: "Duplicate user name" });
  }
  // Hash password
  const hashPassword = await bcrypt.hash(password, 10); // salt rounds
  const user = { username, password: hashPassword, roles };
  const newUser = await User.create(user);
  if (newUser) {
    res.status(201).send(newUser);
  } else {
    res.status(400).json({ message: "Invalid user data recieve" });
  }
});

// @desc update user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  // Does the user exist to update?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();
  res.json({ message: `Updated user ${updatedUser.username} successfully` });
});

// @desc delete user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();
  if (note?.length) {
    return res
      .status(400)
      .json({ message: "Cannot delete user has been assigned notes" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const deletedUser = await user.deleteOne();
  res
    .status(200)
    .json({ message: `Delete user ${deletedUser.username} successfully ` });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
