const User = require('../models/userModel.js');
const mongoose = require('mongoose');

// encryption and security imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;
const jwtSecret = "Super secret, hush!";

const authController = {};

authController.verifyUser = (req, res, next) => {
  const { username } = req.body;

  User.find({username})
    .then((results) => {
        if (!results.length) return res.status(400).json({username: 'username not found!'})
        if (!bcrypt.compareSync(req.body.password, results[0].password.toString()))  return res.status(400).json({password: 'password invalid!'})
        res.locals.jwt = jwt.sign(results[0]._id.toString(), jwtSecret);
        next();
      })
      .catch(err => {
        res.status(400).json(err);
      })
}

authController.createUser = (req, res, next) => {
  console.log('creating user');

  const password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  const { username } = req.body;

  new User({username, password}).save()
    .then((result) => {
        res.locals.jwt = jwt.sign(result._id.toString(), jwtSecret);
        return next();
      })
      .catch(err => {
        res.status(400).json({username: 'user already exists'});
      })
}

// Check authorization header
authController.checkAuthenticated = (req, res, next) => {
  if (!req.cookies.access_token) {
    return res.status(401).json({authentication: 'not logged in!'});
  }

  // Retrieve jwt from authorization header
  const token = req.cookies.access_token;

  return jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({});
    }
    res.locals._id = decoded;
    next();
  });
}

authController.setJWTCookie = (req, res, next) => {
  res.cookie('access_token', res.locals.jwt, { httpOnly: true, maxAge: 100000 });
  next();
}

authController.logOut = (req, res, next) => {
  res.cookie('access_token', null, { httpOnly: true, maxAge: 0 });
  res.sendStatus(200);
}

module.exports = authController;
