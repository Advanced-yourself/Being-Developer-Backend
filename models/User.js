
const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
 name:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    unique:true,
 },
 password:{
    type:String,
    required:true,
 },
 isAdmin: {
   type: Boolean,
   default: false,
 },
 dailyGoal: {
   type: Number,
   default: 5,
 },
 currentStreak: {
   type: Number,
   default: 0,
 },
 longestStreak: {
   type: Number,
   default: 0,
 },
 lastGoal: {
   type: Date,
   default: null,
 }
});

module.exports = mongoose.model('User',userSchema);



