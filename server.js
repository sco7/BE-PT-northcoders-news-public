if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
if (process.env.NODE_ENV !== 'production') require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

// dotenv must be required in this file when running locally, 
// this will need commenting out when hosting on Heroku.
require ('dotenv').config({
  path:`./environments/.${process.env.NODE_ENV}.env`
});

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

const express = require('express');
const app = express();
const { json } = require('body-parser');
const apiRouter = require('./routes/api.route');
const cors = require('cors');

app.use(json());
app.use(cors());
app.use(express.static('public'));
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ err: err.message });
  else res.status(500).send({ err:err.message });
});

module.exports = app;