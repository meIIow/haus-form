const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const feedbackSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: function () { return new ObjectId() }},
  rating: { type: Number, require: true },
  recommend:{ type: Boolean, require: true },
  comments: String,
  author: { type: Schema.Types.ObjectId, require: true},
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
