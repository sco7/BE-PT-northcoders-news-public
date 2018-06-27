const express = require('express');
const router = express.Router();

const { getComments, deleteCommentById, 
  putCommentVotesById } = require('../controllers/comments.controller');

router.get('/', getComments);

router.route('/:comment_id')
  .delete(deleteCommentById)
  .put(putCommentVotesById);

module.exports = router;