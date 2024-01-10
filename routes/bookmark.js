// userRouter definition
const express = require("express");
const router = express.Router();
const { toggleBookmark } = require("../controllers/bookmarkController");
const checkUserAuth = require("../middleware/auth-middleware");

router.post("/togglebookmark", checkUserAuth, toggleBookmark);

module.exports = router;
