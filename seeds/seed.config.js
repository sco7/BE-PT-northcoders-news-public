/* eslint-disable no-console */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

require ('dotenv').config({
  path:`./environments/.${process.env.NODE_ENV}.env`
});

const mongoose = require('mongoose');
const {seedDB} = require('../seeds/seed');

// connect to the database
mongoose.connect(process.env.DB_URI)

// run the seed function
  .then(() => {
    return seedDB(process.env.DB_URI);
  })

// disconnect from the database
  .then((data) => {
    console.log(`connected to ${process.env.DB_URI}`);
    console.log('db seeded!');
    mongoose.disconnect();
    console.log('db disconnected!');
    return data;
  })

// error handling
  .catch(err => {
    console.log(err);
  });