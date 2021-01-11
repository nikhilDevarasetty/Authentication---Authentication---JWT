const jwt = require("jsonwebtoken");

function verifyAuthToken(req, res, next) {
  // Your code goes here
  //   const refreshToken = req.header("refresh-token");
  //   if (refreshToken) {
  //     const verifyres = jwt.verify(
  //       refreshToken,
  //       process.env.REFRESH_TOKEN_SECRET
  //     );
  //     res.send(verifyres);
  //   } else {
  //     res.status(401).send({ message: "Access denied" });
  //   }
  //   console.log(req.header);
  next();
}

function verifyRefreshToken(req, res, next) {
  const refreshToken = req.header("refresh-token");
  if (!refreshToken) {
    res.status(401).send({ message: "Access denied" });
  }
  next();
}

module.exports.verifyAuthToken = verifyAuthToken;
module.exports.verifyRefreshToken = verifyRefreshToken;
