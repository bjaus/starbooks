const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Initialize App
const app = express();

// Server Port
const port = process.env.PORT || 5000;

// Routes
const routes = require('./routes.js');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(fileUpload({
  safeFileNames: true
}));

// API Routes
app.use('/api', routes);

// Run App
app.listen(port, () => (
  console.log(`Server running on port ${ port }`)));