
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");


const checkUserAuth= async(req,res,next)=> {


    let token;

    const { authorization } = req.headers;
  
    if (authorization && authorization.startsWith("Bearer")) {
      try {
        // Get token from User
        token = authorization.split(" ")[1];
  
        // Verify Token
  
        const { UserID } = jwt.verify(token, process.env.JWT_SECRET);
  
        // Get User from Token
  
        req.user = await userModel.findById(UserID).select("-password");
  
        console.log(req.user);
  
        next();
      } catch (error) {
        console.log(error);
        res.status(401).send({ status: "failed", message: "Unauthorized User" });
      }
    }
  
    if (!token) {
      res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User, No Token" });
    }


}

module.exports = checkUserAuth;