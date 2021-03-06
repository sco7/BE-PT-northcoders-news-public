const { Topic, Article, User } = require('../models/index');

function getTopics (req, res, next) {
  Topic.find()
    .then(topics => {
      return res.status(200).send({topics});
    })
    .catch(err => {
      if (err)
        return next({ message: 'oops internal server error' });
    });
}

function getArticlesByTopic (req, res, next) {
  const topicId = req.params.topic_id;
  Article.find({ belongs_to: topicId })
    .then(articles => {
      return res.status(200).send({articles});
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `Article with topic Id '${topicId}' could not be found` });
    });
}

function postArticleToTopic (req, res, next) {
  const topicId = req.params.topic_id;
  const { title, body } = req.body;
  User.find()
    .then(users => {
      const userId = users[0]._id;
      Article.create({
        title: title,
        body: body,
        belongs_to: topicId,
        created_by: userId
      })
        .then(article => {
          return res.status(200).send({article});
        })
        .catch(err => {
          if (err)
            return next({ status: 404, message: 'Unable to post a new article, relating topic not found' });
        });
      
    });
    
}

module.exports = { getTopics, getArticlesByTopic, postArticleToTopic };