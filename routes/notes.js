const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const { Schema } = mongoose;
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

// Route 1: Get All the notess saved by the user "/api/fetchnotes" (Login Required)
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);    
  } catch (error) {
    console.log(error.message);
      res.send(500).send("Internal Server Error");
  }
});
// Route 2: Add a new notes using: POST"/api/notes/addnotes" (Login Required)
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "description Must be atleast of 5 character").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const {title,description,tag} = req.body;
      // IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const note = new Notes({
        title,description,tag,user : req.user.id
      }) ;
     const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.send(500).send("Internal Server Error");
    }
  }
);


 /// Route 3: Update an existing note using: PUT "/api/notes/updatenotes/:id" (Login Required)
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
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
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

/// Route 4: DELETE an existing note using: DELETE "/api/notes/deletenotes/:id" (Login Required)
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion if user found
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success ":"Note Deleted successfully", note:note});
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});



module.exports = router;
