const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { body, validationResult } = require("express-validator");
// const fetchuser = require("../middleware/fetchuser");

// Here we will we pass the registration data which will store in mpongoDB schema
const registerUser = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body; //req.body means someone sending some data from frontend through form

  const user = await UserModel.findOne({ email: email });

  if (user) {
    res.send({ status: "Failed", message: "Email Already Exist" });
  } else {
    if (name && email && password && password_confirmation) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const collect = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });

          await collect.save();

          const saved_user = await UserModel.findOne({ email: email });

          //Generate JWT token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          );

          res.send({
            status: "success",
            message: "registration Successful",
            token: token,
          });
        } catch (err) {
            console.log(err);
          res.send({ status: "failed", message: "Unable to register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "password and password_confirmation doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All field are required" });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });

      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (email === user.email && isMatch) {
          //Generatejwt token
          const token = jwt.sign({ UserID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5d",
          });
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or password is incorrect",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "This email is not registered with us",
        });
      }
    }else {
        res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (err) {
    res.send({ status: "failed", message: "Unable to Login" });
  }
};

module.exports = { registerUser, loginUser };
