const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const SheetModel = require("../models/Sheets");
const TopicModel = require("../models/Topics");
const QuestionModel = require("../models/Question");
const ProgressModel = require("../models/Progress");
const NotesModel = require("../models/Notes");

const addSheets = async (req, res) => {
  try {
    const { title, description} = req.body;

    const topics = [],
    questions = [];

    const sheet = new SheetModel({
      title,
      description
    });

    const savedSheet = await sheet.save();
    res.status(201).json({
      message: "Sheet created successfully",
      savedSheet
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const addMultipleSheets = async (req, res, next) => {
  const { sheets } = req.body;
  try {
    // Insert all sheets into the database in a single operation
    const createdSheets = await SheetModel.insertMany(sheets);

    // You can perform additional operations here if needed

    res.status(201).json({
      createdSheets: createdSheets,
      message: "Sheets created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const fetchSheets = async (req, res) => {
  try {
    console.log(req.query);
    console.log("API CALLED");
    let sheets = await SheetModel.find();
    sheets = sheets?.map((sheet) => {
      return {
        _id: sheet._id,
        title: sheet.title,
        description: sheet.description,
      };
    });
    const sheetsWithData = [];
    for (let sheet of sheets) {
      const topics = await TopicModel.find({
        sheetId: sheet?._id,
      });
      sheet.topics = topics;
      sheet.questions = 0;
      for (let topic of topics) {
        const questions = await QuestionModel.find({
          topicId: { $in: topic._id },
        });
        sheet.questions += questions.length;
      }
      sheetsWithData?.push(sheet);
    }
    return res.status(200).json({
      sheets: sheetsWithData,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteSheet = async (req, res) => {
  const { sheetId } = req.params;
  try {
    const sheet = await SheetModel.findById(sheetId);
    if (!sheet) {
      return res.status(404).json("Sheet not found");
    }
    const topics = await TopicModel.find({ sheetId: sheetId });
    for (let topic of topics) {
      await QuestionModel.deleteMany({ topicId: topic._id });
      await NotesModel.deleteMany({ topicId: topic._id });
      await ProgressModel.deleteMany({ topicId: topic._id });
    }
    await TopicModel.deleteMany({ sheetId: sheetId });
    await SheetModel.deleteOne({ _id: sheetId });
    res.status(200).json({
      message: "Sheet deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};


module.exports = { addSheets,addMultipleSheets,fetchSheets, deleteSheet };
