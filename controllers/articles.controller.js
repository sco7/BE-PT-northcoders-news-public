const mongoose = require('mongoose');
const { Article, Comment, User } = require('../models/index');

function getArticles (req, res, next) {
  
  Article.aggregate([
    { $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'belongs_to',
      as: 'comments'
    }},
    
    { $project: {
      title: '$title',
      body: '$body',
      belongs_to: '$belongs_to',  
      votes: '$votes',
      created_by: '$created_by',
      comment_count: {$size: '$comments'}
    }}
  ])
  
  //Article.find()
    .then(articles => {
      return res.status(200).send({articles});
    })
    .catch(err => {
      if (err)
        return next({ message: 'oops internal server error' });
    });
}

function getArticleById (req, res, next) {
  const {article_id} = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  let cond = (mongoose.Types.ObjectId.isValid(article_id));

  if (cond) {

    Article.aggregate([
      { $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'belongs_to',
        as: 'comments'
      }},
      
      { $project: {
        title: '$title',
        body: '$body',
        belongs_to: '$belongs_to',
        votes: '$votes',
        created_by: '$created_by',
        comment_count: {$size: '$comments'}
      }},

      {
        $match: { _id: ObjectId(article_id) }
      }
    ])

    //Article.findOne()
      .then(articles => {
        return res.status(200).send({articles});
      })
      .catch(err => {
        if (err)
          return next({ message: 'Internal server error' });
      });
  } else {
    return next({message: `Article with Id '${(article_id)}' could not be found`});
  }
}

function getCommentsByArticle (req, res, next) {
  const articleId = req.params.article_id;
  Comment.find({ belongs_to: articleId })
    .then(comments => {
      return res.status(200).send({comments});
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `Comments with article Id '${articleId}' could not be found` });
    });
}



function postCommentToArticle (req, res, next) {
  const articleId = req.params.article_id;
  const { comment } = req.body;
  User.find()
    .then(users => {
      const userId = users[0]._id;
      Comment.create({
        body: comment,
        belongs_to: articleId,
        created_by: userId
      })
        .then(comment => {
          return res.status(200).send({comment});
        })
        .catch(err => {
        // Validation error
          if (err.name === 'ValidationError') 
            return next({ message: 'Unable to post a new comment, relating article not found' });
        });
    });
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
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: 'unable to update the vote, relating article not found' });
    });
}

module.exports = { getArticles, getArticleById, getCommentsByArticle, 
  postCommentToArticle, putArticleVotesById };