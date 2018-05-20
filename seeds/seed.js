// set the database to test or dev
if (process.env.NODE_ENV !== 'test') process.env.NODE_ENV = 'dev';
const dbUrl = `mongodb://localhost/northcoders-news-${process.env.NODE_ENV}`;

// require mongoose to work with Promises
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// require models and data
const {User, Article, Comment, Topic} = require('../models');
const {userData, articleData, commentData, topicData} = require(`./${process.env.NODE_ENV}Data`);

// seed function
function seedDB (dbUrl) {
const userIds = {}, articleIds = {}, commentIds = {}, topicIds = {};

// connect to the database
return mongoose.connect(dbUrl)
.then(() => {
    mongoose.connection.db.dropDatabase();
})

.then(() => {

    //seed users
    const userPromises = Object.keys(userData).map(user =>
      new User(userData[user])
        .save()
        .then((doc) => {
          userIds[user] = doc.id;
          return doc;
        })
    );

    //seed topics
    const topicPromises = Object.keys(topicData).map(topic =>
      new Topic(topicData[topic])
        .save()
        .then((doc) => {
          topicIds[topic] = doc.id;
          return doc;
        })
    );

    return Promise.all([
        Promise.all(userPromises),
        Promise.all(topicPromises),
        //Promise.all(driverPromises),
        //Promise.all(seasonPromises)
      ]
      )
      .then(data => {
        console.log('db seeded!');
        mongoose.disconnect();
        console.log('db disconnected!');
        return data;
      });
  });
}

seedDB(dbUrl);

//module.exports = seedDB;

