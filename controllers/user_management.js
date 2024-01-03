const path = require("path");
const user_model = require("../model/DAO/users_manage")

module.exports = {

    // View users list
    getUserList: function (req, res) {
        user_model.getUserList(res);
    },
    // Search User
    getUserSearch: function (req, res) {
        user_model.getUserSearch(req, res);
    },
    // View User Detail
    getUserDetail: function (req, res) {
        user_model.getUserDetail(req, res);
    },
    // Block User
    blockUser: function (req, res) {
        user_model.blockUser(req, res);
    },
    // Change Permission
    changePermission: function (req, res) {
        user_model.changePermission(req, res);
    }
}