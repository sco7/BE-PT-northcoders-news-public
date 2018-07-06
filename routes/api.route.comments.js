const express = require('express');
const router = express.Router();

const { getComments, getCommentById, deleteCommentById, 
  putCommentVotesById } = require('../controllers/comments.controller');

router.get('/', getComments);

router.route('/:comment_id')
  .get(getCommentById)
  .delete(deleteCommentById)
  .put(putCommentVotesById);

module.exports = router;