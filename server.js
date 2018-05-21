if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/northcoders-news-${process.env.NODE_ENV}`);

const express = require('express');
const app = express();
const { json } = require('body-parser');
const apiRouter = require('./routes/api.route');

app.use(json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    if (err.status === 404) res.status(404).send({err:err.message});
    else res.status(500).send({err:err.message})
})

module.exports = app;