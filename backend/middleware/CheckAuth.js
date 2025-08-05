const jwt = require("jsonwebtoken");
const User =require('../model/userModel')
const checkToken =  (req, res, next) => {
  const token = req.cookies.token; // ✅ Read token from cookie

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please log in again" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
    const userinfo = await User.findOne({_id:decoded.id})
    // ✅ Attach user info to request for use in routes
    req.user = {userid:decoded.id,profilepic:userinfo.profilepic,Name:userinfo.name}// { id: userId, iat, exp }
    next();
  });
};

module.exports = checkToken;
