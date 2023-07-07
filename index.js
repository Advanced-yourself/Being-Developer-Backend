
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require("./db")
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const userRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

// Cors policy
app.use(cors());

//using middleware
app.use(express.json());

app.use('/api/auth', userRouter)
app.use('/api/notes', notesRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${PORT}`)
})
