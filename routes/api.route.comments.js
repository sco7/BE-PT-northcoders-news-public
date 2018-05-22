const express = require('express');
const router = express.Router();

const { getComments } = require('../controllers/comments.controller');

router.get('/', getComments);

module.exports = router;