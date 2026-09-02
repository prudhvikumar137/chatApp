"use strict";
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controllers/chatControllers");
// const { regiterUser } = require('../controllers/userController')

router.route("/").post(protect, accessChat);
router.route('/').get(protect ,fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/addToGroup').put(protect, addToGroup)
router.route('/removeFromGroup').put(protect, removeFromGroup)


module.exports = router;

