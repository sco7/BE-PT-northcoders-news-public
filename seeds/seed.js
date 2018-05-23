// require mongoose to work with Promises
const mongoose = require('mongoose');

// require models and data
const { User, Article, Comment, Topic } = require('../models');
const { userData, articleData, commentData, topicData } = require(`./${process.env.NODE_ENV}Data`);

// seed function
function seedDB (articlesData, commentsData, topicsData, usersData) {

    // drop the existing database
    // return mongoose.connection.db.dropDatabase()
    return mongoose.connection.dropDatabase()

    .then(() => {
        // seed topics and users
        return Promise.all([Topic.insertMany(topicData), User.insertMany(userData)])
    })

    .then(([topics, users]) => {
        articleData.forEach(article => {

        // adds the 'belongs_to' field with the relating topic id from the Topic table
        article.belongs_to = topics.filter(topic => topic.slug === article.topic)[0]._id

        // replaces the hardcoded 'created_by' field with the relating users id from the User table
        article.created_by = users.filter(user => user.username === article.created_by)[0]._id

    });

        // seeds articles and returns users and topics to use later
        return Promise.all([Article.insertMany(articleData), topics, users])
    })
    
    .then(([articles, topics, users]) => {
        commentData.forEach(comment => {
        
        // replaces the hardcoded 'created_by' field wth the relating users id from the User table
        comment.created_by = users.filter(user => user.username === comment.created_by)[0]._id

        // replaces the 'belongs_to' field with the relating users id from the User table
        comment.belongs_to = articles.filter(article => article.title === comment.belongs_to)[0]._id 
    });

        // seeds comments and returns the articles, topics and users
        return Promise.all([Comment.insertMany(commentData), articles, topics, users])
    })

    // error handling
    .catch(err => {
      console.log(err);
  })
}

module.exports = {seedDB};