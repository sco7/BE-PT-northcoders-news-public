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
    .then(Articles => {
      return res.status(200).send(Articles);
    })
    .catch(err => {
      // validationError 
      return next({ status: 404, message:err })
    });
}

function getCommentsByArticle (req, res, next) {
  const articleId = req.params.article_Id;
  Comment.find({ belongs_to: articleId })
    .then(Comments => {
      return res.status(200).send(Comments);
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

module.exports = { getArticles, getArticleById, getCommentsByArticle, postCommentToArticle };