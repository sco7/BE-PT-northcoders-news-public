const express = require('express');
const router = express.Router();

const { getArticles, getCommentsByArticle, getArticleById, 
  postCommentToArticle, putArticleVotesById } = require('../controllers/articles.controller');

router.get('/', getArticles);

router.route('/:article_id')
  .get(getArticleById)
  .put(putArticleVotesById);

router.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postCommentToArticle);

module.exports = router;
