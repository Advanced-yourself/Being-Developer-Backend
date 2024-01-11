const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Here we will we pass the registration data which will store in mpongoDB schema
const registerUser = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;
    console.log(req.body);

    // Check if all required fields are provided
    if (!name || !email || !password || !password_confirmation) {
    
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Check name length
    if (name.length < 3) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Name must be at least 3 characters long",
        });
    }

    // Check if password and password_confirmation match
    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Password and password_confirmation don't match",
        });
    }

    // Check password length
    if (password.length < 5) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Password must be at least 5 characters long",
        });
    }

    // Check if user already exists
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      return res
        .status(400)
        .json({ status: "failed", message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    // Retrieve the saved user
    const savedUser = await UserModel.findOne({ email: email });

    // Generate JWT token
    const token = jwt.sign({ userID: savedUser.id }, process.env.JWT_SECRET);

    // Send the response
    res.json({
      status: "success",
      message: "Registration successful",
      token: token,
    });
  } catch (err) {
    console.error(err);
    next(err);
    res.status(500).json({ status: "failed", message: "Unable to register" });
  }
};

const loginUser = async (req, res) => {
  console.log("Login clicked");
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email: email });

    // Check if the user exists and compare passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      return res.json({
        status: "success",
        message: "Login success",
        token: token,
      });
    }

    // If the user doesn't exist or passwords don't match
    return res.status(401).json({
      status: "failed",
      message: "Incorrect email or password",
    });
  } catch (err) {
    console.error(err);
    next(err);//it throw the error to the error middle ware
    return res
      .status(500)
      .json({ status: "failed", message: "Unable to login" });
  }
};

const getUser = async (req, res) => {
  try {
    // Add access control here if needed

    const users = await UserModel.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, getUser };
