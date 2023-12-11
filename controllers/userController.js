const jwt = require('jsonwebtoken');
const userService = require('../service/userService');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

require('dotenv').config();

const jwtSecret = process.env.jwt_Key;

async function register(req, res) {
  try {
    await userService.registerUser(req.body);
    res.status(201).send("User has been created");
  } catch (error) {
    if (error.status === 409) {
      res.status(409).send("User with the provided username already exists");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

async function login(req, res, next) {
  try {
    const user = await userService.findUserByUsername(req.body.username);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrectPassword) {
      return next(createError(401, "Incorrect password. Please use the correct password"));
    }

    const token = jwt.sign({id: user._id,isSeller: user.isSeller,},jwtSecret, {expiresIn: '1h'
      })
      
    
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }).status(200).send({ token });

  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true
  }).status(200).send("User has been logged out.");

  console.log("Logged out");
}

module.exports = { register, login, logout };
