const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: function () { return new ObjectId() }},
  username: { type: String, require: true , unique: true},
  password: { type: String, require: true },
  feedback: { type: [Schema.Types.ObjectId], 'default': [] },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
