const express = require('express');
const router = express.Router();

const articles = require('./api.route.articles');
const comments = require('./api.route.comments');
const topics = require('./api.route.topics');
const users = require('./api.route.users');

router.use('/articles', articles );

router.use('/comments', comments);

router.use('/topics', topics);

router.use('/users', users);

module.exports = router;
