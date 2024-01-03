const express = require('express');
const user_management_router = express.Router();
const user_management_controller = require('../controllers/user_management');
const path = require("path");

// View users list
user_management_router.get("", user_management_controller.getUserList);
// Search user
user_management_router.get("/search", user_management_controller.getUserSearch);
// View user detail
user_management_router.get("/detail", user_management_controller.getUserDetail);
// Block/Unblock a user
user_management_router.get("/block", user_management_controller.blockUser);
// Change permission
user_management_router.get("/permission", user_management_controller.changePermission);

module.exports = user_management_router;