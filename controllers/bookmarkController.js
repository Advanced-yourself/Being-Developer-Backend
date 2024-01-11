const express = require("express");
const mongoose = require("mongoose");
const BookmarkModel = require("../models/Bookmark");
const toggleBookmark =  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const { userId, sheetId, topicId, questionId } = req.body;
  
      // Check if the bookmark already exists
      const existingBookmark = await BookmarkModel.findOne({
        userId,
        sheetId,
        topicId,
        questionId,
      });
  
      if (existingBookmark) {
        // If it exists, remove the bookmark
        await existingBookmark.remove();
        res.json({ message: "Bookmark removed" });
      } else {
        // If it doesn't exist, create a new bookmark
        const newBookmark = new BookmarkModel({
          userId,
          sheetId,
          topicId,
          questionId,
        });
        await newBookmark.save();
        res.json({ message: "Bookmark added" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = {toggleBookmark};
  