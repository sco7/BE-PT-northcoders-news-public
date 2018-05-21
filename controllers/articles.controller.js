const {Article, Comment} = require('../models/index');

//build functions

function getArticles (req, res, next) {
  Article.find()
    .then(Articles => {
      return res.status(200).send(Articles);
    })
    .catch(err => {
      return next({message: 'oops internal server error'})
    });
}

function getArticleById (req, res, next) {
  const articleId = req.params.article_Id;
  Article.findOne({_id: articleId})
    .then(Articles => {
      return res.status(200).send(Articles);
    })
    .catch(err => {
      // validationError 
      return next({status: 404, message:err})
    });
}

function getCommentsByArticle (req, res, next) {
  const articleId = req.params.article_Id;
  Comment.find({belongs_to: articleId})
    .then(Comments => {
      return res.status(200).send(Comments);
    })
    .catch(err => {
      return next({status: 404, message:err})
    });
}

module.exports = { getArticles, getArticleById, getCommentsByArticle };