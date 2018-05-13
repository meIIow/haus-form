const User = require('../models/userModel.js');
const mongoose = require('mongoose');
const Feedback =  require('../models/feedbackModel.js');
const ObjectId = mongoose.Types.ObjectId;


const feedbackController = {};

// Retrieve a user's saved feedback history
feedbackController.getUserFeedback = (req, res, next) => {
  const { _id } = res.locals;
  console.log('getting feedback for', _id);
  User.findOne({ _id })
    .then((result) => {
        Feedback.find(
          {'_id': { $in: result.feedback }},
          'rating comments recommend',
          {multi: true}
        )
          .then(feedback => {
            res.locals.feedback = feedback;
            return next()
          })
          .catch(err => res.status(400).send(err));
    })
    .catch(err => {
      res.status(400).json(err);
    })
}

feedbackController.submitFeedback = (req, res, next) => {

  console.log('submitting feedback')

  const { rating, comments, recommend } = req.body;
  const author = res.locals._id;

  new Feedback({rating, comments, recommend, author}).save()
    .then((result) => {
        res.locals.feedback = result;
        console.log('result', result);
        console.log(author);
        User.update({ _id: author }, { $push: { feedback: result._id } })
          .then((user) => {
            res.locals.user = user;
            console.log('res.locals', res.locals)
            return next();
          })
          .catch((err) => {
            console.log('ZZZZ');
            res.status(400).json(err);
          })
      })
      .catch(err => {
        res.status(400).json(err);
      })
}

module.exports = feedbackController;
