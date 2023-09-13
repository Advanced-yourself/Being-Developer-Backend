const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkUserAuth = require("../middleware/auth-middleware");
const {addSheets, fetchSheets, deleteSheet, addMultipleSheets} = require("../controllers/sheetsController");

router.get('/allsheets', checkUserAuth, fetchSheets);
router.post('/addsheets', checkUserAuth, addSheets);
router.post('/addMultipleSheet', checkUserAuth, addMultipleSheets);
router.delete('/deleteSheet/:sheetId', checkUserAuth, deleteSheet);

module.exports = router;