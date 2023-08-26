const express = require("express");
const router = express.Router();
const checkUserAuth = require("../middleware/auth-middleware");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");

// Route 1
// CREATING A USER using :POST "/api/auth/registerUser". No login required
router.post("/registeruser", registerUser);
// Route 2
//AUTHENTICATION OF A USER
router.post("/login", loginUser);

// Route 3
// Get logged in User Details using :POST :api/auth/getuser" login required
//This gives us the information about logged in user
// IN this block we are converting auth token in corrrect credentials
router.get("/getuser", checkUserAuth, getUser);

module.exports = router;
