const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
const { login, logout, refresh } = require("../controller/authController");

router.route("/").post(loginLimiter, login); // include middleware login limiter

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

module.exports = router;
