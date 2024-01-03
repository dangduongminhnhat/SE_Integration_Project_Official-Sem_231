const express = require('express');
const loan_management_router = express.Router();
const loan_management_controller = require('../controllers/loan_management');
const path = require("path");

// For manager
loan_management_router.get("/manager/loanlist", loan_management_controller.getLoanList); 
loan_management_router.get("/manager/request/approve", loan_management_controller.approvereq);
loan_management_router.get("/manager/request/deny", loan_management_controller.denyreq);
loan_management_router.get("/manager/borrowlist", loan_management_controller.getBorrowList); 
loan_management_router.get("/manager/returnlist", loan_management_controller.getReturnList); 
loan_management_router.get("/manager/request/accept", loan_management_controller.acceptreq);
loan_management_router.get("/manager/request/fine", loan_management_controller.finereq);

// For customer
loan_management_router.post("/customer/loanhistory", loan_management_controller.getLoanHistory);
loan_management_router.post("/customer/loanrequest", loan_management_controller.loanRequest); 
loan_management_router.post("/customer/borrowhistory", loan_management_controller.getBorrowHistory); 
loan_management_router.post("/customer/returnhistory", loan_management_controller.getReturnHistory);
loan_management_router.post("/customer/returnrequest", loan_management_controller.returnRequest); 


module.exports = loan_management_router;