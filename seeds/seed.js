const mongoose = require('mongoose');
mongoose.Promise = Promise;

const {User, Article, Comment, Topic} = require('../models');

//needs to change to devData after testing
const {userData, articleData, commentData, topicData} = require('./testData');

function seedDB (dbUrl) {
const userIds = {}, articleIds = {}, commentIds = {}, topicIds = {};

return mongoose.connect(dbUrl)
.then(() => {
    mongoose.connection.db.dropDatabase();
})
.then(() => {
    const userPromises = Object.keys(userData).map(user =>
      new User(userData[user])
        .save()
        .then((doc) => {
          userIds[user] = doc.id;
          return doc;
        })
    );

    return Promise.all([
        Promise.all(userPromises),
        //Promise.all(teamsPromises),
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


module.exports = seedDB;



// const seedUsers = function () {
//     return  userData.map(user => {
//       return new models.Users(user);
//     });
//   };