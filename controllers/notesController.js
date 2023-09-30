const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const NotesModel = require("../models/Notes");

const createNote = async (req, res, next) => {
  const { questionId, content, topicId, userId } = req.body;
  try {
    const exists = await NotesModel.findOne({
      questionId,
      topicId,
      userId,
    });
    if (exists) {
      await NotesModel.updateOne(exists, { content });
      return res.status(200).json({
        message: "Note Updated successfully",
      });
    }
    const note = new NotesModel({
      questionId,
      content,
      topicId,
      userId,
    });
    await note.save();
    res.status(201).json({
      message: "Note created successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};


const addNotes = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new NotesModel({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    console.log(savedNote);
    res.json(savedNote);
  } catch (error) {
    console.log("Show error", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateNotes = async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await NotesModel.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const deleteNotes = async (req, res) => {
  try {
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion if user found
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await NotesModel.findByIdAndDelete(req.params.id);
    res.json({ "Success ": "Note Deleted successfully", note: note });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

module.exports = {createNote, addNotes, fetchNotes, updateNotes, deleteNotes };
