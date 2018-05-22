const { Comment } = require('../models/index');

//build functions

function getComments (req, res, next) {
  Comment.find()
    .then(comments => {
      return res.status(200).send(comments);
    })
    .catch(err => {
      return next({ message: 'oops internal server error' })
    });
}

function deleteComment (req, res, next) {
  const commentId = req.params.comment_id;
  Comment.findByIdAndRemove(commentId)
    .then(comment => {
      return res.status(200).send(`comment with id ${commentId} has been deleted`);
    })
    .catch(err => {
      // validationError 
      return next({ status: 404, message:err })
    });
}

function putCommentVotesById (req, res, next) {
  const commentId = req.params.comment_id;
  let vote = req.query.vote;
  let change = 0; 
    if (vote === 'up') change = 1;
    if (vote === 'down') change = -1;
    Comment.findByIdAndUpdate(
      commentId, { $inc: { votes: change } }, { new: true })
      .then(comment => {
        return res.status(200).send(comment);
      })
      .catch(err => {
        return next({ status: 404, message:err })
      });
}

module.exports = { getComments, deleteComment, putCommentVotesById };
