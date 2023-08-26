const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkUserAuth = require("../middleware/auth-middleware");
const {addSheets, fetchSheets, deleteSheet} = require("../controllers/sheetsController");

router.get('/allsheets', checkUserAuth, fetchSheets);
router.post('/addsheets', checkUserAuth, addSheets);
router.delete('/deleteSheet/:sheetId', checkUserAuth, deleteSheet);

module.exports = router;