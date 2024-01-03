const path = require("path");
const post_model = require("../model/DAO/posts")
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    getPostList: function (req, res) {
        post_model.getPostList(res);
    },

    getPost: function (req, res) {
        post_model.getPost(req, res);
    },

    createPost: [authorization_model.loadCurMember, post_model.createPost, function (req, res) {
        res.status(200).json({});
    }],

    editPost: function (req, res) {
        post_model.editPost(req, res);
    },

    deletePost: function (req, res) {
        post_model.deletePost(req, res);
    },

    getCommentList: function (req, res) {
        post_model.getCommentList(req, res);
    },

    createPostcmt: [authorization_model.loadCurMember, post_model.createPostcmt, function (req, res) {
        res.status(200).json({});
    }],

    editPostcmt: function (req, res) {
        post_model.editPostcmt(req, res);
    },

    deletePostcmt: function (req, res) {
        post_model.deletePostcmt(req, res);
    }


}