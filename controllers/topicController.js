
const TopicModel = require("../models/Topics");
const UserModel = require("../models/User");
const ProgressModel = require("../models/Progress");
const QuestionModel = require("../models/Question");
const NotesModel = require("../models/Notes");

exports.createTopic = async (req, res, next) => {
    const { name, sheetId } = req.body;
    const topic = new TopicModel({
      name,
      sheetId,
    });
    try {
      await topic.save();
      res.status(201).json({
        message: "Topic created successfully",
        data: topic,
      });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
  };


exports.getTopics = async (req, res, next) => {
    const sheetId = req.params.sheetId;
    const userId = req?.userData?.userId;
    // console.log({
    //   sheetId,
    //   userId,
    // });
    try {
      const existingUser = await UserModel.findOne({ _id: userId });
      const topics = await TopicModel.find({
        sheetId: sheetId,
      });
      const progress = await ProgressModel.find({
        userId: userId,
        sheetId: sheetId,
      });
      // console.log(progress);
      const topicswithProgress = [];
      for (let topic of topics) {
        // const questions = await QuestionModel.find({
        //   topicId: { $in: topic._id },
        // });
        // topic.questions = questions?.length;
        const topicProgress = progress.filter((p) => {
          // console.log(p.topicId.toString(),  topic._id.toString());
          return p.topicId.toString() === topic._id.toString();
        });
  
        topic.completedQuestions = topicProgress.length;
        const toRevisit = topicProgress.filter((p) => {
          if (p.revisited === true) return false;
          const today = new Date();
          const date = new Date(p.completedAt);
  
          return (
            today.getTime() - date.getTime() >=
            existingUser.revisitDays * 24 * 60 * 60 * 1000
          );
        });
        topic.toRevisit = toRevisit.length;
  
        topicswithProgress.push({
          ...topic._doc,
          questions: topic?.questions,
          completedQuestions: topic?.completedQuestions,
          toRevisit: topic?.toRevisit,
        });
      }
      // console.log(topicswithProgress);
      res.status(200).json({
        topics: topicswithProgress,
      });
    } catch (err) {
      console.log(err);
    //   return next(new HttpError("Something went wrong", 500));
    res.status(500).json({message: "Something went Wrong"});
    }
  };


exports.deleteTopic = async (req, res, next) => {
    const { topicId } = req.params;
    try {
      const topic = await TopicModel.findById({ _id: topicId });
      if (!topic) {
        return "Topic Not Found";
      }
      await TopicModel.deleteOne({ _id: topicId });
      await QuestionModel.deleteMany({ topicId: topicId });
      await NotesModel.deleteMany({ topicId: topicId });
      await ProgressModel.deleteMany({ topicId: topicId });
      res.status(200).json({
        message: "Topic deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Something went Wrong"});
    }
  };
