const { Article, Comment, User } = require('../models/index');

//build functions

function getArticles (req, res, next) {
  Article.find()
    .then(articles => {
      return res.status(200).send({articles});
    })
    .catch(err => {
      return next({ message: 'oops internal server error' })
    });
}

function getArticleById (req, res, next) {
  const articleId = req.params.article_Id;
  Article.findOne({ _id: articleId })
    .then(articles => {
      return res.status(200).send({articles});
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `Article with Id '${articleId}' could not be found` })
    });
}

function getCommentsByArticle (req, res, next) {
  const articleId = req.params.article_Id;
  Comment.find({ belongs_to: articleId })
    .then(comments => {
      return res.status(200).send({comments});
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `Comments with article Id '${articleId}' could not be found` })
    });
}

function postCommentToArticle (req, res, next) {
  const articleId = req.params.article_id;
  const { comment } = req.body;
  User.find()
    .then(users => {
      const userId = users[0]._id
      Comment.create({
        body: comment,
        belongs_to: articleId,
        created_by: userId
      })
      .then(comment => {
        return res.status(200).send({comment});
      })
      .catch(err => {
        // CastError
        if (err.name === 'CastError') 
          return next({ status: 404, message: 'Unable to post new comment, relating data not found' })
      });
    })
}

function putArticleVotesById (req, res, next) {
  const articleId = req.params.article_id;
  let vote = req.query.vote;
  let change = 0; 
    if (vote === 'up') change = 1;
    if (vote === 'down') change = -1;
    Article.findByIdAndUpdate(
      articleId, { $inc: { votes: change } }, { new: true })
      .then(article => {
        return res.status(200).send({article});
      })
      .catch(err => {
        return next({ status: 404, message:err })
      });
}

module.exports = { getArticles, getArticleById, getCommentsByArticle, 
  postCommentToArticle, putArticleVotesById };