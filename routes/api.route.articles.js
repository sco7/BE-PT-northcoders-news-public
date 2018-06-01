const express = require('express');
const router = express.Router();

const { getArticles, getCommentsByArticle, getArticleById, 
    postCommentToArticle, putArticleVotesById } = require('../controllers/articles.controller');

router.get('/', getArticles);

router.get('/:article_id', getArticleById);

router.get('/:article_id/comments', getCommentsByArticle)

router.post('/:article_id/comments', postCommentToArticle)

router.put('/:article_id', putArticleVotesById)

module.exports = router;
