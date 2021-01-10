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
        // res.send(user);
      }
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  // your code goes
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
