const { string } = require("joi");
const mongooose = require("mongoose");

const tokenSchema = new mongooose.Schema({
  // Your code goes here
  token: String,
  user_id: String,
});

const RefreshToken = mongooose.model("tokens", tokenSchema);

module.exports = RefreshToken;
