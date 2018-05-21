const {Topic, Article} = require('../models/index');

//build functions

function getTopics (req, res, next) {
  Topic.find()
    .then(Topics => {
      return res.status(200).send(Topics);
    })
    .catch(err => {
      return next({message: 'oops internal server error'})
    });
}

function getArticlesByTopic (req, res, next) {
  const topicId = req.params.topic_id;
  Article.find({belongs_to: topicId})
    .then(Articles => {
      return res.status(200).send(Articles);
    })
    .catch(err => {
      return next({status: 404, message:err})
    });
}

module.exports = { getTopics, getArticlesByTopic };