const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.use(verifyJWT);
router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
