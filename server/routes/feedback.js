const express = require('express');
const router = new express.Router();

const checkAuthenticated = require('../controllers/authController').checkAuthenticated;
const feedbackController = require('../controllers/feedbackController');

router.use('/*', checkAuthenticated)

router.get('/history',
  feedbackController.getUserFeedback,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.post('/submit',
  feedbackController.submitFeedback,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;
