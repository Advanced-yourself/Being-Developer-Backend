
const express = require("express");
const router = express.Router();
const checkUserAuth = require("../middleware/auth-middleware");
const {createQuestion,getQuestions, deleteQuestion, createMultipleQuestions, createProgress} = require("../controllers/questionController");




router.post('/createQuestion', checkUserAuth, createQuestion);
router.get("/getQuestions/:topicId", checkUserAuth, getQuestions);
router.delete("/deleteQuestion/:topicId/:questionId", checkUserAuth, deleteQuestion);
router.post("/multiple-questions", checkUserAuth, createMultipleQuestions);
router.post("/progress", checkUserAuth, createProgress);



module.exports = router;