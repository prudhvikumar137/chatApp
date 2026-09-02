"use strict";
const generateToken = require("../config/generateToken");
const UsersSecModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");

const usersController = {
  signUpUser: async (req, res) => {
    try {
      const findUser = await UsersSecModel.findOne({ email: req.body.email });
      if (findUser) {
        res.status(400);
        res.send({ message: "User already exists" });
      } else {
        const hashedPassword = bcrypt.hash(req.body.password, 10);
        req.body.password = await hashedPassword
        const newUser = await new UsersSecModel(req.body);
        await newUser.save();
        res.status(201);
        res.send({
          data: {
            newUser,
            token: generateToken(newUser._id),
          },

          message: "User created successfully",
        });
      }
    } catch (error) {}
  },
  login: async (req, res) => {
    try {
      const findUser = await UsersSecModel.findOne({ email: req.body.email });
      const passCompare =await bcrypt.compare(req.body.password, findUser.password)
      if (passCompare) {
        res.status(200);
        res.send({
          data: { findUser, token: generateToken(findUser._id) },
          message: 'successfully logedin'
        })
      }
    } catch (error) {}
  },
};

module.exports = usersController;

// const signUpUser = asyncHandler(async (req, res) => {
//   console.log("*", req.body);
//   const { name, email, password, pic } = req.body;
//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please fill the all required fields ");
//   }

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User Already existed");
//   }

//   const newUser = await User.create({
//     name,
//     email,
//     password,
//     pic,
//   });
//   if (newUser) {
//     res.status(200);
//     res.send({
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       pic: newUser.pic,
//       token: generateToken(newUser._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to create the New User");
//   }
// });

// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const findUser = await User.findOne({ email });

//   if (findUser && (await findUser.matchPassword(password))) {
//     res.status(200);
//     res.json({
//       _id: findUser._id,
//       name: findUser.name,
//       email: findUser.email,
//       pic: findUser.pic,
//       token: generateToken(findUser._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid Email or Password");
//   }
// });

// module.exports = {
//   regiterUser,
//   authUser,
// };
