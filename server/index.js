const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const authController = require('./controllers/authController');
const port = process.env.PORT || 3000;

// Connect to MongoDB
const config = require('./config');

const app = express();

// Serve React Bundle:
app.use(express.static(path.join(__dirname, '../client/')));
// ***************************************************************

app.use(bodyParser.json());
app.use(cookieParser());

// Routes for logging in and storing/reading feedback
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);

// Catch all other routes and redirect to root
app.get('/*', (req,res) => res.redirect('/'));

// Start the server
app.listen(port, () => {
  console.log('Server listening on port 3000')
});
