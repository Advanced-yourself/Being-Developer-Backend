
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require("./db")
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const userRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const sheetsRouter = require("./routes/sheets");
const topicRouter = require("./routes/topics");
const questionRouter = require("./routes/question");

// Cors policy
app.use(cors());

//using middleware
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/notes', notesRouter);
app.use("/api/sheets", sheetsRouter);
app.use("/api/topics", topicRouter);
app.use('/api/questions', questionRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening at http://localhost:${PORT}`)
})
