const jwt = require("jsonwebtoken");
const JWT_SECRET = "anuragIsgood$boy";

const fetchuser = (req, res, next) => {
  //GET THE USER FROM THE JWT TOKEN AND ADD ID TO REQ OBJECT

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please AUTHENTICATION with valid Token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please AUTHENTICATION with valid user" });
  }
};

module.exports = fetchuser;
