const express = require('express');
const router = express.Router();

const {getArticles, getCommentsByArticle, getArticleById} = require('../controllers/articles.controller');

router.get('/', getArticles);

router.get('/:article_Id', getArticleById);

router.get('/:article_Id/comments', getCommentsByArticle)

module.exports = router;