var mongoose = require('mongoose');
const mLabURI = 'mongodb://haus:password@ds221990.mlab.com:21990/haus-feedback'
const connection = mongoose.connect(mLabURI);

module.exports = connection;
