"use strict"
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const regiterUser = asyncHandler(async (req, res) => {
  console.log("*", req.body);
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill the all required fields ");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already existed");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (newUser) {
    res.status(200);
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the New User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.matchPassword(password))) {
    res.status(200);
    res.json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      pic: findUser.pic,
      token: generateToken(findUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyWord).find({ _id: { $ne: req.user._id } });
    res.send(users);

});

module.exports = {
  regiterUser,
  authUser,
  allUsers,
};
