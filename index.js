
const express = require('express');
const app = express();
const { fileURLToPath } =  require("url");
const path = require("path");
require('dotenv').config();
const PORT = process.env.PORT; //getting PORT number from the env file
const mongoose = require('mongoose');
const connectDB = require("./db")
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const sheetsRouter = require("./routes/sheets");
const topicRouter = require("./routes/topics");
const questionRouter = require("./routes/question");


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Cors policy
app.use(cors());

//using middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "./dist")));

 
app.use('/api/auth', userRouter);
app.use('/api/notes', notesRouter);
app.use("/api/sheets", sheetsRouter);
app.use("/api/topics", topicRouter);
app.use('/api/questions', questionRouter);



app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./", "dist", "index.html"));
});

app.listen(PORT, 
  async () =>{ await connectDB()
  console.log(`Example app listening at http://localhost:${PORT}`)
})
