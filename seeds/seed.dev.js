const dbUrl = require('../config/index');

// set the database to test or dev - see config file
//if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';
//const dbUrl = `mongodb://localhost/northcoders-news-${process.env.NODE_ENV}`;

// require mongoose to work with db connection
const mongoose = require('mongoose');

// require database seed function
const {seedDB} = require('../seeds/seed');

// connect to the database
mongoose.connect(dbUrl)

// run the seed function
.then(() => {
  return seedDB(dbUrl);
})

// disconnect from the database
.then((data) => {
  console.log(`connected to ${dbUrl}`)
  console.log('db seeded!');
  mongoose.disconnect();
  console.log('db disconnected!');
  return data;
})

.catch(err => {
  console.log(err);
})
