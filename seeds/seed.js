const dbUrl = `mongodb://localhost/northcoders-news-${process.env.NODE_ENV}`;

// require mongoose to work with Promises
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// require models and data
const {User, Article, Comment, Topic} = require('../models');
const {userData, articleData, commentData, topicData} = require(`./${process.env.NODE_ENV}Data`);

// seed function
function seedDB (dbUrl) {

    //drop the existing database
    return mongoose.connection.db.dropDatabase()

    .then(() => {

        // seeds topics and users
        return Promise.all([Topic.insertMany(topicData), User.insertMany(userData)])
    })

    .then(([topics, users]) => {
        articleData.forEach(article => {

        // replaces the hardcoded 'created_by' field with the relating users id from the User table
        article.created_by = users.filter(user => user.username === article.created_by)[0]._id

        // adds the 'belongs_to' field with the relating topic id from the Topic table
        article.belongs_to = topics.filter(topic => topic.slug === article.topic)[0]._id
    });

        //seeds articles and returns users to use later
        return Promise.all([Article.insertMany(articleData), users])
    })
    

    .then(([articles, users]) => {
        commentData.forEach(comment => {
        
        //replaces the hardcoded 'created_by' field wth the relating users id from the User table
        comment.created_by = users.filter(user => user.username === comment.created_by)[0]._id

        // replaces the 'belongs_to' field with the relating users id from the User table
        comment.belongs_to = articles.filter(article => article.title === comment.belongs_to)[0]._id 
    });

        // seeds comments
        return Comment.insertMany(commentData)
    })

    // error handling
    .catch(err => {
      console.log(err);
  })
}

module.exports = {seedDB};