const express = require('express');
const post_management_router = express.Router();
const post_management_controller = require('../controllers/post_management');
const path = require("path");
const post_management = require('../controllers/post_management');


post_management_router.get("", post_management_controller.getPostList);
post_management_router.get("/detail", post_management_controller.getPost); 
post_management_router.post("/new", post_management_controller.createPost); 
post_management_router.get("/edit", post_management_controller.editPost);
post_management_router.get("/delete", post_management_controller.deletePost);

// For comment 
post_management_router.get("/comment/list", post_management_controller.getCommentList); 
post_management_router.post("/comment/new", post_management_controller.createPostcmt); 
post_management_router.get("/comment/edit", post_management_controller.editPostcmt); 
post_management_router.get("/comment/delete", post_management_controller.deletePostcmt); 




module.exports = post_management_router;