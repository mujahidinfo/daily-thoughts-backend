const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // get the token from the cookie header
  const token = req.headers.cookie.split("=")[1];

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        req.body.user = decodedToken.userId;
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
