// App

// dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// express app
const app = express();

// express middleware
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// routes
// public static files
app.use(express.static('public'));

app.get('/test', (req, res) => {
  res.json({ data: 'test' });
});

app.post('/test', express.json(), (req, res) => {
  res.json(req.body);
});

// default error-handling middleware function
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
