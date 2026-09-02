"use strict";
const express = require("express");
const { regiterUser, authUser } = require("../controllers/userController");
const usersController = require("../controllers/usersController");

const router = express.Router();

// you can use  2 way to creaate route
// router.route("/").post(regiterUser); // 1...

router.post("/", usersController.signUpUser); //2.....

router.post("/login", usersController.login);

module.exports = router;
