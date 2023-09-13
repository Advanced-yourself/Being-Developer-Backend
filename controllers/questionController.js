
const QuestionModel = require("../models/Question");
const TopicModel = require("../models/Topics");
const ProgressModel = require("../models/Progress");
const BookmarkModel = require("../models/Bookmark");
const NotesModel = require("../models/Notes");
const UserModel = require("../models/User");



exports.createQuestion = async (req, res, next) => {
    const { title, links, topicId } = req.body;
    const question = new QuestionModel({
      title,
      links,
      topicId,
    });
    try {
      await question.save();
      const topic = await TopicModel.findOne({
        _id: topicId,
      });
      topic.questions = topic.questions + 1;
      await topic.save();
      res.status(201).json({
        message: "Question created successfully",
      });
    } catch (err) {
    //   return next(new HttpError("Something went wrong", 500));
      res.status(500).json({message: "Something Went Wrong"});
    }
  };


exports.createMultipleQuestions = async (req, res, next) => {
    const { questions} = req.body;
    try {
      // console.log(questions);
      const createdQuestions = await QuestionModel.insertMany(questions);
      const topic = await TopicModel.findOne({
        _id: questions[0].topicId,
      });
      topic.questions = topic.questions + questions.length;
      await topic.save();
      res.status(201).json({
        createdQuestions: createdQuestions,
        message: "Questions created successfully",
      });
      
    } catch (err) {
      console.log(err);
      // return next(new HttpError("Something went wrong", 500));
       res.status(500).json({message: "Something went Wrong"});
    }
  };

exports.getQuestions = async (req, res, next) => {
    const topicId = req?.params?.topicId;
    const userId = req?.userData?.userId;
    console.log(userId);
    try {
      const questions = await QuestionModel.find({
        topicId: topicId,
      });
      if (!userId) {
        return res.status(200).json({
          questions: questions,
        });
      }
      const completedQuestions = await ProgressModel.find({
        userId: req.userData.userId,
        topicId: topicId,
      });
      const Notes = await NotesModel.find({
        userId: userId,
        topicId: topicId,
      });
      const bookmarks = await BookmarkModel.find({
        userId: userId,
        topicId: topicId,
      });
      const questionsWithProgress = questions.map((question) => {
        const completed = completedQuestions.find((completedQuestion) => {
          return (
            completedQuestion.questionId.toString() === question._id.toString()
          );
        });
        const notes = Notes.find((note) => {
          return note.questionId.toString() === question._id.toString();
        });
  
        const bookmarked = bookmarks.find((bookmark) => {
          return bookmark.questionId.toString() === question._id.toString();
        });
  
        return {
          ...question._doc,
          isCompleted: !!completed,
          notes: notes?.content,
          completedAt: completed?.completedAt,
          revisited: completed?.revisited || false,
          bookmarked: !!bookmarked,
        };
      });
  
      res.status(200).json({
        questions: questionsWithProgress,
      });
    } catch (err) {
      console.log(err);
    //   return next(new HttpError("Something went wrong", 500));
      res.status(500).json({message: "Something Went Wrong"});
    }
  };



  exports.deleteQuestion = async (req,res, next)=> {

    const { questionId, topicId } = req.params;
    try {
      const question = await QuestionModel.findOne({ _id: questionId });
      if (!question) {
        // return next(new HttpError("Question not found", 404));
        return res.status(404).json({message: "Question not Found"});
      }
      await QuestionModel.findOneAndDelete({ _id: questionId });
      await TopicModel.findOneAndUpdate(
        { _id: topicId },
        { $inc: { questions: -1 } }
      );
      await NotesModel.deleteMany({ questionId: questionId });
      await BookmarkModel.deleteMany({ questionId: questionId });
      res.status(200).json({
        message: "Question deleted successfully",
      });
    } catch (err) {
      console.log(err);
      // return next(new HttpError("Something went wrong", 500));
      return res.status(500).json({message: "Something went wrong"});

    }
   
  }

exports.createProgress = async (req, res, next) => {
    const { questionId, topicId, userId, sheetId } = req.body;
    console.log(req.body);
    try {
      const exists = await ProgressModel.findOne({
        questionId,
        topicId,
        userId,
        sheetId,
      });
      if (exists) {
        await ProgressModel.deleteOne({
          questionId,
          topicId,
          userId,
          sheetId,
        });
        let user = await UserModel.findOne({ _id: userId });
        let dailyGoal = user.dailyGoal;
  
        const todayQues = await ProgressModel.find({
          userId: userId,
          completedAt: {
            $gte: new Date().setHours(0, 0, 0, 0),
            $lt: new Date().setHours(23, 59, 59, 999),
          },
        });
  
        if (todayQues.length === dailyGoal - 1) {
          user.currentStreak = Math.max(user.currentStreak - 1, 0);
          user.longestStreak = Math.max(
            user.currentStreak - 1,
            user.longestStreak - 1
          );
          user.lastGoal = new Date(new Date().setDate(new Date().getDate() - 1));
        }
        await user.save();
        return res.status(200).json({
          message: "Progress deleted successfully",
        });
      }
      const progress = new ProgressModel({
        questionId,
        topicId,
        userId,
        sheetId,
      });
      await progress.save();
      let user = await UserModel.findOne({ _id: userId });
      let dailyGoal = user.dailyGoal;
  
      const todayQues = await ProgressModel.find({
        userId: userId,
        completedAt: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999),
        },
      });
      let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      if (
        todayQues.length === dailyGoal &&
        user?.lastGoal &&
        new Date(user.lastGoal).getDate() === yesterday.getDate() &&
        new Date(user.lastGoal).getMonth() === yesterday.getMonth() &&
        new Date(user.lastGoal).getFullYear() === yesterday.getFullYear()
      ) {
        user.currentStreak = user.currentStreak + 1;
        user.longestStreak = Math.max(user.currentStreak, user.longestStreak);
        user.lastGoal = new Date();
      } else if (todayQues.length === dailyGoal) {
        user.currentStreak = 1;
        user.longestStreak = Math.max(user.currentStreak, user.longestStreak);
        user.lastGoal = new Date();
      }
      await user.save();
      res.status(201).json({
        message: "Progress created successfully",
      });
    } catch (err) {
      console.log(err);
      // return next(new HttpError("Something went wrong", 500));
      res.status(500).json("Something went wrong");
    }
  };