const User = require("../models/Users.js");
const bcrypt = require('bcrypt');

async function registerUser({ username, password }) {

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    const error = console.log("User with the provided username already exists");
    error.status = 409; 
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();
}

async function findUserByUsername(username) {
  return User.findOne({ username });
}

module.exports = {
  registerUser,
  findUserByUsername,
};
