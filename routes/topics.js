const express = require("express");
const router = express.Router();
const checkUserAuth = require("../middleware/auth-middleware");
const {createTopic, getTopics, deleteTopic} = require("../controllers/topicController");


router.post('/addtopic', checkUserAuth, createTopic);
router.get("/getTopics/:sheetId", checkUserAuth, getTopics);
router.delete("/deleteTopics/:topicId", checkUserAuth, deleteTopic);


module.exports = router;