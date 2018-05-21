const express = require('express');
const router = express.Router();

const topicControl = require('../controllers/topics.controller');

router.get('/', topicControl.getTopics);

router.get('/:topic_id/articles', topicControl.getArticlesByTopic);

module.exports = router;