const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc login
// @route POST /auth
// @access public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing required field" });
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const compareHashPassword = await bcrypt.compare(
    password,
    foundUser.password
  );
  if (!compareHashPassword) {
    return res.status(401).json({ message: "Wrong password" });
  }
  // create access token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
});

// @desc refresh
// @route GET /auth/refresh
// @access public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const foundUser = await User.findOne({
        username: decode.username,
      }).exec();
      if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    })
  );
};

// @desc logout
// @route POST /auth/logout
// @access public - clear cookie if exist
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});

module.exports = { login, refresh, logout };
