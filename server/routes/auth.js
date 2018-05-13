const express = require('express');
const authController = require('../controllers/authController');

const router = new express.Router();

router.post('/signup',
  authController.createUser,
  authController.setJWTCookie,
  (req, res) => {
    res.status(200).json({});
  }
);

router.post('/login',
  authController.verifyUser,
  authController.setJWTCookie,
  (req, res) => res.status(200).json({})
);


router.get('/logout', authController.logOut)

module.exports = router;
