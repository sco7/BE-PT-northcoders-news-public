const express = require('express');
const router = express.Router();

const { getComments, deleteCommentById, 
    putCommentVotesById } = require('../controllers/comments.controller');

router.get('/', getComments);

router.delete('/:comment_id', deleteCommentById);

router.put('/:comment_id', putCommentVotesById);

module.exports = router;