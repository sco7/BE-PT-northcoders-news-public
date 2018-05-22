const express = require('express');
const router = express.Router();

const { getTopics, getArticlesByTopic, postArticleToTopic } = require('../controllers/topics.controller');

router.get('/', getTopics);

router.get('/:topic_id/articles', getArticlesByTopic);

router.post('/:topic_id/articles', postArticleToTopic);

module.exports = router;