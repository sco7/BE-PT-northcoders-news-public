const { Comment } = require('../models/index');

function getComments (req, res, next) {
  Comment.find()
    .then(comments => {
      return res.status(200).send({comments});
    })
    .catch(err => {
      if (err)
        return next({ message: 'oops internal server error' });
    });
}

function getCommentById (req, res, next) {
  const comment = req.params.comment_id;
  Comment.findOne({ _id: comment })
    .then(comment => {
      return res.status(200).send({comment});
    })
    .catch(err => {
      if (err) 
        return next({ message: `Comment with id '${comment}' could not be found` });
    });
}

function deleteCommentById (req, res, next) {
  const comment = req.params.comment_id;
  Comment.findByIdAndRemove(comment)
    .then(comment => {
      return res.status(200).send(`Comment has been removed from the db`);
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: 'Comment could not be found' });
    });
}

function putCommentVotesById (req, res, next) {
  const comment = req.params.comment_id;
  let vote = req.query.vote;
  let change = 0; 
  if (vote === 'up') change = 1;
  if (vote === 'down') change = -1;
  Comment.findByIdAndUpdate(
    comment, { $inc: { votes: change } }, { new: true })
    .then(comment => {
      return res.status(200).send({comment});
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `Comment with Id '${comment}' could not be found` });
    });
}

module.exports = { getComments, getCommentById, deleteCommentById, putCommentVotesById };
