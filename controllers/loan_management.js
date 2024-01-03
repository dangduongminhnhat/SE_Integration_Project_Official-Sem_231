const path = require("path");
const loan_model = require("../model/DAO/loans")
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    getLoanList: function (req, res) {
        loan_model.getLoanList(res);
    },

    getBorrowList: function (req, res){
        loan_model.getBorrowList(res);
    },

    getReturnList: function (req, res){
        loan_model.getReturnList(res);
    },

    getLoanHistory: [authorization_model.loadCurMember, loan_model.getLoanHistory, function (req, res) {
        res.status(200).json({});
    }],

    getBorrowHistory: [authorization_model.loadCurMember, loan_model.getBorrowHistory, function (req, res) {
        res.status(200).json({});
    }],

    getReturnHistory: [authorization_model.loadCurMember, loan_model.getReturnHistory, function (req, res) {
        res.status(200).json({});
    }],

    loanRequest: [authorization_model.loadCurMember, loan_model.loanRequest, function (req, res) {
        res.status(200).json({});
    }],

    returnRequest: [authorization_model.loadCurMember, loan_model.returnRequest, function (req, res) {
        res.status(200).json({});
    }],


    approvereq: function (req, res) {
        loan_model.approvereq(req, res);
    },

    denyreq: function (req, res) {
        loan_model.denyreq(req, res);
    },

    acceptreq: function (req, res){
        loan_model.acceptreq(req, res);
    },

    finereq: function (req, res){
        loan_model.finereq(req, res);
    }

}