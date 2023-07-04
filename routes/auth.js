const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "anuragIsgood$boy";
const {registerUser,loginUser} = require("../controllers/authController");


// Route 1
// CREATING A USER using :POST "/api/auth/createuser". No login required

router.post("/registeruser", registerUser );

// router.post(
//   "/createuser",
//   [
//     body("name", "Enter a valid name").isLength({ min: 3 }),
//     body("password", "Enter a valid password").isLength({ min: 5 }),
//     body("email", "Enter a valid Email").isEmail(),
//   ],
//   async (req, res) => {
//     // IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // CHECK WHETHER THE USER WITH THIS EMAIL EXISTS ALREADY
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ error: "Sorry, a user with this email already exists" });
//     }

//     // Generate a salt to use during the hashing process
//     const salt = await bcrypt.genSalt(10);

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     // CREATE A NEW USER
//     user = await User.create({
//       name: req.body.name,
//       password: hashedPassword,
//       email: req.body.email,
//     });

//     const data = {
//       user: {
//         id: user.id,
//       },
//     };
//     const authToken = jwt.sign(data, JWT_SECRET);

//     res.json({ message: "User created successfully", authToken });
//   }
// );

// Route 2
//AUTHENTICATION OF A USER


router.post("/login", loginUser);

// router.post(
//   "/login",
//   [body("email", "Enter a valid Email").isEmail()],
//   async (req, res) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json({ errors: error.array() });
//     }

//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ error: "Please try to login with correct credentials" });
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         return res
//           .status(400)
//           .json({ error: "Please try to login with correct credentials" });
//       }

//       const data = {
//         user: {
//           id: user.id,
//         },
//       };

//       const authToken = jwt.sign(data, JWT_SECRET);
//       res.json({ message: "User created successfully", authToken });
//     } catch (error) {
//       console.log(error.message);
//       res.send(500).send("Internal Server Error");
//     }
//   }
// );

//Route 3
//Get logged in User Details using :POST :api/auth/getuser"login required
//IN this block we are converting auth token in corrrect credentials
// router.post("/getuser", fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");

//     res.send(user); // Send the user object as the response
//   } catch (error) {
//     console.log(error.message);
//     res.sendStatus(500).send("Internal Server Error");
//   }
// });

module.exports = router;
