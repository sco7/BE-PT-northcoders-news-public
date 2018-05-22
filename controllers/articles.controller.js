const { Article, Comment, User } = require('../models/index');

//build functions

function getArticles (req, res, next) {
  Article.find()
    .then(articles => {
      return res.status(200).send(articles);
    })
    .catch(err => {
      return next({ message: 'oops internal server error' })
    });
}

function getArticleById (req, res, next) {
  const articleId = req.params.article_Id;
  Article.findOne({ _id: articleId })
    .then(articles => {
      return res.status(200).send(articles);
    })
    .catch(err => {
      // validationError 
      return next({ status: 404, message:err })
    });
}

function getCommentsByArticle (req, res, next) {
  const articleId = req.params.article_Id;
  Comment.find({ belongs_to: articleId })
    .then(comments => {
      return res.status(200).send(comments);
    })
    .catch(err => {
      return next({ status: 404, message:err })
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
        return res.status(200).send(comment);
      })
      .catch(err => {
        return next({ status: 404, message:err })
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
        return res.status(200).send(article);
      })
      .catch(err => {
        return next({ status: 404, message:err })
      });
}

module.exports = { getArticles, getArticleById, getCommentsByArticle, 
  postCommentToArticle, putArticleVotesById };