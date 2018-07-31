const express = require('express');
const router = express.Router();

const { getTopics, getArticlesByTopic, postArticleToTopic } = require('../controllers/topics.controller');

router.get('/', getTopics);

router.route('/:topic_id/articles')
  .get(getArticlesByTopic)
  .post(postArticleToTopic);

module.exports = router;