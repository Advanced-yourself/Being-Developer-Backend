const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Here we will we pass the registration data which will store in mpongoDB schema
const registerUser = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body; //req.body means someone sending some data from frontend through form

  const user = await UserModel.findOne({ email: email });

  //Check if user already exits
  if (user) {
    res.send({ status: "Failed", message: "Sorry a user with this Email Already Exist" });
  }

  //if user not found create it
   else {
    if (name && email && password && password_confirmation) {
    
      if (name.length < 3) {
        return res.status(400).json({ status: "failed", message: "Name must be at least 3 characters long" });
      }
    
      if (password !== password_confirmation) {
        return res.status(400).json({ status: "failed", message: "Password and password_confirmation don't match" });
      }
    
      if (password.length < 5) {
        return res.status(400).json({ status: "failed", message: "Password must be at least 5 characters long" });
      }

      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          //Creating new user
          const newUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });

          await newUser.save(); //Saving email password etc saved in database

          const saved_user = await UserModel.findOne({ email: email });

          //Generate JWT token
          const token = jwt.sign(
            { userID: saved_user.id },
            process.env.JWT_SECRET,
            { expiresIn: "60d" }
          );

          res.send({
            status: "success",
            message: "registration Successful",
            token: token,
          });
        } 
        catch (err) {
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
        //Comparing the password 
        const isMatch = await bcrypt.compare(password, user.password);
        //The above the will internally matches the hashes

        if (email === user.email && isMatch) {
          //Generatejwt token
          const token = jwt.sign({ UserID: user.id }, process.env.JWT_SECRET, {
            expiresIn: "60d",
          });
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Please try to login with correct credential",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "Please try to login with correct credential",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (err) {
    res.send({ status: "failed", message: "Unable to Login" });
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser,getUser};
