const express = require('express');
const router = express.Router();

const { getComments, deleteComment,
    putCommentVotesById } = require('../controllers/comments.controller');

router.get('/', getComments);

router.delete('/:comment_id', deleteComment);

router.put('/:comment_id', putCommentVotesById)

module.exports = router;