if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/northcoders-news');

const express = require('express');
const app = express();
const { json } = require('body-parser');
const apiRouter = require('./routes/api.route');

app.use(json());

app.use('/api', apiRouter);

module.exports = app;