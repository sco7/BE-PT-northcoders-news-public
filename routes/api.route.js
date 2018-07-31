const express = require('express');
const router = express.Router();

const articles = require('./api.route.articles');
const comments = require('./api.route.comments');
const topics = require('./api.route.topics');
const users = require('./api.route.users');
const path = require('path');

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

router.use('/articles', articles);

router.use('/comments', comments);

router.use('/topics', topics);

router.use('/users', users);

module.exports = router;
