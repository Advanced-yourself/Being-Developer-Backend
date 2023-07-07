const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const { Schema } = mongoose;
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const checkUserAuth = require("../middleware/auth-middleware");
const {
  addNotes,
  fetchNotes,
  updateNotes,
  deleteNotes,
} = require("../controllers/notesController");

// Route 1: Get All the notess saved by the user "/api/fetchnotes" (Login Required)

router.post("/addnotes", checkUserAuth, addNotes);

router.get("/fetchnotes", checkUserAuth, fetchNotes);

/// Route 3: Update an existing note using: PUT "/api/notes/updatenotes/:id" (Login Required)

router.put("/updatenotes/:id", checkUserAuth, updateNotes);

/// Route 4: DELETE an existing note using: DELETE "/api/notes/deletenotes/:id" (Login Required)
router.delete("/deletenotes/:id", checkUserAuth, deleteNotes);

module.exports = router;
