var session = require("express-session");

const auth = (req, res, next) => {
  try {
    if (!req.session.isLoggedIn) {
      let path = req.originalUrl.substring(0, 7);
      return res.status(401).redirect("http://localhost:5000" + path + "auth");
      //   return res.status(401).redirect("http://localhost:5000");
      // res.status(401).json({message: "Unauthorised User"});
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorised User" });
  }
};

module.exports = auth;
