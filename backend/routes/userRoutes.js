const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
