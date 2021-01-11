const router = require("express").Router();
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAuthToken, verifyRefreshToken } = require("./verifyToken");
const { registerValidation, loginValidation } = require("./validation");

// Your code goes here

//Register
router.post("/register", async (req, res) => {
  // your code goes
  const data = req.body;
  const error = registerValidation(data).error;
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  } else {
    User.find({ email: req.body.email }).then((data) => {
      if (data.length > 0) {
        res.status(400).send({ message: "Email already exists" });
      } else {
        const user = new User({
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 8),
        });
        user.save().then((data) => res.send({ user: data._id }));
      }
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  // your code goes
  const data = req.body;
  const error = loginValidation(data).error;
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  } else {
    User.find({ email: data.email })
      .then((result) => {
        if (result.length === 0) {
          res.status(400).send({ message: "Email not found" });
        } else {
          const user = result[0];
          const flag = bcrypt.compareSync(data.password, user.password);
          if (flag) {
            const authToken = jwt.sign(
              { data: "testing" },
              process.env.TOKEN_SECRET
            );
            const refreshToken = jwt.sign(
              { data: "testing" },
              process.env.REFRESH_TOKEN_SECRET
            );
            // console.log(authToken, refreshToken);

            const refreshTokenData = RefreshToken({
              token: refreshToken,
            });
            refreshTokenData.save();
            res.send({
              "auth-token": authToken,
              "refresh-token": refreshTokenData.token,
              "refresh-token-id": refreshTokenData._id,
            });
          } else {
            res.status(400).send({ message: "password is wrong" });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
});

// generate New Auth-Token
router.get("/newAuthToken", verifyRefreshToken, async (req, res) => {
  // your code goes
});

// logout
router.delete("/logout", verifyRefreshToken, async (req, res) => {
  // your code goes
});

// get user details
router.get("/me", verifyAuthToken, async (req, res) => {
  // your code goes
});

module.exports = router;
