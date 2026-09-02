"use strict";
const express = require("express");
const {
  regiterUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// you can use  2 way to creaate route
// 1.
router.route("/").post(regiterUser).get(protect, allUsers); // 1...
router.post("/login", authUser);

//2.....
// router.post("/", regiterUser); // 1...
// router.post("/login", authUser);
// router.get("/", allUsers);

module.exports = router;
