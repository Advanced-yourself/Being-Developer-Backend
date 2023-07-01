// console.log("Hello js");

const connectDB = require("./db")
connectDB();



const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000

//using middleware
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
