const express = require('express');
const document_management_router = express.Router();
const document_management_controller = require('../controllers/document_management');
const path = require("path");

document_management_router.get("/", document_management_controller.getDocList);

document_management_router.get("/search", document_management_controller.searchDoc);

document_management_router.get("/detail", document_management_controller.getDocDetail);

document_management_router.post("/add", document_management_controller.addDoc);

document_management_router.post("/update", document_management_controller.updateDoc);

document_management_router.get("/delete", document_management_controller.deleteDoc);

module.exports = document_management_router;