const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      //   console.log("token", process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("/*/*///*/*/*/", req.user);
      next();
    } catch (error) {
      res.Status(400);
      throw new Error("Token Not athuorized Or Token faild ");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("You are not logged in ");
  }
});

module.exports = { protect };
