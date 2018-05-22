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

module.exports = { getComments };